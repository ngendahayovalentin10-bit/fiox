import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  FIOX About page: luxury black & white with 3D motion               */
/*  - No extra packages. All styles are scoped with the "ab-" prefix   */
/*  - Edit the data arrays below to change the text                    */
/* ------------------------------------------------------------------ */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const PORTRAIT = '/fiox-about.JFIF'

const MARQUEE = ['INTENTION OVER NOISE', 'Wear your identity', 'QUIET CONFIDENCE', 'Made to be lived in']

const CARDS = [
  {
    eyebrow: 'Our Philosophy',
    title: 'Intentional design.',
    text: 'We build pieces around comfort, clarity, and personal style\u2014never excess for the sake of trend.',
  },
  {
    eyebrow: 'Our Identity',
    title: 'Minimal, confident.',
    text: 'Sharp silhouettes, tonal palettes, and premium materials create a wardrobe with presence and ease.',
  },
  {
    eyebrow: 'Our Energy',
    title: 'Wear your way.',
    text: 'Every day pieces and standout essentials shaped to move with your rhythm and identity.',
  },
]

// PLACEHOLDER numbers: replace with your real brand facts
const STATS = [
  { to: 2026, suffix: '', label: 'The year it began' },
  { to: 100, suffix: '%', label: 'Made with intention' },
  { to: 24, suffix: '', label: 'Pieces in every drop' },
]

const STATEMENT = 'What you wear should say who you are, before you say a single word.'

// PLACEHOLDER story: replace with your real story
const STORY = [
  {
    n: '01',
    title: 'The spark',
    text: 'It started with a simple frustration: clothing that shouted louder than the people wearing it. We wanted the opposite.',
  },
  {
    n: '02',
    title: 'The sketchbook',
    text: 'Silhouettes first. Every line drawn, erased and drawn again until nothing was left that didn\u2019t need to be there.',
  },
  {
    n: '03',
    title: 'The first drop',
    text: 'A small run of essentials, cut with intention and shared with the people who understood it first.',
  },
  {
    n: '04',
    title: 'Today',
    text: 'A growing community wearing FIOX their own way. Still intentional. Still unmistakably ours.',
  },
]

const RULES = [
  'Intention over noise.',
  'Fit before flash.',
  'Quiet confidence.',
  'Made to be lived in.',
  'Never the same as anyone else.',
]

const CSS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
.ab-page{--serif:"Cormorant Garamond","Playfair Display",Georgia,"Times New Roman",serif;position:relative;background:#000;color:#fff;font-family:Inter,"Helvetica Neue",Arial,sans-serif;overflow-x:hidden}
.ab-page h1,.ab-page h2,.ab-page h3,.ab-page p{margin:0}
.ab-grain{position:fixed;inset:0;pointer-events:none;z-index:45;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.ab-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.42em;color:#a8a29e}
.ab-hero{position:relative;isolation:isolate;min-height:100vh;min-height:100svh;display:flex;align-items:center;padding:120px 24px 80px;overflow:hidden}
.ab-hero::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(620px circle at var(--mx,70%) var(--my,40%),rgba(255,255,255,.08),rgba(0,0,0,0) 60%)}
.ab-torus{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.ab-hgrid{position:relative;z-index:2;max-width:1200px;margin:0 auto;width:100%;display:grid;gap:56px;grid-template-columns:1fr;align-items:center}
@media(min-width:1024px){.ab-hgrid{grid-template-columns:1fr 1.2fr;gap:80px}}
.ab-photo-wrap{perspective:1200px;max-width:520px;width:100%;margin:0 auto}
.ab-photo{position:relative;transform-style:preserve-3d;transition:transform .25s ease-out;animation:ab-fadeup 1.4s cubic-bezier(.16,1,.3,1) .2s backwards}
.ab-pimg{position:relative;overflow:hidden;border-radius:2.2rem;border:1px solid #292524;background:#0c0a09;aspect-ratio:4/5}
.ab-pimg img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.06);transform:scale(1.08);transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
.ab-photo:hover .ab-pimg img{transform:scale(1.15)}
.ab-frame{position:absolute;inset:-18px 18px 18px -18px;border:1px solid rgba(255,255,255,.28);border-radius:2.2rem;translate:0 0 -50px;pointer-events:none}
.ab-tag{position:absolute;right:-14px;bottom:40px;padding:14px 20px;background:#fff;color:#000;font-size:11px;text-transform:uppercase;letter-spacing:.34em;translate:0 0 90px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.ab-glare{position:absolute;inset:0;border-radius:2.2rem;pointer-events:none;background:radial-gradient(420px circle at var(--gx,50%) var(--gy,30%),rgba(255,255,255,.22),rgba(255,255,255,0) 55%);opacity:0;transition:opacity .3s}
[data-ab-tilt]:hover>.ab-glare,[data-ab-tilt]:hover .ab-glare{opacity:1}
.ab-copy>*{animation:ab-fadeup 1.4s cubic-bezier(.16,1,.3,1) backwards}
.ab-copy .ab-eyebrow{animation-delay:.4s}
.ab-copy h1{animation:none;opacity:1;font-family:var(--serif);font-weight:300;font-size:clamp(54px,9vw,128px);line-height:.9;letter-spacing:.01em;margin:22px 0 30px}
.ab-w{display:block;overflow:hidden;padding-bottom:.08em}
.ab-w b{display:block;font-weight:inherit;transform:translateY(112%);animation:ab-rise 1.5s cubic-bezier(.16,1,.3,1) forwards}
.ab-w:nth-child(1) b{animation-delay:.5s}
.ab-w:nth-child(2) b{animation-delay:.68s;font-style:italic}
@keyframes ab-rise{to{transform:none}}
@keyframes ab-fadeup{from{opacity:0;transform:translateY(24px)}}
.ab-copy p.ab-l{font-size:clamp(17px,1.6vw,20px);color:#d6d3d1;line-height:1.7;max-width:560px;animation-delay:1.1s}
.ab-copy p.ab-m{font-size:16px;color:#a8a29e;line-height:1.75;max-width:560px;margin-top:20px;animation-delay:1.25s}
.ab-cta{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;gap:14px;margin-top:40px;padding:18px 34px;border:1px solid rgba(255,255,255,.4);color:#fff;text-decoration:none;font-size:11px;text-transform:uppercase;letter-spacing:.38em;transition:color .5s,transform .25s ease-out;animation-delay:1.4s}
.ab-cta::before{content:"";position:absolute;inset:0;z-index:-1;background:#fff;transform:translateY(101%);transition:transform .55s cubic-bezier(.7,0,.2,1)}
.ab-cta:hover{color:#000}
.ab-cta:hover::before{transform:none}
.ab-vals{position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:40px 24px 120px}
.ab-vals h2{font-family:var(--serif);font-weight:300;font-size:clamp(36px,5vw,68px);letter-spacing:-.01em;margin:16px 0 48px;max-width:760px;line-height:1}
.ab-vals h2 em{font-style:italic}
.ab-cards{display:grid;gap:28px;grid-template-columns:1fr;perspective:1400px}
@media(min-width:768px){.ab-cards{grid-template-columns:repeat(3,1fr)}}
.ab-rv{opacity:0;transform:rotateX(38deg) translateY(60px);transform-origin:50% 100%;transition:opacity .9s,transform 1.1s cubic-bezier(.16,1,.3,1)}
.ab-rv.ab-on{opacity:1;transform:none}
.ab-rv:nth-child(2){transition-delay:.12s}
.ab-rv:nth-child(3){transition-delay:.24s}
.ab-card{position:relative;transform-style:preserve-3d;transition:transform .25s ease-out,background .4s,border-color .4s;min-height:300px;padding:32px;border:1px solid #292524;border-radius:2rem;background:rgba(12,10,9,.7);display:flex;flex-direction:column}
.ab-card:hover{border-color:#57534e;background:rgba(20,18,16,.9)}
.ab-card .ab-eyebrow{font-size:11px;letter-spacing:.34em;translate:0 0 30px}
.ab-card h3{font-family:var(--serif);font-weight:400;font-size:clamp(30px,3vw,40px);letter-spacing:-.01em;line-height:1.05;margin-top:22px;translate:0 0 60px}
.ab-card p{font-size:15px;line-height:1.7;color:#a8a29e;margin-top:16px;translate:0 0 36px}
.ab-card .ab-num{position:absolute;right:26px;bottom:14px;font-family:var(--serif);font-size:120px;font-weight:300;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.12);translate:0 0 -10px;pointer-events:none}
.ab-card .ab-glare{border-radius:2rem}
.ab-foot{padding:60px 24px 32px;border-top:1px solid #1c1917;overflow:hidden}
.ab-giant{font-family:"Arial Black",Impact,sans-serif;font-size:clamp(100px,28vw,420px);font-weight:900;letter-spacing:-.06em;line-height:.8;text-align:center;color:transparent;-webkit-text-stroke:1px #44403c;transition:color .5s}
.ab-giant:hover{color:#fff}
.ab-fl{display:flex;justify-content:space-between;margin-top:40px;font-size:12px;text-transform:uppercase;letter-spacing:.24em;color:#78716c}
@media(prefers-reduced-motion:reduce){.ab-photo,.ab-copy>*,.ab-w b{animation:none;opacity:1;transform:none}.ab-rv{opacity:1;transform:none;transition:none}}
.ab-fu{opacity:0;transform:translateY(40px);transition:opacity .9s,transform 1.1s cubic-bezier(.16,1,.3,1)}
.ab-fu.ab-on{opacity:1;transform:none}
.ab-marq{overflow:hidden;border-top:1px solid #1c1917;border-bottom:1px solid #1c1917;padding:18px 0;background:#000}
.ab-track{display:flex;width:max-content;animation:ab-mq 30s linear infinite}
.ab-track span{font-family:var(--serif);font-size:clamp(30px,5vw,60px);font-weight:300;font-style:italic;padding:0 30px;white-space:nowrap;color:transparent;-webkit-text-stroke:1px #a8a29e}
.ab-track span:nth-child(even){color:#fff;-webkit-text-stroke:0;font-style:normal}
@keyframes ab-mq{to{transform:translateX(-50%)}}
.ab-stats{max-width:1200px;margin:0 auto;padding:20px 24px 100px;display:grid;grid-template-columns:1fr;border-top:1px solid #1c1917}
@media(min-width:768px){.ab-stats{grid-template-columns:repeat(3,1fr)}}
.ab-stat{padding:48px 0;text-align:center}
.ab-stat+.ab-stat{border-top:1px solid #1c1917}
@media(min-width:768px){.ab-stat+.ab-stat{border-top:0;border-left:1px solid #1c1917}}
.ab-n{display:block;font-family:var(--serif);font-weight:300;font-size:clamp(64px,10vw,140px);line-height:1;letter-spacing:-.02em}
.ab-lbl{display:block;margin-top:14px;font-size:11px;text-transform:uppercase;letter-spacing:.38em;color:#a8a29e}
.ab-stmt{padding:22vh 24px;max-width:1100px;margin:0 auto}
.ab-stmt p{font-family:var(--serif);font-weight:300;font-size:clamp(34px,5.8vw,82px);letter-spacing:-.02em;line-height:1.08}
.ab-stmt span{color:#292524;transition:color .4s}
.ab-stmt span.ab-lit{color:#fff}
.ab-story2{max-width:1000px;margin:0 auto;padding:60px 24px 120px}
.ab-story2 h2,.ab-code h2,.ab-end h2{font-family:var(--serif);font-weight:300;letter-spacing:-.01em;line-height:1}
.ab-story2 h2{font-size:clamp(36px,5vw,68px);margin:16px 0 56px;max-width:760px}
.ab-story2 em,.ab-end em{font-style:italic}
.ab-tl{position:relative;margin-left:8px;border-left:1px solid #292524}
.ab-step{position:relative;display:grid;grid-template-columns:1fr;gap:6px;padding:0 0 64px 36px}
.ab-step:last-child{padding-bottom:0}
.ab-step::before{content:"";position:absolute;left:-5px;top:14px;width:9px;height:9px;border-radius:50%;background:#fff;box-shadow:0 0 0 6px rgba(255,255,255,.08)}
@media(min-width:768px){.ab-step{grid-template-columns:140px 1fr;gap:24px;padding-left:56px}}
.ab-yr{font-family:var(--serif);font-size:56px;font-weight:300;line-height:1;color:transparent;-webkit-text-stroke:1px #78716c}
.ab-step h3{font-family:var(--serif);font-weight:400;font-size:clamp(28px,3vw,38px);letter-spacing:-.01em;line-height:1.1}
.ab-step p{margin-top:12px;font-size:16px;line-height:1.75;color:#a8a29e;max-width:560px}
.ab-code{max-width:1200px;margin:0 auto;padding:40px 24px 120px}
.ab-code h2{font-size:clamp(36px,5vw,68px);margin:16px 0 40px}
.ab-row{display:flex;align-items:center;gap:24px;padding:26px 0;border-top:1px solid #292524;color:#57534e;transition:color .4s,transform .5s cubic-bezier(.16,1,.3,1),background .4s;cursor:default}
.ab-row:last-child{border-bottom:1px solid #292524}
.ab-row small{font-size:12px;letter-spacing:.3em;width:36px}
.ab-row span.ab-t{font-family:var(--serif);font-weight:300;font-size:clamp(30px,5vw,64px);letter-spacing:-.01em;line-height:1.05;flex:1}
.ab-row em{font-style:normal;opacity:0;transform:translateX(-16px);transition:opacity .4s,transform .5s cubic-bezier(.16,1,.3,1);font-size:28px}
.ab-row:hover{color:#fff;transform:translateX(18px)}
.ab-row:hover em{opacity:1;transform:none}
.ab-end{position:relative;text-align:center;padding:120px 24px 130px;border-top:1px solid #1c1917}
.ab-end h2{font-size:clamp(40px,7vw,104px);margin:20px auto 0;max-width:900px}
.ab-end .ab-cta{margin-top:48px;animation:none;opacity:1}
@media(prefers-reduced-motion:reduce){.ab-fu{opacity:1;transform:none;transition:none}.ab-track{animation:none}}`

export default function AboutPage() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const torusRef = useRef(null)
  const stmtRef = useRef(null)
  const words = STATEMENT.split(' ')
  const marqueeItems = [...MARQUEE, ...MARQUEE]

  useEffect(() => {
    const root = rootRef.current
    const hero = heroRef.current
    const cv = torusRef.current
    const stmt = stmtRef.current
    if (!root || !hero || !cv || !stmt) return undefined

    const cleanups = []
    const still =
      Boolean(window.matchMedia) && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ---- 3D tilt + glare ---- */
    root.querySelectorAll('[data-ab-tilt]').forEach((el) => {
      const max = parseFloat(el.getAttribute('data-max')) || 10
      const move = (e) => {
        if (e.pointerType === 'touch') return
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max * 1.6}deg) rotateY(${(px - 0.5) * max * 2}deg)`
        el.querySelectorAll('.ab-glare').forEach((g) => {
          g.style.setProperty('--gx', `${px * 100}%`)
          g.style.setProperty('--gy', `${py * 100}%`)
        })
      }
      const leave = () => {
        el.style.transform = ''
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      })
    })

    /* ---- magnetic buttons ---- */
    root.querySelectorAll('[data-ab-magnet]').forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect()
        const dx = (e.clientX - r.left - r.width / 2) * 0.25
        const dy = (e.clientY - r.top - r.height / 2) * 0.35
        el.style.transform = `translate(${dx}px,${dy}px)`
      }
      const leave = () => {
        el.style.transform = ''
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      })
    })

    /* ---- reveal on scroll ---- */
    const reveals = root.querySelectorAll('.ab-rv, .ab-fu')
    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('ab-on')
              io.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 },
      )
      reveals.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    } else {
      reveals.forEach((el) => el.classList.add('ab-on'))
    }

    /* ---- count-up numbers ---- */
    const nums = root.querySelectorAll('.ab-n')
    const rafs = []
    const runCount = (el) => {
      const to = Number(el.getAttribute('data-to')) || 0
      const suf = el.getAttribute('data-suf') || ''
      let t0 = null
      const step = (t) => {
        if (t0 === null) t0 = t
        const p = Math.min(1, (t - t0) / 1600)
        const e = 1 - (1 - p) ** 3
        el.textContent = `${Math.round(to * e)}${suf}`
        if (p < 1) rafs.push(requestAnimationFrame(step))
      }
      rafs.push(requestAnimationFrame(step))
    }
    if (typeof IntersectionObserver !== 'undefined') {
      const nio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              nio.unobserve(entry.target)
              runCount(entry.target)
            }
          })
        },
        { threshold: 0.4 },
      )
      nums.forEach((el) => nio.observe(el))
      cleanups.push(() => nio.disconnect())
    } else {
      nums.forEach((el) => {
        el.textContent = `${el.getAttribute('data-to')}${el.getAttribute('data-suf') || ''}`
      })
    }
    cleanups.push(() => rafs.forEach((id) => cancelAnimationFrame(id)))

    /* ---- statement lights up word by word ---- */
    const spans = stmt.querySelectorAll('[data-w]')
    const updateStmt = () => {
      const r = stmt.getBoundingClientRect()
      const p = clamp((window.innerHeight * 0.85 - r.top) / (r.height * 0.9), 0, 1)
      const n = Math.round(p * spans.length)
      spans.forEach((el, i) => el.classList.toggle('ab-lit', i < n))
    }
    updateStmt()
    window.addEventListener('scroll', updateStmt, { passive: true })
    window.addEventListener('resize', updateStmt)
    cleanups.push(() => {
      window.removeEventListener('scroll', updateStmt)
      window.removeEventListener('resize', updateStmt)
    })

    /* ---- spotlight + rotating 3D torus of dots ---- */
    const c = cv.getContext('2d')
    if (c) {
      const pts = []
      const U = 90
      const V = 18
      for (let i = 0; i < U; i += 1) {
        for (let j = 0; j < V; j += 1) {
          const u = (i / U) * 6.2832
          const v = (j / V) * 6.2832
          const rr = 1 + 0.38 * Math.cos(v)
          pts.push([rr * Math.cos(u), 0.38 * Math.sin(v), rr * Math.sin(u)])
        }
      }

      let w = 0
      let h = 0
      let spin = 0
      let raf = 0
      const hp = { x: 0, y: 0 }
      const hs = { x: 0, y: 0 }

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        w = cv.clientWidth || window.innerWidth
        h = cv.clientHeight || window.innerHeight
        cv.width = Math.floor(w * dpr)
        cv.height = Math.floor(h * dpr)
        c.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      const onMove = (e) => {
        const r = hero.getBoundingClientRect()
        hp.x = (e.clientX - r.left) / r.width - 0.5
        hp.y = (e.clientY - r.top) / r.height - 0.5
        hero.style.setProperty('--mx', `${e.clientX - r.left}px`)
        hero.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      const onLeave = () => {
        hp.x = 0
        hp.y = 0
      }

      const frame = () => {
        raf = requestAnimationFrame(frame)
        const sy = window.scrollY
        if (sy > window.innerHeight * 1.3) return
        hs.x += (hp.x - hs.x) * 0.06
        hs.y += (hp.y - hs.y) * 0.06
        if (!still) spin += 0.004
        const ry = spin + hs.x * 1.2 + sy * 0.002
        const rx = 1.0 + hs.y * 0.8
        const cyy = Math.cos(ry)
        const syy = Math.sin(ry)
        const cxx = Math.cos(rx)
        const sxx = Math.sin(rx)
        const big = w >= 1024
        const R = Math.min(w, h) * (big ? 0.3 : 0.26)
        const cX = big ? w * 0.74 : w * 0.5
        const cY = big ? h * 0.5 : h * 0.3
        c.clearRect(0, 0, w, h)
        c.fillStyle = '#ffffff'
        for (let k = 0; k < pts.length; k += 1) {
          const p = pts[k]
          const x1 = p[0] * cyy + p[2] * syy
          const z1 = -p[0] * syy + p[2] * cyy
          const y2 = p[1] * cxx - z1 * sxx
          const z2 = p[1] * sxx + z1 * cxx
          const sc = 3.4 / (3.4 - z2)
          const d = (z2 + 1.4) / 2.8
          c.globalAlpha = Math.max(0.03, Math.min(0.6, d * d * 0.6))
          const sz = 1.3 * sc
          c.fillRect(cX + x1 * R * sc - sz / 2, cY + y2 * R * sc - sz / 2, sz, sz)
        }
        c.globalAlpha = 1
      }

      resize()
      window.addEventListener('resize', resize)
      hero.addEventListener('pointermove', onMove)
      hero.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(frame)
      cleanups.push(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        hero.removeEventListener('pointermove', onMove)
        hero.removeEventListener('pointerleave', onLeave)
      })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div ref={rootRef} className="ab-page">
      <style>{CSS}</style>
      <div className="ab-grain" aria-hidden="true" />

      {/* ---------- hero ---------- */}
      <section ref={heroRef} className="ab-hero">
        <canvas ref={torusRef} className="ab-torus" aria-hidden="true" />
        <div className="ab-hgrid">
          <div className="ab-photo-wrap">
            <div className="ab-photo" data-ab-tilt="" data-max="12">
              <div className="ab-frame" />
              <div className="ab-pimg">
                <img src={PORTRAIT} alt="FIOX brand logo" />
                <div className="ab-glare" />
              </div>
              <div className="ab-tag">Est. 2026</div>
            </div>
          </div>

          <div className="ab-copy">
            <p className="ab-eyebrow">About</p>
            <h1 aria-label="Beyond clothing.">
              <span className="ab-w">
                <b>BEYOND</b>
              </span>
              <span className="ab-w">
                <b>CLOTHING.</b>
              </span>
            </h1>
            <p className="ab-l">
              FIOX is built around individuality, confidence, and self-expression. Clothing that speaks without saying a word.
            </p>
            <p className="ab-m">
              We design elevated essentials and statement silhouettes for a modern wardrobe that values intention over noise. Clean form, thoughtful detail, and easy confidence are central to everything we create.
            </p>
            <Link to="/collections" className="ab-cta" data-ab-magnet="">
              Explore Collection
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- scrolling words ---------- */}
      <div className="ab-marq" aria-hidden="true">
        <div className="ab-track">
          {marqueeItems.map((text, i) => (
            <span key={`${text}-${i}`}>{text}</span>
          ))}
        </div>
      </div>

      {/* ---------- values ---------- */}
      <section className="ab-vals">
        <p className="ab-eyebrow">What we stand for</p>
        <h2>
          Intention over noise, <em>always.</em>
        </h2>
        <div className="ab-cards">
          {CARDS.map((card, i) => (
            <div key={card.title} className="ab-rv">
              <div className="ab-card" data-ab-tilt="" data-max="10">
                <p className="ab-eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className="ab-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="ab-glare" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="ab-stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="ab-stat ab-fu">
            <span className="ab-n" data-to={stat.to} data-suf={stat.suffix}>
              0
            </span>
            <span className="ab-lbl">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ---------- statement ---------- */}
      <section ref={stmtRef} className="ab-stmt">
        <p>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} data-w="">
              {word}{' '}
            </span>
          ))}
        </p>
      </section>

      {/* ---------- story ---------- */}
      <section className="ab-story2">
        <p className="ab-eyebrow ab-fu">Our story</p>
        <h2 className="ab-fu">
          From a quiet idea to a <em>loud</em> identity.
        </h2>
        <div className="ab-tl">
          {STORY.map((step) => (
            <div key={step.n} className="ab-step ab-fu">
              <span className="ab-yr">{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- the code ---------- */}
      <section className="ab-code">
        <p className="ab-eyebrow ab-fu">The FIOX code</p>
        <h2 className="ab-fu">Five rules we never break.</h2>
        {RULES.map((rule, i) => (
          <div key={rule} className="ab-row ab-fu">
            <small>{String(i + 1).padStart(2, '0')}</small>
            <span className="ab-t">{rule}</span>
            <em>&rarr;</em>
          </div>
        ))}
      </section>

      {/* ---------- closing call to action ---------- */}
      <section className="ab-end">
        <p className="ab-eyebrow ab-fu">Join the movement</p>
        <h2 className="ab-fu">
          Ready to wear your <em>identity?</em>
        </h2>
        <div className="ab-fu">
          <Link to="/shop" className="ab-cta" data-ab-magnet="">
            Shop the collection
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
