import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FLAVORS } from '../flavors.js'

const berry = FLAVORS[0]

const FEATURES = [
  {
    num: '01',
    title: 'TRIPLE CHARGE MATRIX',
    body: 'Caffeine, taurine and B-vitamins tuned to hit fast and hold steady — no spike, no wall.',
  },
  {
    num: '02',
    title: 'ZERO SUGAR. ZERO NOISE.',
    body: 'No sugar crash, no dyes, no mystery blends. Five ingredients you can pronounce on the first try.',
  },
  {
    num: '03',
    title: 'COLD-LOCKED FLAVOR',
    body: 'Real fruit pressed cold and sealed under nitrogen, so the first sip tastes like the fruit, not the lab.',
  },
]

export default function Showcase() {
  const sectionRef = useRef(null)
  const canRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // can travels in from the right and settles tilted, scrubbed to scroll
      gsap.fromTo(
        canRef.current,
        { xPercent: 30, rotate: 14, yPercent: 12 },
        {
          xPercent: 0,
          rotate: -6,
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        },
      )
      // headline + features reveal
      gsap.utils.toArray('.show-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden px-5 md:px-12 py-28 md:py-40"
    >
      {/* hollow backdrop word */}
      <div className="absolute top-16 inset-x-0 overflow-hidden pointer-events-none select-none">
        <div className="outline-word font-display text-[20vw] leading-none whitespace-nowrap text-center">
          UNSTOPPABLE
        </div>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto grid md:grid-cols-2 gap-14 md:gap-8 items-center">
        <div className="relative order-2 md:order-1 flex justify-center">
          <div ref={canRef} className="relative will-change-transform">
            <img
              src={berry.img}
              srcSet={`${berry.imgSm} 490w, ${berry.img} 900w`}
              sizes="(max-width: 768px) 52vw, 26vw"
              alt="RISE can — built like nothing else"
              className="h-[48vh] md:h-[64vh] w-auto drop-shadow-[0_60px_80px_rgba(0,0,0,0.7)]"
              loading="lazy"
              width="490"
              height="1100"
            />
            <div
              className="absolute left-1/2 -bottom-10 h-12 w-2/3 -translate-x-1/2 rounded-[100%] blur-3xl"
              style={{ background: berry.glow }}
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="show-reveal eyebrow mb-4">The Can</p>
          <h2 className="show-reveal font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] text-white">
            BUILT LIKE
            <br />
            NOTHING ELSE<span className="text-[var(--accent)]">.</span>
          </h2>

          <div className="mt-12 space-y-9">
            {FEATURES.map((f) => (
              <div key={f.num} className="show-reveal flex gap-5 border-b border-white/8 pb-8">
                <span className="font-display text-[var(--accent)] text-lg pt-1">{f.num}</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-white tracking-wide">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed max-w-md">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
