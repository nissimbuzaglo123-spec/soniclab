import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { asset } from '../flavors.js'

export default function Lifestyle() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 120, scale: 0.94 },
        {
          y: -40,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
      gsap.utils.toArray('.life-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
    }, sectionRef)

    const vid = videoRef.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!vid) return
        if (entry.isIntersecting) vid.play().catch(() => {})
        else vid.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(vid)

    return () => {
      ctx.revert()
      io.disconnect()
    }
  }, [])

  return (
    <section id="wild" ref={sectionRef} className="relative px-5 md:px-12 py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="life-reveal eyebrow mb-4">In the Wild</p>
            <h2 className="life-reveal font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] text-white">
              MADE FOR
              <br />
              REAL MORNINGS<span className="text-[#3b82f6]">.</span>
            </h2>
          </div>
          <p className="life-reveal max-w-xs text-sm text-[var(--muted)] leading-relaxed">
            Rooftop, 6:04 AM. No script, no crew call — just the first cold sip after the last
            hard mile.
          </p>
        </div>

        <div
          ref={cardRef}
          className="relative mt-14 rounded-3xl overflow-hidden border border-white/8 will-change-transform"
        >
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            src={asset('rooftop-lifestyle.mp4')}
            poster={asset('rooftop-lifestyle-poster.jpg')}
            muted={muted}
            loop
            playsInline
            preload="none"
          />
          <p className="absolute bottom-5 left-6 eyebrow">RISE — The Rooftop Cut</p>
          <button
            data-hover
            onClick={() => {
              const next = !muted
              setMuted(next)
              if (videoRef.current) videoRef.current.muted = next
            }}
            className="absolute bottom-4 right-5 rounded-full border border-white/25 bg-black/40 backdrop-blur px-5 py-2 text-[11px] font-bold tracking-[0.2em] uppercase hover:border-white/60 transition-all"
          >
            {muted ? '● Sound Off' : '● Sound On'}
          </button>
        </div>
      </div>
    </section>
  )
}
