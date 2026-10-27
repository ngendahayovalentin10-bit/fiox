import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  FIOX extras: grain, custom cursor, marquee, pieces rail,           */
/*  word-by-word statement, giant footer. Black & white only.          */
/*  No extra packages. Styles are scoped with the "fx-" prefix.        */
/* ------------------------------------------------------------------ */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* ---------- film grain overlay ---------- */

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] opacity-[0.07]"
      style={{ backgroundImage: GRAIN }}
    />
  )
}

/* ---------- custom cursor (desktop with a mouse only) ---------- */

const CURSOR_CSS = `
.fx-cur{position:fixed;left:-7px;top:-7px;width:14px;height:14px;border-radius:50%;background:#fff;mix-blend-mode:difference;pointer-events:none;z-index:60;display:none;transition:width .2s,height .2s,left .2s,top .2s}
.fx-cur-big{width:56px;height:56px;left:-28px;top:-28px}
body.fx-cur-on .fx-cur{display:block}
body.fx-cur-on,body.fx-cur-on a,body.fx-cur-on button{cursor:none}
`

export function CursorFollower() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined
    }
    const el = ref.current
    if (!el) return undefined

    document.body.classList.add('fx-cur-on')
    let tx = -100
    let ty = -100
    let x = -100
    let y = -100
    let seen = false
    let raf = 0

    const move = (event) => {
      tx = event.clientX
      ty = event.clientY
      if (!seen) {
        x = tx
        y = ty
        seen = true
      }
    }
    const over = (event) => {
      const target = event.target
      el.classList.toggle(
        'fx-cur-big',
        Boolean(target && target.closest && target.closest('a,button')),
      )
    }
    const loop = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseover', over)
      document.body.classList.remove('fx-cur-on')
    }
  }, [])

  return (
    <>
      <style>{CURSOR_CSS}</style>
      <div ref={ref} aria-hidden="true" className="fx-cur" />
    </>
  )
}

/* ---------- scrolling text band ---------- */

const MARQUEE_CSS = `
.fx-track{display:flex;width:max-content;animation:fx-mq 28s linear infinite}
.fx-track span{font-size:clamp(28px,5vw,56px);font-weight:500;letter-spacing:-.04em;padding:0 28px;white-space:nowrap}
.fx-outline{color:transparent;-webkit-text-stroke:1px #a8a29e}
.fx-solid{color:#fff}
@keyframes fx-mq{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.fx-track{animation:none}}
`

const MARQUEE = ['WEAR YOUR IDENTITY', 'NEW DROP', 'MADE DELIBERATE', 'UNMISTAKABLY YOURS']

export function MarqueeStrip() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-stone-900 bg-black py-4">
      <style>{MARQUEE_CSS}</style>
      <div className="fx-track">
        {items.map((text, i) => (
          <span key={`${text}-${i}`} className={i % 2 ? 'fx-solid' : 'fx-outline'}>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- "The pieces" horizontal card rail ---------- */

const RAIL_CSS = `
.fx-rail{scrollbar-width:none}
.fx-rail::-webkit-scrollbar{display:none}
`

const PIECES = [
  {
    id: 'tees',
    name: 'Tees',
    paths: [
      { d: 'M130 60 L90 75 L30 125 L65 165 L100 140 L100 340 L300 340 L300 140 L335 165 L370 125 L310 75 L270 60 Q200 110 130 60 Z' },
    ],
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    paths: [
      { d: 'M140 80 L85 100 L40 210 L40 335 L92 340 L100 235 L100 355 L300 355 L300 235 L308 340 L360 335 L360 210 L315 100 L260 80 Z' },
      { d: 'M135 85 Q140 25 200 22 Q260 25 265 85 Q200 140 135 85 Z' },
      { d: 'M165 80 Q200 125 235 80 Q232 50 200 47 Q168 50 165 80 Z', hole: true },
    ],
  },
  {
    id: 'pants',
    name: 'Pants',
    paths: [{ d: 'M120 50 L280 50 L305 355 L220 355 L200 160 L180 355 L95 355 Z' }],
  },
  {
    id: 'caps',
    name: 'Caps',
    paths: [
      { d: 'M90 240 Q90 105 200 105 Q310 105 310 240 Z' },
      { d: 'M75 250 L325 250 Q395 255 398 280 Q320 268 75 268 Z' },
    ],
  },
]

export function PiecesRail() {
  return (
    <section id="pieces" className="bg-black py-24 md:py-32">
      <style>{RAIL_CSS}</style>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-10 max-w-7xl px-6 md:px-8"
      >
        <p className="text-xs uppercase tracking-[0.42em] text-stone-400">The pieces</p>
        <h2 className="mt-4 max-w-2xl text-4xl tracking-[-0.06em] text-white md:text-6xl">
          Everything you need to say it.
        </h2>
      </motion.div>

      <div
        className="fx-rail flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 pr-6"
        style={{ paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))' }}
      >
        {PIECES.map((piece, index) => (
          <Link
            key={piece.id}
            to="/shop"
            className="group flex aspect-[3/4] w-[min(78vw,320px)] shrink-0 snap-start flex-col justify-between rounded-3xl border border-stone-800 bg-black p-6 text-white transition duration-300 hover:-translate-y-2 hover:bg-white hover:text-black"
          >
            <span className="text-xs tracking-[0.3em] text-stone-500 group-hover:text-stone-600">
              {String(index + 1).padStart(2, '0')}
            </span>
            <svg viewBox="0 0 400 400" aria-hidden="true" className="min-h-0 w-full flex-1 py-3">
              {piece.paths.map((path) => (
                <path
                  key={path.d}
                  d={path.d}
                  className={path.hole ? 'fill-black group-hover:fill-white' : 'fill-current'}
                />
              ))}
            </svg>
            <span className="flex items-center justify-between text-2xl tracking-[-0.04em]">
              {piece.name}
              <ArrowRight size={20} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ---------- statement that lights up word by word on scroll ---------- */

const STATEMENT_CSS = `
.fx-word{color:#292524;transition:color .4s}
.fx-word.fx-lit{color:#fff}
`

const STATEMENT =
  "We don't make clothes to blend in. We make them so you never have to explain who you are."

export function WordStatement() {
  const sectionRef = useRef(null)
  const words = STATEMENT.split(' ')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const spans = section.querySelectorAll('[data-w]')

    const update = () => {
      const rect = section.getBoundingClientRect()
      const progress = clamp(
        (window.innerHeight * 0.85 - rect.top) / (rect.height * 0.9),
        0,
        1,
      )
      const litCount = Math.round(progress * spans.length)
      spans.forEach((element, index) => {
        element.classList.toggle('fx-lit', index < litCount)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto max-w-5xl px-6 py-[30vh] md:px-8">
      <style>{STATEMENT_CSS}</style>
      <p
        className="font-medium leading-[1.08] tracking-[-0.05em]"
        style={{ fontSize: 'clamp(1.9rem, 5.6vw, 4.75rem)' }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} data-w="" className="fx-word">
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}

/* ---------- giant outlined FIOX footer ---------- */

const GIANT_CSS = `
.fx-giant{font-family:"Arial Black",Impact,sans-serif;font-size:clamp(100px,26vw,380px);font-weight:900;letter-spacing:-.06em;line-height:.8;text-align:center;color:transparent;-webkit-text-stroke:1px #44403c;transition:color .5s}
.fx-giant:hover{color:#fff}
`

export function GiantFooter() {
  return (
    <footer className="mx-auto mt-16 max-w-7xl overflow-hidden border-t border-stone-900 px-6 pt-16 md:px-8">
      <style>{GIANT_CSS}</style>
      <div className="fx-giant" aria-hidden="true">
        FIOX
      </div>
      <div className="mt-10 flex justify-between text-xs uppercase tracking-[0.24em] text-stone-500">
        <span>&copy; 2026 FIOX</span>
        <span>Wear your identity.</span>
      </div>
    </footer>
  )
}
