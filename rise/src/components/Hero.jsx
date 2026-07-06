import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { FLAVORS, asset } from '../flavors.js'
import Bolt from './Bolt.jsx'

const berry = FLAVORS[0]

export default function Hero() {
  const sectionRef = useRef(null)
  const canRef = useRef(null)
  const canWrapRef = useRef(null)
  const fruitsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // entrance
      gsap.fromTo(
        '.hero-stagger',
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.15 },
      )
      gsap.fromTo(
        canWrapRef.current,
        { y: 90, opacity: 0, rotate: -14 },
        { y: 0, opacity: 1, rotate: -8, duration: 1.4, ease: 'power3.out', delay: 0.35 },
      )

      // idle hover float
      gsap.to(canWrapRef.current, {
        y: '-=22',
        rotate: '-=3',
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.8,
      })

      // scroll: can drifts up + tilts as hero leaves, fruits parallax at differing depths
      gsap.to(canWrapRef.current, {
        yPercent: -36,
        rotate: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      gsap.utils.toArray('.hero-fruit').forEach((el) => {
        gsap.to(el, {
          yPercent: -140 * parseFloat(el.dataset.depth || 0.5),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })
    }, sectionRef)

    // mouse tracking (desktop): can tilt + fruit parallax + moving light
    const fine = window.matchMedia('(pointer: fine)').matches
    let onMove
    if (fine) {
      const xToCan = gsap.quickTo(canRef.current, 'rotationY', { duration: 0.7, ease: 'power2.out' })
      const yToCan = gsap.quickTo(canRef.current, 'rotationX', { duration: 0.7, ease: 'power2.out' })
      onMove = (e) => {
        const nx = (e.clientX / innerWidth) * 2 - 1
        const ny = (e.clientY / innerHeight) * 2 - 1
        xToCan(nx * 10)
        yToCan(-ny * 6)
        if (fruitsRef.current) {
          for (const el of fruitsRef.current.querySelectorAll('.hero-fruit')) {
            const d = parseFloat(el.dataset.depth || 0.5)
            gsap.to(el, { x: nx * 26 * d, y: ny * 18 * d, duration: 1.1, ease: 'power2.out' })
          }
        }
        // light follows cursor
        gsap.to('.hero-light', {
          x: nx * 120,
          y: ny * 80,
          duration: 1.2,
          ease: 'power2.out',
        })
      }
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    return () => {
      ctx.revert()
      if (onMove) window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden flex items-center px-5 md:px-12 pt-24 md:pt-28 pb-16"
    >
      {/* backdrop glow that follows the cursor */}
      <div
        className="hero-light absolute left-1/2 top-1/3 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,36,64,0.16) 0%, rgba(255,36,64,0.05) 40%, transparent 70%)',
        }}
      />

      {/* giant hollow word */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-2 overflow-hidden pointer-events-none select-none">
        <div className="outline-word font-display text-[24vw] leading-none text-center whitespace-nowrap">
          ENERGY
        </div>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center w-full max-w-[1400px] mx-auto">
        {/* copy */}
        <div className="text-center md:text-left">
          <p className="hero-stagger eyebrow mb-6">
            Premium Energy — <span className="text-[var(--accent)]">Rise Above</span>
          </p>
          <h1 className="hero-stagger font-display text-[clamp(4.5rem,14vw,11rem)] leading-[0.9] text-white whitespace-nowrap">
            RISE<span className="text-[var(--accent)]"><Bolt /></span>
          </h1>
          <p className="hero-stagger mt-6 text-base md:text-lg text-[var(--muted)] max-w-md mx-auto md:mx-0 leading-relaxed">
            Clean energy that hits like a storm. Four flavors, zero sugar,
            <span className="text-white font-semibold"> 16 oz of pure voltage</span>. Stay
            unstoppable.
          </p>
          <div className="hero-stagger mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href="#flavors"
              data-hover
              onClick={(e) => {
                e.preventDefault()
                window.__lenis?.scrollTo('#flavors', { duration: 1.6 })
              }}
              className="rounded-full bg-[var(--accent)] px-8 py-4 text-[13px] font-bold tracking-[0.2em] uppercase text-white shadow-[0_0_40px_rgba(255,36,64,0.45)] hover:shadow-[0_0_60px_rgba(255,36,64,0.7)] hover:scale-[1.03] transition-all"
            >
              Find Your Flavor
            </a>
            <a
              href="#reveal"
              data-hover
              onClick={(e) => {
                e.preventDefault()
                window.__lenis?.scrollTo('#reveal', { duration: 1.6 })
              }}
              className="rounded-full border border-white/25 px-8 py-4 text-[13px] font-bold tracking-[0.2em] uppercase hover:border-white/60 transition-all"
            >
              Watch the Film
            </a>
          </div>
        </div>

        {/* can + floating fruit */}
        <div ref={fruitsRef} className="relative h-[52vh] md:h-[72vh]" style={{ perspective: '1200px' }}>
          <img
            className="hero-fruit floaty absolute left-[4%] top-[12%] w-16 md:w-24 opacity-90"
            data-depth="0.9"
            style={{ '--rot': '-12deg', '--dur': '6s' }}
            src={asset('fruit-berries.webp')}
            alt=""
            width="120"
            height="117"
          />
          <img
            className="hero-fruit floaty absolute right-[2%] top-[6%] w-12 md:w-16 opacity-70"
            data-depth="1.4"
            style={{ '--rot': '14deg', '--dur': '8s' }}
            src={asset('splash-crown.webp')}
            alt=""
            width="80"
            height="51"
          />
          <img
            className="hero-fruit floaty absolute left-[10%] bottom-[8%] w-10 md:w-14 opacity-60"
            data-depth="1.1"
            style={{ '--rot': '8deg', '--dur': '7s' }}
            src={asset('fruit-berries.webp')}
            alt=""
            width="70"
            height="68"
          />

          <div
            ref={canWrapRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          >
            <div ref={canRef} style={{ transformStyle: 'preserve-3d' }}>
              <img
                src={berry.img}
                srcSet={`${berry.imgSm} 490w, ${berry.img} 900w`}
                sizes="(max-width: 768px) 40vw, 24vw"
                alt="RISE Strawberry energy drink can"
                className="h-[44vh] md:h-[62vh] w-auto drop-shadow-[0_50px_60px_rgba(0,0,0,0.65)]"
                fetchPriority="high"
                width="490"
                height="1100"
              />
            </div>
            {/* glow under the can */}
            <div
              className="absolute left-1/2 -bottom-8 h-10 w-3/4 -translate-x-1/2 rounded-[100%] blur-2xl"
              style={{ background: berry.glow }}
            />
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-10"
      >
        <span className="eyebrow">Scroll</span>
        <div className="h-10 w-6 rounded-full border border-white/25 flex justify-center pt-2">
          <div className="scroll-dot h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      </motion.div>
    </section>
  )
}
