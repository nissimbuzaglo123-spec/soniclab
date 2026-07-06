import { useRef } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../flavors.js'

const CARDS = [
  { big: '200mg', label: 'Clean Caffeine', body: 'Green-coffee derived. Fast on, smooth off — no jitters, no crash.', img: 'splash-crown.webp' },
  { big: '100%', label: 'Real Fruit', body: 'Flavor pressed from actual fruit, never a lab-built approximation.', img: 'fruit-berries.webp' },
  { big: '0g', label: 'Sugar', body: 'Nothing to spike, nothing to crash. Clean energy that stays clean.', img: 'fruit-lime.webp' },
  { big: 'B6+B12', label: 'Vitamins', body: 'A full B-complex dose for energy metabolism without the noise.', img: 'fruit-mango.webp' },
]

function TiltCard({ card, i }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 12}deg) translateY(-4px)`
  }
  const onLeave = () => {
    ref.current.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        data-hover
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-7 md:p-8 transition-transform duration-200 will-change-transform hover:border-[var(--accent)]/40"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={asset(card.img)}
          alt=""
          loading="lazy"
          className="h-16 w-16 object-contain mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
          style={{ transform: 'translateZ(40px)' }}
          width="64"
          height="64"
        />
        <div className="font-display text-4xl md:text-5xl text-[var(--accent)]">{card.big}</div>
        <div className="mt-1 text-[13px] font-bold tracking-[0.22em] uppercase text-white">
          {card.label}
        </div>
        <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{card.body}</p>
      </div>
    </motion.div>
  )
}

export default function Ingredients() {
  return (
    <section id="ingredients" className="relative px-5 md:px-12 py-28 md:py-40 overflow-hidden">
      {/* ambient floating fruit */}
      <img
        src={asset('fruit-mango.webp')}
        alt=""
        loading="lazy"
        className="floaty absolute -left-6 top-24 w-20 opacity-30 pointer-events-none"
        style={{ '--rot': '-15deg', '--dur': '9s' }}
        width="80"
        height="77"
      />
      <img
        src={asset('fruit-lime.webp')}
        alt=""
        loading="lazy"
        className="floaty absolute right-2 bottom-16 w-24 opacity-25 pointer-events-none"
        style={{ '--rot': '18deg', '--dur': '8s' }}
        width="96"
        height="89"
      />

      <div className="max-w-[1300px] mx-auto">
        <p className="eyebrow text-center mb-4">What&apos;s Inside</p>
        <h2 className="font-display text-center text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] text-white">
          NOTHING YOU
          <br />
          CAN&apos;T PRONOUNCE<span className="text-[var(--accent)]">.</span>
        </h2>

        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {CARDS.map((c, i) => (
            <TiltCard key={c.label} card={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
