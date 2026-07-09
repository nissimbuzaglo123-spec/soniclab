import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FLAVORS } from '../flavors.js'

/**
 * Pinned flavor morph: the can stays full-width and centered the whole way
 * through; scroll drives ONE continuous opacity crossfade along the flavor
 * chain (red → green → orange → purple), with only a gentle sway for life.
 * Background glow, giant word, counter and copy interpolate in sync — the
 * morph is a smooth blend, never a hard cut.
 */

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const RGB = FLAVORS.map((f) => hexToRgb(f.color))

export default function FlavorSpin() {
  const sectionRef = useRef(null)
  const spinRef = useRef(null)
  const glowRef = useRef(null)
  const wordRef = useRef(null)
  const numRef = useRef(null)
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const dotsRef = useRef(null)
  const imgRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      let lastIdx = -1

      const smooth = (t) => t * t * (3 - 2 * t) // smoothstep

      const render = (p) => {
        // one continuous crossfade chain across the whole pin:
        // segment 0: red→green, 1: green→orange, 2: orange→purple
        const seg = Math.min(Math.max(p, 0), 0.9999) * (FLAVORS.length - 1)
        const fromIdx = Math.floor(seg)
        const toIdx = Math.min(fromIdx + 1, FLAVORS.length - 1)
        const blend = smooth(seg - fromIdx)

        // the can stays full-width; just a slow, gentle sway for life
        const sway = Math.sin(p * Math.PI * 3) * 2.2
        const bob = Math.sin(p * Math.PI * 5) * 8
        if (spinRef.current) {
          spinRef.current.style.transform = `rotate(${sway}deg) translateY(${bob}px)`
        }

        // active flavor = whichever side of the blend we're closer to
        const idx = blend > 0.5 ? toIdx : fromIdx

        // can image opacities — plain, continuous crossfade
        imgRefs.current.forEach((img, i) => {
          if (!img) return
          let o = 0
          if (i === fromIdx) o = 1 - blend
          else if (i === toIdx) o = blend
          img.style.opacity = o
        })

        // background + accents interpolate between flavor colors
        const a = RGB[fromIdx]
        const b = RGB[toIdx]
        const t = blend
        const r = Math.round(a[0] + (b[0] - a[0]) * t)
        const g = Math.round(a[1] + (b[1] - a[1]) * t)
        const bl = Math.round(a[2] + (b[2] - a[2]) * t)
        if (glowRef.current) {
          glowRef.current.style.background = `radial-gradient(60% 55% at 50% 55%, rgba(${r},${g},${bl},0.22) 0%, rgba(${r},${g},${bl},0.05) 45%, transparent 70%)`
        }
        if (dotsRef.current) {
          const dots = dotsRef.current.children
          for (let i = 0; i < dots.length; i++) {
            dots[i].style.background = i === idx ? `rgb(${r},${g},${bl})` : 'rgba(255,255,255,0.18)'
            dots[i].style.transform = i === idx ? 'scale(1.5)' : 'scale(1)'
          }
        }

        // text swaps once per flavor
        if (idx !== lastIdx) {
          lastIdx = idx
          const f = FLAVORS[idx]
          if (wordRef.current) wordRef.current.textContent = f.word
          if (numRef.current) numRef.current.textContent = `${f.num} / 04`
          if (nameRef.current) {
            nameRef.current.textContent = f.name
            nameRef.current.style.color = f.color
          }
          if (descRef.current) descRef.current.textContent = f.desc
          gsap.fromTo(
            [nameRef.current, descRef.current],
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out', overwrite: true },
          )
        }
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=340%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => render(self.progress),
      })

      render(0)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="flavors" ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      {/* flavor-tinted glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none" />

      {/* giant flavor word behind the can */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          ref={wordRef}
          className="outline-word font-display text-[18vw] whitespace-nowrap leading-none"
        >
          STRAWBERRY
        </span>
      </div>

      <div className="relative z-10 h-full max-w-[1300px] mx-auto px-5 md:px-12 grid md:grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* copy — left on desktop, bottom overlay on mobile */}
        <div className="absolute bottom-16 inset-x-5 md:static md:bottom-auto md:inset-x-auto text-center md:text-left">
          <p className="eyebrow mb-2">Four Flavors — One Can</p>
          <p ref={numRef} className="font-display text-sm tracking-[0.3em] text-white/60 mb-3">
            01 / 04
          </p>
          <h3 ref={nameRef} className="font-display text-4xl md:text-6xl" style={{ color: FLAVORS[0].color }}>
            Strawberry
          </h3>
          <p ref={descRef} className="mt-3 text-sm md:text-base text-[var(--muted)] max-w-xs mx-auto md:mx-0 leading-relaxed">
            {FLAVORS[0].desc}
          </p>
        </div>

        {/* spinning can — all four stacked, opacity-driven */}
        <div className="justify-self-center" style={{ perspective: '1000px' }}>
          <div
            ref={spinRef}
            className="relative h-[46vh] md:h-[64vh] aspect-[490/1100] will-change-transform"
          >
            {FLAVORS.map((f, i) => (
              <img
                key={f.id}
                ref={(el) => (imgRefs.current[i] = el)}
                src={f.img}
                srcSet={`${f.imgSm} 490w, ${f.img} 900w`}
                sizes="(max-width: 768px) 42vw, 24vw"
                alt={`RISE ${f.name}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.7)]"
                style={{ opacity: i === 0 ? 1 : 0 }}
                width="490"
                height="1100"
              />
            ))}
          </div>
        </div>

        {/* progress dots */}
        <div ref={dotsRef} className="hidden md:flex flex-col gap-3 justify-self-end">
          {FLAVORS.map((f) => (
            <div key={f.id} className="h-2.5 w-2.5 rounded-full transition-all duration-300" style={{ background: 'rgba(255,255,255,0.18)' }} />
          ))}
        </div>
      </div>

      <p className="absolute bottom-6 inset-x-0 text-center eyebrow">
        Keep scrolling — the can changes flavor
      </p>
    </section>
  )
}
