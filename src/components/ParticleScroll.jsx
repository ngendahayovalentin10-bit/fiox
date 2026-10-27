import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  FIOX particle scroll section                                       */
/*  - Pure canvas + React, no extra packages                           */
/*  - Black & white only                                               */
/*  - To remove / reorder a garment, just edit the STAGES list below   */
/* ------------------------------------------------------------------ */

const SIZE = 400 // internal sampling box for every shape

/* ---------- shape drawers (white shapes on a transparent canvas) ---------- */

function drawTee(ctx) {
  ctx.fill(
    new Path2D(
      'M130 60 L90 75 L30 125 L65 165 L100 140 L100 340 L300 340 L300 140 L335 165 L370 125 L310 75 L270 60 Q200 110 130 60 Z',
    ),
  )
}

function drawHoodie(ctx) {
  // body + sleeves
  ctx.fill(
    new Path2D(
      'M140 80 L85 100 L40 210 L40 335 L92 340 L100 235 L100 355 L300 355 L300 235 L308 340 L360 335 L360 210 L315 100 L260 80 Z',
    ),
  )
  // hood
  ctx.fill(new Path2D('M135 85 Q140 25 200 22 Q260 25 265 85 Q200 140 135 85 Z'))
  // cut-outs: hood opening, pocket, drawstrings
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fill(new Path2D('M165 80 Q200 125 235 80 Q232 50 200 47 Q168 50 165 80 Z'))
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ctx.stroke(new Path2D('M130 290 L165 252 L235 252 L270 290'))
  ctx.stroke(new Path2D('M185 125 L185 190'))
  ctx.stroke(new Path2D('M215 125 L215 190'))
  ctx.globalCompositeOperation = 'source-over'
}

function drawPants(ctx) {
  ctx.fill(new Path2D('M120 50 L280 50 L305 355 L220 355 L200 160 L180 355 L95 355 Z'))
  ctx.globalCompositeOperation = 'destination-out'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.stroke(new Path2D('M122 82 L278 82'))
  ctx.stroke(new Path2D('M200 82 L200 160'))
  ctx.globalCompositeOperation = 'source-over'
}

function drawCap(ctx) {
  // dome
  ctx.fill(new Path2D('M90 240 Q90 105 200 105 Q310 105 310 240 Z'))
  // visor
  ctx.fill(new Path2D('M75 250 L325 250 Q395 255 398 280 Q320 268 75 268 Z'))
  // button
  ctx.beginPath()
  ctx.arc(200, 100, 9, 0, Math.PI * 2)
  ctx.fill()
  // panel seams
  ctx.globalCompositeOperation = 'destination-out'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.stroke(new Path2D('M200 112 Q172 175 178 238'))
  ctx.stroke(new Path2D('M200 112 Q228 175 222 238'))
  ctx.globalCompositeOperation = 'source-over'
}

function drawWordmark(ctx) {
  let fontSize = 170
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `900 ${fontSize}px "Arial Black", Impact, Arial, sans-serif`
  while (ctx.measureText('FIOX').width > 380 && fontSize > 40) {
    fontSize -= 5
    ctx.font = `900 ${fontSize}px "Arial Black", Impact, Arial, sans-serif`
  }
  ctx.fillText('FIOX', SIZE / 2, SIZE / 2)
}

/* ---------- the scroll story (edit text / order here) ---------- */

const STAGES = [
  {
    id: 'tee',
    draw: drawTee,
    eyebrow: '01 / Essentials',
    title: 'Start with the basics.',
    body: 'Clean cuts and a deliberate fit. The tee that everything else is built around.',
  },
  {
    id: 'hoodie',
    draw: drawHoodie,
    eyebrow: '02 / Layers',
    title: 'Built to be lived in.',
    body: 'Heavy, soft and structured. Hoodies that carry your whole mood.',
  },
  {
    id: 'pants',
    draw: drawPants,
    eyebrow: '03 / Bottoms',
    title: 'Move your way.',
    body: 'Relaxed lines, sharp attitude. Made to keep up with you.',
  },
  {
    id: 'cap',
    draw: drawCap,
    eyebrow: '04 / Details',
    title: 'Finish the look.',
    body: 'Small pieces. Loud identity.',
  },
  {
    id: 'wordmark',
    draw: drawWordmark,
    center: true,
    eyebrow: 'FIOX',
    title: 'Wear your identity.',
    body: 'More than clothing. A statement of who you are.',
  },
]

/* ---------- helpers ---------- */

function samplePoints(draw, count) {
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const out = new Float32Array(count * 2)
  if (!ctx) return out

  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = '#ffffff'
  draw(ctx)

  const { data } = ctx.getImageData(0, 0, SIZE, SIZE)
  const pts = []
  for (let y = 0; y < SIZE; y += 2) {
    for (let x = 0; x < SIZE; x += 2) {
      if (data[(y * SIZE + x) * 4 + 3] > 128) {
        pts.push([x / SIZE - 0.5, y / SIZE - 0.5])
      }
    }
  }
  if (pts.length === 0) pts.push([0, 0])

  // shuffle so particles spread evenly over the shape
  for (let i = pts.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = pts[i]
    pts[i] = pts[j]
    pts[j] = tmp
  }

  for (let i = 0; i < count; i += 1) {
    const p = pts[i % pts.length]
    out[i * 2] = p[0] + (Math.random() - 0.5) * 0.008
    out[i * 2 + 1] = p[1] + (Math.random() - 0.5) * 0.008
  }
  return out
}

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/* ---------- component ---------- */

export default function ParticleScroll() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)
  const canvasRef = useRef(null)
  const barRef = useRef(null)
  const textRefs = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const small = window.innerWidth < 768
    const COUNT = small ? 1300 : 2400
    const N = STAGES.length

    const shapes = STAGES.map((stage) => samplePoints(stage.draw, COUNT))
    const seeds = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT * 3; i += 1) seeds[i] = Math.random()
    const pos = new Float32Array(COUNT * 2)

    const tris = Array.from({ length: small ? 14 : 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 5 + Math.random() * 9,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.004,
      drift: 0.00002 + Math.random() * 0.00004,
      alpha: 0.08 + Math.random() * 0.2,
    }))

    const mouse = { x: -9999, y: -9999 }
    const onMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    let w = 0
    let h = 0
    let raf = 0
    let smooth = 0
    let first = true
    let visible = true
    let stickyBroken = false
    let lastTx = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth || window.innerWidth
      h = canvas.clientHeight || window.innerHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const layoutFor = (index) => {
      const isLast = STAGES[index].center
      if (w >= 1024) {
        return isLast
          ? { cx: w / 2, cy: h * 0.4, s: Math.min(w * 0.62, h * 0.9) }
          : { cx: w * 0.68, cy: h * 0.5, s: Math.min(h * 0.78, w * 0.42) }
      }
      return isLast
        ? { cx: w / 2, cy: h * 0.36, s: w * 0.95 }
        : { cx: w / 2, cy: h * 0.36, s: Math.min(w * 0.9, h * 0.5) }
    }

    const frame = (time) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return

      const rect = section.getBoundingClientRect()
      const total = Math.max(1, rect.height - window.innerHeight)
      const progress = clamp(-rect.top / total, 0, 1)
      const targetStage = progress * (N - 1)

      // If a parent has overflow hidden, CSS sticky stops working.
      // Detect that and pin the scene manually so it never goes blank.
      const inner = innerRef.current
      if (inner) {
        const inRange = rect.top < 0 && rect.bottom > window.innerHeight
        if (!stickyBroken && inRange && Math.abs(inner.getBoundingClientRect().top) > 4) {
          stickyBroken = true
        }
        const tx = stickyBroken ? clamp(-rect.top, 0, total) : 0
        if (tx !== lastTx) {
          inner.style.transform = tx ? `translate3d(0, ${tx}px, 0)` : ''
          lastTx = tx
        }
      }

      if (first) smooth = targetStage
      smooth += (targetStage - smooth) * 0.12

      const i = Math.min(N - 2, Math.max(0, Math.floor(smooth)))
      const t = clamp(smooth - i, 0, 1)
      const e = t * t * (3 - 2 * t)

      const A = layoutFor(i)
      const B = layoutFor(i + 1)
      const cx = A.cx + (B.cx - A.cx) * e
      const cy = A.cy + (B.cy - A.cy) * e
      const s = A.s + (B.s - A.s) * e

      ctx.clearRect(0, 0, w, h)
      const cr = canvas.getBoundingClientRect()
      const mx = mouse.x - cr.left
      const my = mouse.y - cr.top

      // floating triangles
      ctx.lineWidth = 1
      for (let k = 0; k < tris.length; k += 1) {
        const tr = tris[k]
        tr.rot += tr.rotV
        const y = (((tr.y - progress * 0.35 - time * tr.drift) % 1) + 1) % 1
        const px = tr.x * w
        const py = y * h
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(tr.rot)
        ctx.strokeStyle = `rgba(255,255,255,${tr.alpha})`
        ctx.beginPath()
        ctx.moveTo(0, -tr.size)
        ctx.lineTo(tr.size * 0.87, tr.size * 0.5)
        ctx.lineTo(-tr.size * 0.87, tr.size * 0.5)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }

      // particles
      const from = shapes[i]
      const to = shapes[i + 1]
      const swirl = Math.sin(Math.PI * e) * 0.45
      ctx.fillStyle = '#ffffff'

      for (let k = 0; k < COUNT; k += 1) {
        const k2 = k * 2
        const k3 = k * 3
        let x = from[k2] + (to[k2] - from[k2]) * e
        let y = from[k2 + 1] + (to[k2 + 1] - from[k2 + 1]) * e

        const angle = seeds[k3] * Math.PI * 2
        const radius = seeds[k3 + 1]
        x += Math.cos(angle) * swirl * radius
        y += Math.sin(angle) * swirl * radius

        const floatPhase = time * 0.0012 + seeds[k3] * 6.28
        x += Math.sin(floatPhase) * 0.004
        y += Math.cos(floatPhase) * 0.004

        let px = cx + x * s
        let py = cy + y * s

        // particles are pushed away from the cursor
        const ddx = px - mx
        const ddy = py - my
        const dd = ddx * ddx + ddy * ddy
        if (dd < 16900) {
          const dist = Math.sqrt(dd) || 1
          const f = (1 - dist / 130) ** 2 * 55
          px += (ddx / dist) * f
          py += (ddy / dist) * f
        }

        if (first) {
          pos[k2] = px
          pos[k2 + 1] = py
        } else {
          pos[k2] += (px - pos[k2]) * 0.22
          pos[k2 + 1] += (py - pos[k2 + 1]) * 0.22
        }

        const size = 1.2 + seeds[k3 + 2] * 1.4
        ctx.globalAlpha = 0.35 + seeds[k3 + 2] * 0.65
        ctx.fillRect(pos[k2], pos[k2 + 1], size, size)
      }
      ctx.globalAlpha = 1
      first = false

      // text overlays
      for (let idx = 0; idx < N; idx += 1) {
        const el = textRefs.current[idx]
        if (!el) continue
        const d = Math.abs(smooth - idx)
        const o = clamp(1 - d * 2.2, 0, 1)
        el.style.opacity = String(o)
        el.style.transform = `translateY(${(idx - smooth) * 60}px)`
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`
      }
    }

    let observer = null
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          visible = entries.some((entry) => entry.isIntersecting)
        },
        { threshold: 0 },
      )
      observer.observe(section)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('touchend', onLeave)
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchend', onLeave)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (observer) observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="FIOX collection"
      className="relative bg-black"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      <div ref={innerRef} className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 65% 50%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%)',
          }}
        />

        {STAGES.map((stage, i) => (
          <div
            key={stage.id}
            className={
              stage.center
                ? 'pointer-events-none absolute inset-x-6 bottom-[10%] flex justify-center text-center'
                : 'pointer-events-none absolute inset-x-6 bottom-12 lg:inset-x-auto lg:bottom-auto lg:left-16 lg:top-1/2 lg:max-w-md lg:-translate-y-1/2'
            }
          >
            <div
              ref={(el) => {
                textRefs.current[i] = el
              }}
              style={{ opacity: i === 0 ? 1 : 0 }}
              className="max-w-xl"
            >
              <p className="text-xs uppercase tracking-[0.42em] text-stone-400">
                {stage.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-white md:text-6xl">
                {stage.title}
              </h2>
              <p className="mt-5 text-base text-stone-300 md:text-lg">{stage.body}</p>
              {stage.center && (
                <Link
                  to="/shop"
                  className="mt-8 inline-flex items-center gap-2 border border-stone-100 bg-stone-100 px-6 py-3 text-xs uppercase tracking-[0.24em] text-stone-900 transition hover:bg-white"
                >
                  Shop Now
                  <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 h-px bg-stone-800">
          <div
            ref={barRef}
            className="h-full origin-left bg-white"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  )
}
