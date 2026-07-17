import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { sequenceVideo } from '../data/properties.js'

// Scroll-scrubbed cinematic sequence: the flythrough video is pinned and its
// timeline is driven frame-by-frame by scroll position (image-sequence style).
export default function SequenceScroll() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    video.pause()

    const state = { time: 0 }
    let duration = 0

    const applyTime = () => {
      if (!duration) return
      // quantize to ~30fps steps so seeks resolve quickly and evenly
      const t = Math.min(state.time, duration - 0.05)
      if (Math.abs(video.currentTime - t) > 0.02) {
        video.currentTime = t
      }
    }

    const ctx = gsap.context(() => {
      const tween = gsap.to(state, {
        time: () => duration || 10,
        ease: 'none',
        paused: true,
        onUpdate: applyTime,
      })

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 0.4,
          pin: true,
          onUpdate: (self) => {
            if (duration) {
              state.time = self.progress * (duration - 0.05)
              applyTime()
            }
          },
        },
      })
      void tween
      void st

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=80%',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    const onMeta = () => {
      duration = video.duration
      video.currentTime = 0
    }
    video.addEventListener('loadedmetadata', onMeta)
    if (video.readyState >= 1) onMeta()

    return () => {
      ctx.revert()
      video.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 h-svh overflow-hidden bg-[var(--void)]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={sequenceVideo}
        muted
        playsInline
        preload="auto"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--void)] via-transparent to-[var(--void)]/60" />
      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-16 z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">
          Walk through before you arrive
        </p>
        <h2 className="font-serif-lux text-3xl font-medium sm:text-5xl md:text-6xl">
          Every residence, told one frame at a time.
        </h2>
      </div>
    </section>
  )
}
