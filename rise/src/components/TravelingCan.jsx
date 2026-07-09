import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FLAVORS } from '../flavors.js'

const berry = FLAVORS[0]

/**
 * ONE can shared by the hero and the showcase section. It lives in a fixed
 * layer; every frame its position is computed from scroll:
 *   - at scroll 0 it sits exactly on the hero anchor and moves naturally
 *     with the page,
 *   - as you scroll it detaches and glides (eased arc) onto the showcase
 *     anchor,
 *   - past the handoff point it stays glued to the showcase anchor and
 *     scrolls away with it.
 * No element swaps, so there is nothing to pop or flicker.
 */
export default function TravelingCan() {
  const wrapRef = useRef(null)
  const floatRef = useRef(null)
  const tiltRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    let heroRect = null
    let showRect = null
    let endScroll = 1

    const measure = () => {
      const heroA = document.getElementById('can-anchor-hero')
      const showA = document.getElementById('can-anchor-showcase')
      if (!heroA || !showA) return
      const s = window.scrollY
      const h = heroA.getBoundingClientRect()
      const w = showA.getBoundingClientRect()
      heroRect = { left: h.left, top: h.top + s, width: h.width, height: h.height }
      showRect = { left: w.left, top: w.top + s, width: w.width, height: w.height }
      // handoff completes when the showcase anchor reaches its natural
      // reading position (vertically centered in the viewport)
      const rest = (innerHeight - showRect.height) / 2
      endScroll = Math.max(showRect.top - rest, 1)
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

    const layout = () => {
      if (!heroRect) return
      const s = window.scrollY
      const raw = Math.min(Math.max(s / endScroll, 0), 1)
      const p = easeInOut(raw)

      const restY = (innerHeight - showRect.height) / 2
      let x, y, hgt, rot
      if (s <= endScroll) {
        // hero position in viewport coords at this scroll (moves with page),
        // blended toward the showcase rest position
        x = lerp(heroRect.left, showRect.left, p)
        y = lerp(heroRect.top - s, restY, p)
        hgt = lerp(heroRect.height, showRect.height, p)
        rot = lerp(-8, -6, p) + Math.sin(p * Math.PI) * 12 // gentle arc swing mid-flight
      } else {
        // glued to the showcase anchor, scrolling away with the section
        x = showRect.left
        y = restY - (s - endScroll)
        hgt = showRect.height
        rot = -6
      }
      wrap.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`
      wrap.style.height = `${hgt}px`
      // once far above the viewport, skip paint work
      wrap.style.visibility = y < -hgt * 1.5 ? 'hidden' : 'visible'
    }

    measure()
    layout()

    // entrance
    gsap.fromTo(
      floatRef.current,
      { y: 90, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.35 },
    )

    gsap.ticker.add(layout)
    const onResize = () => {
      measure()
      layout()
    }
    window.addEventListener('resize', onResize)
    ScrollTrigger.addEventListener('refresh', onResize)
    // re-measure once everything settled
    const t = setTimeout(onResize, 700)

    // mouse tilt (desktop only)
    const fine = window.matchMedia('(pointer: fine)').matches
    let onMove
    if (fine) {
      const rx = gsap.quickTo(tiltRef.current, 'rotationY', { duration: 0.7, ease: 'power2.out' })
      const ry = gsap.quickTo(tiltRef.current, 'rotationX', { duration: 0.7, ease: 'power2.out' })
      onMove = (e) => {
        rx(((e.clientX / innerWidth) * 2 - 1) * 10)
        ry(-((e.clientY / innerHeight) * 2 - 1) * 6)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    return () => {
      clearTimeout(t)
      gsap.ticker.remove(layout)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.removeEventListener('refresh', onResize)
      if (onMove) window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed top-0 left-0 z-20 pointer-events-none will-change-transform"
      aria-hidden="true"
    >
      <div ref={floatRef} className="relative h-full">
        <div className="floaty h-full" style={{ '--dur': '6.5s' }}>
          <div ref={tiltRef} className="h-full" style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}>
            <img
              src={berry.img}
              srcSet={`${berry.imgSm} 490w, ${berry.img} 900w`}
              sizes="(max-width: 768px) 52vw, 26vw"
              alt=""
              className="h-full w-auto drop-shadow-[0_50px_60px_rgba(0,0,0,0.65)]"
              fetchPriority="high"
              width="490"
              height="1100"
            />
            <div
              className="absolute left-1/2 -bottom-8 h-10 w-3/4 -translate-x-1/2 rounded-[100%] blur-2xl"
              style={{ background: berry.glow }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
