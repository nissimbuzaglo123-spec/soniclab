import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { asset } from '../flavors.js'

/**
 * Mid-scroll centerpiece: pinned section where the Seedance splash film
 * scales from a small framed card to full-bleed while the headline splits
 * apart above and below the frame.
 */
export default function VideoReveal() {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const topLineRef = useRef(null)
  const bottomLineRef = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      tl.fromTo(
        frameRef.current,
        {
          scale: isMobile ? 0.55 : 0.32,
          borderRadius: 28,
          filter: 'brightness(0.85)',
        },
        {
          scale: 1,
          borderRadius: 0,
          filter: 'brightness(1)',
          ease: 'power1.inOut',
          duration: 1,
        },
      )
        .to(topLineRef.current, { yPercent: -160, opacity: 0.9, ease: 'power1.inOut', duration: 1 }, 0)
        .to(bottomLineRef.current, { yPercent: 160, opacity: 0.9, ease: 'power1.inOut', duration: 1 }, 0)
        .to({}, { duration: 0.35 }) // hold full-bleed before releasing the pin
    }, sectionRef)

    // play/pause with visibility to save battery
    const vid = videoRef.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!vid) return
        if (entry.isIntersecting) vid.play().catch(() => {})
        else vid.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(vid)

    return () => {
      ctx.revert()
      io.disconnect()
    }
  }, [])

  return (
    <section id="reveal" ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      {/* split headline — top half above the frame, bottom half below */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <p className="eyebrow mb-4">Shot on Seedance — Slow Motion</p>
        <h2
          ref={topLineRef}
          className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-none text-white will-change-transform"
        >
          FEEL THE
        </h2>
        <div className="h-[22vh] md:h-[30vh]" />
        <h2
          ref={bottomLineRef}
          className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-none text-[var(--accent)] will-change-transform"
        >
          SURGE
        </h2>
      </div>

      {/* the video frame */}
      <div
        ref={frameRef}
        className="absolute inset-0 z-10 overflow-hidden will-change-transform"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={asset('seedance-hero.mp4')}
          poster={asset('seedance-hero-poster.jpg')}
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07050a]/60 via-transparent to-[#07050a]/60" />
        <p className="absolute bottom-5 left-6 eyebrow">RISE — The Film · Cold. Loud. Alive.</p>
      </div>
    </section>
  )
}
