import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins
if (typeof window !== 'undefined' && gsap) {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const rootRef = useRef(null)
  const gridRef = useRef(null)
  const noiseRef = useRef(null)
  const spotlightRef = useRef(null)
  const layersRef = useRef([])
  const glitchTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Distorted grid background animation
      gsap.to(gridRef.current, {
        rotateZ: 2,
        skewX: 6,
        skewY: -4,
        scale: 1.05,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Parallax depth for floating layers
      layersRef.current.forEach((el, i) => {
        gsap.to(el, {
          yPercent: (i + 1) * 8,
          xPercent: (i % 2 === 0 ? 1 : -1) * 6,
          rotateZ: (i % 2 === 0 ? 1 : -1) * 2,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6
          }
        })
      })

      // 3D rotate on scroll for hero text
      gsap.to('.hero-rotate', {
        rotateX: 25,
        rotateY: -20,
        rotateZ: -2,
        transformPerspective: 800,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=80% top',
          scrub: true
        }
      })

      // Staggered reveal with clip-path
      gsap.utils.toArray('.reveal').forEach((el, idx) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0, y: 30 },
          {
            clipPath: 'inset(0 0 0% 0)',
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: idx * 0.08
          }
        )
      })

      // Glitch hover effect
      if (glitchTextRef.current) {
        const el = glitchTextRef.current
        const enter = () => {
          const tl = gsap.timeline()
          tl.to(el, { x: 2, duration: 0.06, ease: 'power1.inOut' })
            .to(el, { x: -2, duration: 0.06, ease: 'power1.inOut' })
            .to(el, { skewX: 8, duration: 0.08 })
            .to(el, { skewX: 0, x: 0, duration: 0.12 })
        }
        el.addEventListener('pointerenter', enter)
        return () => el.removeEventListener('pointerenter', enter)
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // magnetic buttons
    const magnets = rootRef.current?.querySelectorAll('.magnet') || []
    const handlers = []
    magnets.forEach((btn) => {
      const move = (e) => {
        const rect = btn.getBoundingClientRect()
        const mx = e.clientX - rect.left - rect.width / 2
        const my = e.clientY - rect.top - rect.height / 2
        const dist = Math.hypot(mx, my)
        const radius = 140
        if (dist < radius) {
          gsap.to(btn, { x: mx * 0.4, y: my * 0.4, duration: 0.3, ease: 'power3.out' })
        } else {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
        }
      }
      const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
      window.addEventListener('pointermove', move)
      btn.addEventListener('pointerleave', leave)
      handlers.push(() => {
        window.removeEventListener('pointermove', move)
        btn.removeEventListener('pointerleave', leave)
      })
    })
    return () => handlers.forEach((fn) => fn())
  }, [])

  useEffect(() => {
    // custom cursor spotlight
    const spot = spotlightRef.current
    const move = (e) => {
      if (!spot) return
      gsap.to(spot, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 0.2,
        ease: 'power3.out'
      })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <section ref={rootRef} className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* noise overlay */}
      <div ref={noiseRef} className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}></div>

      {/* spotlight gradient following cursor - pointer-events none to not block Spline */}
      <div ref={spotlightRef} className="pointer-events-none fixed left-1/2 top-1/2 z-20 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(600px circle at center, rgba(0,255,136,0.22), transparent 60%)', filter: 'blur(40px)' }} />

      {/* distorted grid background */}
      <div ref={gridRef} className="absolute -left-16 -top-24 h-[140vh] w-[160vw] bg-[size:80px_80px] opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,217,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,128,0.2) 1px, transparent 1px)' }} />

      {/* Spline 3D scene - behind content */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Asymmetric side nav */}
      <div className="fixed left-4 top-6 z-30 flex flex-col gap-3">
        <button className="magnet text-[10px] uppercase tracking-widest bg-white/5 backdrop-blur border border-white/10 px-3 py-2 skew-y-3 hover:bg-white/10 transition will-change-transform">Index</button>
        <button className="magnet text-[10px] uppercase tracking-widest bg-white/5 backdrop-blur border border-white/10 px-3 py-2 -skew-y-6 hover:bg-white/10 transition will-change-transform">Labs</button>
        <button className="magnet text-[10px] uppercase tracking-widest bg-white/5 backdrop-blur border border-white/10 px-3 py-2 skew-y-3 hover:bg-white/10 transition will-change-transform">Archive</button>
      </div>

      {/* Giant glitchy text */}
      <div className="relative z-10 pt-24 md:pt-36 pr-8">
        <h1 ref={glitchTextRef} className="hero-rotate reveal leading-none font-black select-none" style={{ fontSize: '18vw', lineHeight: 0.8, letterSpacing: '-0.02em', textShadow: '2px 0 #ff0080, -2px 0 #00d9ff' }}>
          DIGITAL<br />BRUTALISM
        </h1>
        <p className="reveal mt-6 max-w-[50ch] text-[14px] md:text-[16px] opacity-80 -rotate-2 pl-2 border-l-2 border-l-[#00ff88]">
          Cyberpunk energy. Broken symmetry. Off-grid layouts. A playground of neon glass, ripped edges, morphing blobs and parallax artifacts. Nothing is centered. Everything is alive.
        </p>
      </div>

      {/* floating parallax layers */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div ref={el => (layersRef.current[0] = el)} className="absolute right-10 top-24 h-40 w-40 rounded-xl bg-[#00ff88]/10 backdrop-blur-xl border border-[#00ff88]/30 rotate-6" style={{ boxShadow: '0 0 60px #00ff8840' }} />
        <div ref={el => (layersRef.current[1] = el)} className="absolute left-20 top-56 h-64 w-48 rounded-[2rem] bg-[#ff0080]/10 backdrop-blur-xl border border-[#ff0080]/30 -rotate-12" style={{ boxShadow: '0 0 60px #ff008040' }} />
        <div ref={el => (layersRef.current[2] = el)} className="absolute right-32 bottom-10 h-52 w-52 rounded-full bg-[#00d9ff]/10 backdrop-blur-xl border border-[#00d9ff]/30 rotate-12" style={{ boxShadow: '0 0 60px #00d9ff40' }} />
      </div>

      {/* Floating labels/tags */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="absolute text-[12px] px-2 py-1 bg-white/5 border border-white/15 backdrop-blur-sm" style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 2)}deg)` }}>
            EXP-{(i + 1).toString().padStart(2, '0')}
          </span>
        ))}
      </div>

      {/* angled glass panel with torn edges illusion */}
      <div className="relative z-20 mt-16 mb-24 rotate-2">
        <div className="mx-[-10vw] bg-white/5 backdrop-blur-2xl border-y border-white/10" style={{ maskImage: 'radial-gradient(120% 60% at 50% 35%, black 60%, transparent 100%)' }}>
          <div className="skew-y-3 px-8 md:px-16 py-12 grid md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h2 className="reveal text-5xl md:text-7xl font-extrabold tracking-tight" style={{ textShadow: '1px 0 #ff0080, -1px 0 #00d9ff' }}>
                Off-Grid Interface Lab
              </h2>
              <p className="reveal mt-4 text-sm md:text-base opacity-80 max-w-prose">
                We break constraints and then animate the debris. Scroll to bend space. Hover to glitch the matrix. Drag the neon and make it scream.
              </p>
            </div>
            <div className="flex items-end justify-end">
              <a href="#bento" className="magnet inline-flex items-center gap-3 text-black px-5 py-3 bg-[#00ff88] hover:bg-[#00d9ff] transition rounded border border-black/20 shadow-[0_0_0_2px_#000]">
                Enter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
