import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { collection } from '../data/properties.js'

function TiltCard({ item, index }) {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)

  const onMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`
  }
  const onLeave = () => {
    cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={wrapRef}
      className="tilt-wrap collection-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ marginTop: index % 2 === 1 ? 'clamp(0px, 5vw, 80px)' : 0 }}
    >
      <div ref={cardRef} className="tilt-card group cursor-pointer">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={item.image}
            alt={`${item.name}, ${item.location}`}
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full liquid-glass opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6" style={{ transform: 'translateZ(40px)' }}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{item.location}</p>
            <h3 className="font-serif-lux mt-1 text-2xl font-medium">{item.name}</h3>
            <div className="mt-2 flex items-center justify-between text-sm text-[var(--cream)]/70">
              <span>{item.detail}</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-[var(--muted)]">Private sale</span>
          <span className="font-medium text-[var(--gold)]">{item.price}</span>
        </div>
      </div>
    </div>
  )
}

export default function Collection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collection-head', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.utils.toArray('.collection-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 0.9,
          delay: (i % 4) * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative z-10 bg-[var(--void)] px-4 py-24 sm:px-6 md:px-12 md:py-36"
    >
      <div className="collection-head mx-auto mb-16 max-w-7xl md:mb-24">
        <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">The Collection</p>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-serif-lux max-w-xl text-4xl font-medium leading-tight sm:text-5xl md:text-6xl">
            Twelve residences a year. Never more.
          </h2>
          <p className="max-w-sm text-[var(--cream)]/60">
            Each one chosen the way you'd choose art — slowly, and only once. These four are available this
            season.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {collection.map((item, i) => (
          <TiltCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
