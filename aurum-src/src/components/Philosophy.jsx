import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const statement =
  'We do not list properties. We keep a short, deliberate ledger of the world’s most extraordinary homes — and we introduce them only to the people who will understand them.'

const stats = [
  { value: 2.4, prefix: '€', suffix: 'B', decimals: 1, label: 'Curated since 2009' },
  { value: 12, prefix: '', suffix: '', decimals: 0, label: 'Residences per year' },
  { value: 9, prefix: '', suffix: '', decimals: 0, label: 'Countries, one standard' },
  { value: 100, prefix: '', suffix: '%', decimals: 0, label: 'Sold off-market' },
]

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.reveal-word', {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.philosophy-statement',
          start: 'top 75%',
          end: 'top 25%',
          scrub: true,
        },
      })

      gsap.utils.toArray('.stat-value').forEach((el) => {
        const target = parseFloat(el.dataset.value)
        const decimals = parseInt(el.dataset.decimals, 10)
        const prefix = el.dataset.prefix
        const suffix = el.dataset.suffix
        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            onUpdate: function () {
              el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix
            },
          },
        )
      })

      gsap.from('.stat-block', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative z-10 bg-[var(--void)] px-4 py-24 sm:px-6 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-8 text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">Philosophy</p>
        <p className="philosophy-statement font-serif-lux text-2xl font-medium leading-snug sm:text-4xl md:text-[2.75rem]">
          {statement.split(' ').map((word, i) => (
            <span key={i} className="reveal-word">
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>

      <div className="hairline mx-auto mt-20 max-w-5xl md:mt-28" />

      <div className="stats-row mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-10 text-center md:grid-cols-4 md:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="stat-block">
            <div
              className="stat-value font-serif-lux text-4xl font-medium text-[var(--gold)] md:text-5xl"
              data-value={s.value}
              data-decimals={s.decimals}
              data-prefix={s.prefix}
              data-suffix={s.suffix}
            >
              {s.prefix}0{s.suffix}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
