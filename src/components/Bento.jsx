import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined' && gsap) gsap.registerPlugin(ScrollTrigger)

export default function Bento() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.bento-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, rotateZ: i % 2 ? -2 : 3, opacity: 0.001 },
          {
            y: 0,
            opacity: 1,
            rotateZ: i % 2 ? -1 : 2,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' }
          }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="bento" ref={rootRef} className="relative bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 10%, rgba(0,255,136,0.15), transparent 40%), radial-gradient(circle at 80% 90%, rgba(255,0,128,0.12), transparent 40%)' }} />

      <div className="mx-4 md:mx-12 -skew-y-2">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="bento-card col-span-7 md:col-span-5 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-10 min-h-[280px] rotate-1">
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter" style={{ textShadow: '1px 0 #00ff88' }}>Y2K LAB</h3>
            <p className="mt-4 text-sm md:text-base opacity-80 max-w-prose">Heavy fonts. Sharp edges. Kinetic color. Built for disobedience.</p>
          </div>

          <div className="bento-card col-span-5 md:col-span-3 bg-[#ff0080]/20 border border-[#ff0080]/40 min-h-[300px] p-4 md:p-6 rounded-xl rotate-[-2deg]">
            <div className="h-full w-full rounded-lg border border-white/20 bg-black/30 backdrop-blur will-change-transform flex items-end p-3 text-[12px]">glitch-field</div>
          </div>

          <div className="bento-card col-span-12 md:col-span-4 bg-[#00d9ff]/10 border border-[#00d9ff]/30 min-h-[300px] p-6 md:p-8 rounded-2xl rotate-2">
            <p className="text-xs uppercase tracking-widest opacity-70">Signal</p>
            <h4 className="text-3xl md:text-5xl font-extrabold mix-blend-screen" style={{ color: '#00d9ff' }}>PARALLAX</h4>
          </div>

          <div className="bento-card col-span-6 md:col-span-6 bg-white/5 border border-white/10 min-h-[360px] rounded-2xl overflow-hidden rotate-[-1deg]">
            <div className="h-full w-full bg-[linear-gradient(135deg,#00ff88_0%,transparent_40%),linear-gradient(225deg,#ff0080_0%,transparent_45%)] mix-blend-screen" />
          </div>

          <div className="bento-card col-span-6 md:col-span-6 bg-white/5 border border-white/10 min-h-[200px] rounded-xl p-6 rotate-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest opacity-70">Artifacts</span>
              <span className="text-[10px] bg-white/10 px-2 py-1 border border-white/20">beta</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-[12px]">
              {['mesh', 'blur', 'scan', 'tear', 'shift', 'glow'].map((t) => (
                <button key={t} className="magnet bg-black/60 border border-white/20 px-3 py-2 text-left hover:bg-black/40 transition will-change-transform">{t}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
