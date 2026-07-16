import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { signaturePanels } from '../data/properties.js'

export default function Signature() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const getDistance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray('.sig-img').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              scrub: true,
            },
          },
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 h-svh overflow-hidden bg-[var(--deep)]">
      <div className="absolute left-4 top-10 z-20 sm:left-6 md:left-12 md:top-14">
        <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">Signature Residence</p>
        <h2 className="font-serif-lux text-3xl font-medium sm:text-4xl md:text-5xl">Casa Aurelia, room by room.</h2>
      </div>

      <div ref={trackRef} className="flex h-full items-end gap-6 px-4 pb-14 pt-40 sm:px-6 md:gap-10 md:px-12">
        {signaturePanels.map((panel) => (
          <div key={panel.kicker} className="relative h-[62vh] w-[82vw] flex-shrink-0 overflow-hidden rounded-sm sm:w-[70vw] md:h-[68vh] md:w-[58vw]">
            <img
              src={panel.image}
              alt={panel.kicker}
              className="sig-img absolute inset-0 h-full w-[120%] max-w-none object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-9">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{panel.kicker}</p>
              <p className="font-serif-lux mt-2 max-w-md text-2xl font-medium italic md:text-3xl">
                {panel.line}
              </p>
            </div>
          </div>
        ))}
        <div className="flex h-[62vh] w-[60vw] flex-shrink-0 items-center justify-center md:h-[68vh] md:w-[36vw]">
          <div className="text-center">
            <p className="font-serif-lux text-3xl font-medium md:text-4xl">The rest is seen in person.</p>
            <a
              href="#contact"
              className="liquid-glass mt-8 inline-block rounded-full px-8 py-3 font-medium"
            >
              Request the Full Dossier
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
