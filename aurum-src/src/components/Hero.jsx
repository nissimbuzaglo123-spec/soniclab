import { useEffect, useRef, useState } from 'react'
import { MapPin, Maximize, Tag, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { heroProperties } from '../data/properties.js'

export default function Hero() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(0)
  const [fading, setFading] = useState(false)
  const fadeTimer = useRef(null)

  // Crossfade: fade current media out, swap, fade back in
  const go = (dir) => {
    if (fading) return
    const next = (active + dir + heroProperties.length) % heroProperties.length
    setFading(true)
    setActive(next)
    fadeTimer.current = setTimeout(() => {
      setVisible(next)
      setFading(false)
    }, 600)
  }

  useEffect(() => () => clearTimeout(fadeTimer.current), [])

  const p = heroProperties[visible]

  return (
    <section id="residences" className="relative flex h-svh flex-col overflow-hidden">
      {/* Background video */}
      <div className={`hero-media absolute inset-0 z-0 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        <video
          key={p.id}
          className="h-full w-full object-cover"
          src={p.video}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Bottom blur overlay — mask only, no dark gradient */}
      <div className="bottom-blur-overlay absolute inset-0 z-[1]" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16 pt-24">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end">
          <div className="flex-1" key={`content-${p.id}`}>
            {/* Metadata row */}
            <div
              className="animate-blur-fade-up mb-6 flex flex-wrap items-center gap-3 text-xs sm:gap-6 sm:text-sm md:mb-8"
              style={{ animationDelay: '300ms' }}
            >
              <span className="flex items-center gap-2 font-medium">
                <MapPin size={16} className="text-[var(--gold)] sm:h-5 sm:w-5" />
                {p.location}
              </span>
              <span className="flex items-center gap-2">
                <Maximize size={16} className="text-[var(--gold)]" />
                {p.area}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={16} className="text-[var(--gold)]" />
                {p.price}
              </span>
            </div>

            {/* Title */}
            <h1
              className="animate-blur-fade-up font-serif-lux mb-4 text-4xl font-medium sm:text-5xl md:mb-6 md:text-6xl lg:text-8xl"
              style={{ animationDelay: '400ms', letterSpacing: '-0.02em' }}
            >
              {p.title}
            </h1>

            {/* Description */}
            <p
              className="animate-blur-fade-up mb-6 max-w-2xl text-base text-[var(--cream)]/70 sm:text-lg md:mb-12 md:text-xl"
              style={{ animationDelay: '500ms' }}
            >
              {p.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#contact"
                className="animate-blur-fade-up flex items-center gap-2 rounded-full bg-[var(--cream)] px-6 py-2.5 font-medium text-black transition-colors hover:bg-[var(--gold)] sm:px-8 sm:py-3"
                style={{ animationDelay: '600ms' }}
              >
                <Play size={18} className="fill-black" />
                Private Viewing
              </a>
              <a
                href="#collection"
                className="animate-blur-fade-up liquid-glass rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3"
                style={{ animationDelay: '700ms' }}
              >
                Explore Residence
              </a>
            </div>
          </div>

          {/* Prev / Next property */}
          <div className="flex gap-3">
            <button
              onClick={() => go(-1)}
              className="animate-blur-fade-up liquid-glass flex items-center rounded-full px-4 py-2.5 sm:px-6 sm:py-3"
              style={{ animationDelay: '800ms' }}
              aria-label="Previous residence"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              className="animate-blur-fade-up liquid-glass flex items-center rounded-full px-4 py-2.5 sm:px-6 sm:py-3"
              style={{ animationDelay: '900ms' }}
              aria-label="Next residence"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Property index dots */}
        <div className="mt-6 flex gap-2 md:mt-8">
          {heroProperties.map((prop, i) => (
            <span
              key={prop.id}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                i === active ? 'w-10 bg-[var(--gold)]' : 'w-4 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
