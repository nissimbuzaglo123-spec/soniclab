import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Bolt from './Bolt.jsx'

/**
 * Intro screen: black curtain with the RISE logo that rises up from below,
 * holds a beat, keeps rising out of frame — then the curtain lifts and the
 * site is revealed. Scroll is locked while it plays.
 */
export const INTRO = 1.85 // when the reveal starts — hero entrances key off this

export default function Loader() {
  const [done, setDone] = useState(false)
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const boltRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    // App's effect (which creates Lenis) runs after this one — defer the stop
    const lock = setTimeout(() => window.__lenis?.stop(), 0)

    const finish = () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
      ScrollTrigger.refresh()
      setDone(true)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const t = setTimeout(finish, 350)
      return () => {
        clearTimeout(t)
        clearTimeout(lock)
        document.body.style.overflow = ''
      }
    }

    const tl = gsap.timeline({ onComplete: finish })
    tl.fromTo(
      logoRef.current,
      { y: 90, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
    )
      .fromTo(
        boltRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0.4,
      )
      // a breath at center — the bolt keeps pulling upward
      .to(boltRef.current, { y: -7, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 1.0)
      // the logo keeps rising, out through the top
      .to(logoRef.current, { y: -110, opacity: 0, duration: 0.5, ease: 'power2.in' }, 1.45)
      // curtain lifts, site revealed
      .to(overlayRef.current, { yPercent: -100, duration: 0.75, ease: 'power3.inOut' }, INTRO)

    return () => {
      tl.kill()
      clearTimeout(lock)
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [])

  if (done) return null
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-[#07050a] flex items-center justify-center will-change-transform"
      aria-hidden="true"
    >
      <div
        ref={logoRef}
        className="font-display text-6xl md:text-8xl tracking-[0.12em] text-white"
      >
        RISE
        <span ref={boltRef} className="text-[var(--accent)] inline-block">
          <Bolt className="inline-block h-[0.85em] w-auto" />
        </span>
      </div>
    </div>
  )
}
