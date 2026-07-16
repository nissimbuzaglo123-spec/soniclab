import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { heroProperties } from '../data/properties.js'

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-inner > *', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 flex min-h-[80svh] items-center justify-center overflow-hidden px-4 py-32 text-center sm:px-6"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40 blur-[2px] scale-105"
        src={heroProperties[0].video}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--void)] via-[var(--void)]/60 to-[var(--void)]" />

      <div className="cta-inner relative z-10 mx-auto max-w-2xl">
        <p className="mb-6 text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">Private Clients</p>
        <h2 className="font-serif-lux text-5xl font-medium leading-none sm:text-6xl md:text-8xl">
          Begin the conversation.
        </h2>
        <p className="mx-auto mt-8 max-w-md text-lg text-[var(--cream)]/65">
          One call. No portals, no listings, no noise. Tell us how you want to live — we'll tell you what
          we're holding.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:private@aurumestates.com"
            className="rounded-full bg-[var(--cream)] px-8 py-3 font-medium text-black transition-colors hover:bg-[var(--gold)]"
          >
            Speak With Us
          </a>
          <a href="#collection" className="liquid-glass rounded-full px-8 py-3 font-medium">
            View the Collection
          </a>
        </div>
      </div>
    </section>
  )
}
