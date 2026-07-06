import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { x: pos.x, y: pos.y }

    const xDot = gsap.quickSetter(dot, 'x', 'px')
    const yDot = gsap.quickSetter(dot, 'y', 'px')
    const xRing = gsap.quickSetter(ring, 'x', 'px')
    const yRing = gsap.quickSetter(ring, 'y', 'px')

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      xDot(pos.x - 4)
      yDot(pos.y - 4)
      xRing(ringPos.x - 18)
      yRing(ringPos.y - 18)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) ring.classList.add('is-hover')
      else ring.classList.remove('is-hover')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    gsap.ticker.add(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
