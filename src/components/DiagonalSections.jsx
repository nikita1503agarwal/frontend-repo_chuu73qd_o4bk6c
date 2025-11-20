import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined' && gsap) gsap.registerPlugin(ScrollTrigger)

export default function DiagonalSections() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.diag').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 },
          { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%' } }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative bg-black text-white">
      <div className="diag -skew-y-6 bg-white/5 backdrop-blur-2xl border-y border-white/10 py-24">
        <div className="mx-6 md:mx-16 rotate-2">
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter" style={{ textShadow: '1px 0 #ff0080, -1px 0 #00ff88' }}>Diagonal Reality</h3>
          <p className="mt-4 max-w-prose opacity-80">Sections cut against the flow. Backgrounds skewed and layered. The grid is broken on purpose.</p>
        </div>
      </div>

      <div className="diag skew-y-3 bg-gradient-to-br from-[#00d9ff]/10 via-transparent to-[#ff0080]/10 border-y border-white/10 py-24">
        <div className="mx-6 md:mx-16 -rotate-2 grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl">
            <h4 className="text-3xl md:text-5xl font-extrabold">Kinetic Type</h4>
            <p className="mt-3 opacity-80">Oversized typography shouts through the layers. Color channels misaligned for a subtle chromatic aberration.</p>
          </div>
          <div className="bg-black/40 border border-white/10 p-6 md:p-10 rounded-2xl rotate-2">
            <ul className="space-y-3 text-sm uppercase tracking-widest opacity-80">
              <li>Neon: #00ff88</li>
              <li>Magenta: #ff0080</li>
              <li>Cyan: #00d9ff</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
