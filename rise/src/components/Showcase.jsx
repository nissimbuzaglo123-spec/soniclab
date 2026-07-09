import { useEffect, useRef } from 'react'
import gsap from 'gsap'

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // headline + features reveal (the can arrives via TravelingCan)
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
          {/* landing anchor for the traveling can */}
          <div id="can-anchor-showcase" className="h-[48vh] md:h-[64vh] aspect-[490/1100]" />
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
