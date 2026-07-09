import { useEffect, useMemo, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Nav from './components/Nav.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import TravelingCan from './components/TravelingCan.jsx'

// three.js lives in its own lazy chunk so first paint doesn't wait for it
const Particles = lazy(() => import('./components/Particles.jsx'))
import Hero from './components/Hero.jsx'
import Showcase from './components/Showcase.jsx'
import VideoReveal from './components/VideoReveal.jsx'
import Ingredients from './components/Ingredients.jsx'
import Science from './components/Science.jsx'
import FlavorSpin from './components/FlavorSpin.jsx'
import Lifestyle from './components/Lifestyle.jsx'
import CTA from './components/CTA.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const finePointer = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
    [],
  )

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.11,
      wheelMultiplier: 1,
      smoothWheel: true,
    })
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // let ScrollTrigger recalc once fonts/images settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => {
      clearTimeout(t)
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  useEffect(() => {
    if (finePointer) document.body.classList.add('has-cursor')
    return () => document.body.classList.remove('has-cursor')
  }, [finePointer])

  return (
    <>
      <Loader />
      {finePointer && <Cursor />}
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <Nav />
      <TravelingCan />
      <main className="relative z-10">
        <Hero />
        <Showcase />
        <VideoReveal />
        <Ingredients />
        <Science />
        <FlavorSpin />
        <Lifestyle />
        <CTA />
      </main>
    </>
  )
}
