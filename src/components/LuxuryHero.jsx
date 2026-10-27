import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ------------------------------------------------------------------ */
/*  FIOX luxury 3D hero                                                */
/*  - Black & white only, no extra packages                            */
/*  - All styles are scoped with the "lx-" prefix                      */
/* ------------------------------------------------------------------ */

const LETTERS = ['F', 'I', 'O', 'X']

const LX_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

.lx-hero{--serif:"Cormorant Garamond","Playfair Display",Georgia,"Times New Roman",serif;position:relative;isolation:isolate;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;padding:96px 24px 32px;overflow:hidden;background:#000;color:#fff}
.lx-hero::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(640px circle at var(--mx,50%) var(--my,42%),rgba(255,255,255,.09),rgba(0,0,0,0) 60%)}
.lx-lines{position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px);background-size:25% 100%;translate:calc(var(--px,0)*-14px) 0}
.lx-ring{position:absolute;left:50%;top:50%;border:1px solid rgba(255,255,255,.08);border-radius:50%;pointer-events:none;z-index:0;animation:lx-breathe 9s ease-in-out infinite}
.lx-r1{width:min(92vw,920px);height:min(92vw,920px);translate:calc(var(--px,0)*-26px) calc(var(--py,0)*-26px)}
.lx-r2{width:min(62vw,620px);height:min(62vw,620px);animation-delay:-4s;translate:calc(var(--px,0)*38px) calc(var(--py,0)*38px)}
@keyframes lx-breathe{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.05)}}
.lx-orb{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}

.lx-meta{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;font-size:11px;text-transform:uppercase;letter-spacing:.38em;color:#a8a29e}
.lx-meta-top{border-top:1px solid rgba(255,255,255,.12);padding-top:18px}
.lx-center{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;will-change:transform,opacity;perspective:1300px}
.lx-tilt{transform-style:preserve-3d;will-change:transform;display:flex;flex-direction:column;align-items:center}
.lx-kicker{display:flex;align-items:center;gap:18px;font-size:11px;text-transform:uppercase;letter-spacing:.5em;color:#d6d3d1;translate:0 0 30px}
.lx-kicker::before,.lx-kicker::after{content:"";width:clamp(24px,6vw,72px);height:1px;background:rgba(255,255,255,.35)}
.lx-title{font-family:var(--serif);font-weight:300;font-size:clamp(110px,27vw,380px);letter-spacing:.04em;line-height:.88;margin:22px 0 0;padding-left:.04em;transform-style:preserve-3d}
.lx-ltr{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .02em .08em;translate:0 0 70px;transition:translate .6s cubic-bezier(.16,1,.3,1)}
.lx-ltr:nth-child(odd){translate:0 0 36px}
.lx-ltr:hover{translate:0 0 170px}
.lx-ltr b{display:inline-block;font-weight:inherit;transform:translateY(112%);background-image:linear-gradient(110deg,#8d8d8d 25%,#fff 45%,#fff 55%,#8d8d8d 75%);background-size:300% 100%;background-repeat:repeat-x;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;animation:lx-rise 1.5s cubic-bezier(.16,1,.3,1) forwards,lx-shine 7s linear infinite;animation-delay:calc(var(--i)*.13s + .3s),calc(var(--i)*-.45s)}
@keyframes lx-rise{to{transform:none}}
@keyframes lx-shine{from{background-position:0% 0}to{background-position:150% 0}}
.lx-tagline{font-family:var(--serif);font-weight:300;font-size:clamp(26px,3.6vw,46px);letter-spacing:.01em;color:#e7e5e4;margin-top:18px;translate:0 0 50px}
.lx-tagline em{font-style:italic}
.lx-fade{opacity:0;animation:lx-fadeup 1.4s cubic-bezier(.16,1,.3,1) forwards;animation-delay:var(--d,1s)}
@keyframes lx-fadeup{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.lx-actions{display:flex;flex-wrap:wrap;gap:28px;align-items:center;justify-content:center;margin-top:44px;translate:0 0 90px}
.lx-cta{position:relative;isolation:isolate;overflow:hidden;display:inline-flex;align-items:center;gap:14px;padding:18px 34px;border:1px solid rgba(255,255,255,.4);color:#fff;text-decoration:none;font-size:11px;text-transform:uppercase;letter-spacing:.38em;transition:color .5s,transform .25s ease-out}
.lx-cta::before{content:"";position:absolute;inset:0;z-index:-1;background:#fff;transform:translateY(101%);transition:transform .55s cubic-bezier(.7,0,.2,1)}
.lx-cta:hover{color:#000}
.lx-cta:hover::before{transform:none}
.lx-tlink{position:relative;color:#d6d3d1;text-decoration:none;font-size:11px;text-transform:uppercase;letter-spacing:.38em;padding-bottom:6px}
.lx-tlink::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:#fff;transform:scaleX(.35);transform-origin:left;transition:transform .5s cubic-bezier(.7,0,.2,1)}
.lx-tlink:hover::after{transform:scaleX(1)}
.lx-badge{position:absolute;right:clamp(16px,4vw,56px);bottom:84px;width:clamp(84px,9vw,128px);height:auto;z-index:2;animation:lx-fadeup 1.4s cubic-bezier(.16,1,.3,1) forwards,lx-spin 26s linear infinite;animation-delay:2.2s,0s;opacity:0}
.lx-badge text{font-size:11px;letter-spacing:4px;fill:#d6d3d1;text-transform:uppercase}
@keyframes lx-spin{to{rotate:360deg}}
.lx-scroll{display:inline-flex;align-items:center;gap:16px}
.lx-scroll i{display:inline-block;width:56px;height:1px;background:#fff;animation:lx-sl 2.6s ease-in-out infinite}
@keyframes lx-sl{0%{transform:scaleX(0);transform-origin:left}50%{transform:scaleX(1);transform-origin:left}51%{transform:scaleX(1);transform-origin:right}100%{transform:scaleX(0);transform-origin:right}}
@media(max-width:640px){.lx-meta{letter-spacing:.24em;font-size:10px}.lx-badge{display:none}.lx-kicker{letter-spacing:.3em}}
@media(prefers-reduced-motion:reduce){.lx-ltr b{animation:none;transform:none;-webkit-text-fill-color:#fff}.lx-fade{animation:none;opacity:1;transform:none}.lx-badge{animation:none;opacity:1}.lx-ring,.lx-scroll i{animation:none}.lx-tilt{transform:none!important}}
`

export default function LuxuryHero() {
  const heroRef = useRef(null)
  const centerRef = useRef(null)
  const tiltRef = useRef(null)
  const ctaRef = useRef(null)
  const orbRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const center = centerRef.current
    const tilt = tiltRef.current
    const cta = ctaRef.current
    const orb = orbRef.current
    if (!hero || !center || !tilt || !cta || !orb) return undefined
    const octx = orb.getContext('2d')
    if (!octx) return undefined

    const still =
      Boolean(window.matchMedia) && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ---- 3D sphere + orbit rings (points) ----
    const pts = []
    for (let i = 0; i < 720; i += 1) {
      const y = 1 - (i / 719) * 2
      const r = Math.sqrt(1 - y * y)
      const th = i * 2.39996323
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r, 0])
    }
    ;[
      [0.5, 0],
      [1.15, 0.9],
      [-0.7, 2.1],
    ].forEach((t) => {
      for (let j = 0; j < 200; j += 1) {
        const a = (j / 200) * 6.2832
        const x0 = Math.cos(a) * 1.32
        const z0 = Math.sin(a) * 1.32
        const y1 = -z0 * Math.sin(t[0])
        const z1 = z0 * Math.cos(t[0])
        pts.push([
          x0 * Math.cos(t[1]) - y1 * Math.sin(t[1]),
          x0 * Math.sin(t[1]) + y1 * Math.cos(t[1]),
          z1,
          1,
        ])
      }
    })

    let ow = 0
    let oh = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ow = orb.clientWidth || window.innerWidth
      oh = orb.clientHeight || window.innerHeight
      orb.width = Math.floor(ow * dpr)
      orb.height = Math.floor(oh * dpr)
      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // ---- pointer + scroll ----
    const hp = { x: 0, y: 0 }
    const hs = { x: 0, y: 0 }

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
    const onCtaMove = (e) => {
      const r = cta.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) * 0.25
      const dy = (e.clientY - r.top - r.height / 2) * 0.35
      cta.style.transform = `translate(${dx}px,${dy}px)`
    }
    const onCtaLeave = () => {
      cta.style.transform = ''
    }
    const onScroll = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      if (y > vh * 1.2) return
      center.style.transform = `translateY(${y * 0.28}px)`
      center.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)))
    }

    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    cta.addEventListener('pointermove', onCtaMove)
    cta.addEventListener('pointerleave', onCtaLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    resize()
    onScroll()

    // ---- animation loop ----
    let rotY = 0
    let raf = 0
    const frame = (time) => {
      raf = requestAnimationFrame(frame)
      const sy0 = window.scrollY
      if (sy0 > window.innerHeight * 1.2) return

      hs.x += (hp.x - hs.x) * 0.06
      hs.y += (hp.y - hs.y) * 0.06
      hero.style.setProperty('--px', hs.x.toFixed(3))
      hero.style.setProperty('--py', hs.y.toFixed(3))
      tilt.style.transform = `rotateX(${-hs.y * 9}deg) rotateY(${hs.x * 13}deg)`

      if (!still) rotY += 0.0022
      const ry = rotY + hs.x * 1.1 + sy0 * 0.0018
      const rx = 0.32 + hs.y * 0.7
      const cyy = Math.cos(ry)
      const syy = Math.sin(ry)
      const cxx = Math.cos(rx)
      const sxx = Math.sin(rx)
      const R = Math.min(ow, oh) * (ow >= 1024 ? 0.36 : 0.3)
      const cX = ow / 2
      const cY = oh * 0.5

      octx.clearRect(0, 0, ow, oh)
      octx.fillStyle = '#ffffff'
      for (let k = 0; k < pts.length; k += 1) {
        const p = pts[k]
        const br = p[3] ? 1 : 1 + 0.02 * Math.sin(time * 0.0015 + p[1] * 5)
        const x = p[0] * br
        const yv = p[1] * br
        const z = p[2] * br
        const x1 = x * cyy + z * syy
        const z1 = -x * syy + z * cyy
        const y2 = yv * cxx - z1 * sxx
        const z2 = yv * sxx + z1 * cxx
        const sc = 3 / (3 - z2)
        const d = (z2 + 1.4) / 2.8
        octx.globalAlpha = Math.max(0.04, Math.min(0.9, d * d * (p[3] ? 0.9 : 0.75)))
        const sz = (p[3] ? 1.5 : 1.1) * sc
        octx.fillRect(cX + x1 * R * sc - sz / 2, cY + y2 * R * sc - sz / 2, sz, sz)
      }
      octx.globalAlpha = 1
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      cta.removeEventListener('pointermove', onCtaMove)
      cta.removeEventListener('pointerleave', onCtaLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section ref={heroRef} className="lx-hero">
      <style>{LX_CSS}</style>

      <div className="lx-lines" aria-hidden="true" />
      <div className="lx-ring lx-r1" aria-hidden="true" />
      <div className="lx-ring lx-r2" aria-hidden="true" />
      <canvas ref={orbRef} className="lx-orb" aria-hidden="true" />

      <div className="lx-meta lx-meta-top lx-fade" style={{ '--d': '.2s' }}>
        <span>Collection 01</span>
        <span>Est. 2026</span>
      </div>

      <div ref={centerRef} className="lx-center">
        <div ref={tiltRef} className="lx-tilt">
          <p className="lx-kicker lx-fade" style={{ '--d': '.5s' }}>
            The new collection
          </p>
          <h1 className="lx-title" aria-label="FIOX">
            {LETTERS.map((letter, i) => (
              <span key={letter} className="lx-ltr" style={{ '--i': i }} aria-hidden="true">
                <b>{letter}</b>
              </span>
            ))}
          </h1>
          <p className="lx-tagline lx-fade" style={{ '--d': '1.5s' }}>
            Wear your <em>identity.</em>
          </p>
          <div className="lx-actions lx-fade" style={{ '--d': '1.8s' }}>
            <Link ref={ctaRef} to="/collections" className="lx-cta">
              Discover the collection <span>&rarr;</span>
            </Link>
            <Link to="/shop" className="lx-tlink">
              Shop now
            </Link>
          </div>
        </div>
      </div>

      <svg className="lx-badge" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="lx-circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#lx-circ" textLength="484" lengthAdjust="spacing">
            Scroll to discover &#8226; Wear your identity &#8226;{' '}
          </textPath>
        </text>
        <circle cx="100" cy="100" r="3" fill="#fff" />
      </svg>

      <div className="lx-meta lx-fade" style={{ '--d': '2.2s' }}>
        <span className="lx-scroll">
          <i />
          Scroll
        </span>
        <span>Streetwear, refined</span>
      </div>
    </section>
  )
}
