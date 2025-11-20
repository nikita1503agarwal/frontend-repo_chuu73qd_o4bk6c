import { useEffect } from 'react'
import Hero from './components/Hero'
import Bento from './components/Bento'
import DiagonalSections from './components/DiagonalSections'

function App() {
  useEffect(() => {
    // setup smooth scrolling wrapper required by ScrollSmoother
    const wrapper = document.getElementById('smooth-wrapper')
    const content = document.getElementById('smooth-content')
    if (!wrapper) {
      const w = document.createElement('div')
      w.id = 'smooth-wrapper'
      w.style.position = 'relative'
      w.style.overflow = 'hidden'

      const c = document.createElement('div')
      c.id = 'smooth-content'
      while (document.body.firstChild) {
        c.appendChild(document.body.firstChild)
      }
      w.appendChild(c)
      document.body.appendChild(w)
    } else if (!content) {
      const c2 = document.createElement('div')
      c2.id = 'smooth-content'
      while (wrapper.firstChild) {
        c2.appendChild(wrapper.firstChild)
      }
      wrapper.appendChild(c2)
    }
  }, [])

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* grain overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-soft-light" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />

      {/* floating menu */}
      <div className="fixed right-4 top-6 z-40 flex items-center gap-2">
        <button className="magnet text-[11px] uppercase tracking-widest bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 px-3 py-2 hover:bg-[#00ff88]/30 transition will-change-transform">Pulse</button>
        <button className="magnet text-[11px] uppercase tracking-widest bg-[#ff0080]/20 text-[#ff0080] border border-[#ff0080]/40 px-3 py-2 hover:bg-[#ff0080]/30 transition will-change-transform">Shift</button>
        <button className="magnet text-[11px] uppercase tracking-widest bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/40 px-3 py-2 hover:bg-[#00d9ff]/30 transition will-change-transform">Warp</button>
      </div>

      <Hero />
      <Bento />
      <DiagonalSections />

      <footer className="relative bg-black text-white py-16">
        <div className="mx-6 md:mx-16 flex flex-wrap items-end gap-6">
          <h5 className="text-[12px] uppercase tracking-widest opacity-70">Digital Brutalism meets Cyberpunk</h5>
          <div className="text-[10px] opacity-60">Made for experiments • Mixed sizes • Broken grid • Heavy blur</div>
        </div>
      </footer>
    </div>
  )
}

export default App
