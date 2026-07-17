import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import SequenceScroll from './components/SequenceScroll.jsx'
import Collection from './components/Collection.jsx'
import Signature from './components/Signature.jsx'
import Philosophy from './components/Philosophy.jsx'
import Marquee from './components/Marquee.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-[var(--void)] text-[var(--cream)]">
      <Navbar />
      <Hero />
      <SequenceScroll />
      <Collection />
      <Signature />
      <Philosophy />
      <Marquee />
      <CTA />
      <Footer />
    </div>
  )
}
