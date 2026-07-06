import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const STATS = [
  { value: 15, suffix: ' min', label: 'to full effect — engineered absorption curve' },
  { value: 200, suffix: 'mg', label: 'clean green-coffee caffeine per can' },
  { value: 6, suffix: ' hrs', label: 'of steady output, measured not promised' },
  { value: 0, suffix: 'g', label: 'sugar, additives or artificial dyes' },
]

export default function Science() {
  const sectionRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // count-up numbers
      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = parseFloat(el.dataset.value)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v)
          },
        })
      })

      // absorption bar fill
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.5,
          },
        },
      )

      gsap.utils.toArray('.sci-reveal').forEach((el) => {
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
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="science"
      ref={sectionRef}
      className="relative px-5 md:px-12 py-28 md:py-40 overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 90% at 50% 0%, rgba(255,36,64,0.06) 0%, transparent 55%), linear-gradient(180deg, #07050a 0%, #0b0712 50%, #07050a 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="sci-reveal eyebrow mb-4">Energy Science</p>
        <h2 className="sci-reveal font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] text-white max-w-4xl">
          YOUR BODY KEEPS
          <br />
          THE RECEIPTS<span className="text-[var(--accent)]">.</span>
        </h2>
        <p className="sci-reveal mt-6 max-w-xl text-[var(--muted)] leading-relaxed">
          Most energy drinks dump sugar and hope. RISE runs a measured caffeine curve with
          B-vitamin support, so the lift arrives fast, holds flat, and lands soft — no cliff,
          no crash, no apology.
        </p>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((s) => (
            <div key={s.label} className="sci-reveal">
              <div className="font-display text-5xl md:text-6xl text-white">
                <span className="stat-num" data-value={s.value}>
                  0
                </span>
                <span className="text-[var(--accent)]">{s.suffix}</span>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* energy curve comparison bar */}
        <div className="sci-reveal mt-20">
          <div className="flex justify-between mb-3">
            <span className="eyebrow">Sugar Energy</span>
            <span className="eyebrow text-white">RISE</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
            <div
              ref={barRef}
              className="h-full rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, #3d3549 0%, #7a3050 35%, #c22745 70%, #ff2440 100%)',
              }}
            />
          </div>
          <p className="mt-3 text-xs text-[var(--muted)]">
            Relative steady output, first six hours after intake.
          </p>
        </div>
      </div>
    </section>
  )
}
