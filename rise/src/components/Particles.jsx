import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Fixed full-screen Three.js (r128) layer: floating water droplets that
 * drift upward and get repelled by the cursor. Kept intentionally cheap:
 * one Points geometry, canvas sprite, capped DPR, reduced count on mobile.
 */
export default function Particles() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const COUNT = isMobile ? 45 : 130

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(innerWidth, innerHeight)
    mount.appendChild(renderer.domElement)

    // droplet sprite drawn on a small canvas
    const cnv = document.createElement('canvas')
    cnv.width = cnv.height = 64
    const ctx = cnv.getContext('2d')
    const grad = ctx.createRadialGradient(28, 24, 2, 32, 32, 30)
    grad.addColorStop(0, 'rgba(255,255,255,0.95)')
    grad.addColorStop(0.25, 'rgba(210,225,255,0.45)')
    grad.addColorStop(0.7, 'rgba(160,180,230,0.12)')
    grad.addColorStop(1, 'rgba(160,180,230,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const sprite = new THREE.CanvasTexture(cnv)

    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)
    const phases = new Float32Array(COUNT)
    const spanX = 16
    const spanY = 10
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spanX
      positions[i * 3 + 1] = (Math.random() - 0.5) * spanY
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      speeds[i] = 0.15 + Math.random() * 0.5
      phases[i] = Math.random() * Math.PI * 2
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.28 : 0.34,
      map: sprite,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const mouse = new THREE.Vector2(99, 99) // offscreen until first move
    const onMove = (e) => {
      mouse.x = (e.clientX / innerWidth) * 2 - 1
      mouse.y = -(e.clientY / innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', onResize)

    let raf
    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const pos = geo.attributes.position.array
      // cursor position in world space at z=0 plane
      const mx = mouse.x * 8
      const my = mouse.y * 5
      for (let i = 0; i < COUNT; i++) {
        let x = pos[i * 3]
        let y = pos[i * 3 + 1]
        // slow upward drift with sideways sway
        y += speeds[i] * 0.008
        x += Math.sin(t * 0.5 + phases[i]) * 0.0035
        // mouse repulsion
        const dx = x - mx
        const dy = y - my
        const d2 = dx * dx + dy * dy
        if (d2 < 4) {
          const f = (4 - d2) * 0.012
          x += dx * f
          y += dy * f
        }
        if (y > spanY / 2 + 1) y = -spanY / 2 - 1
        if (x > spanX / 2 + 1) x = -spanX / 2 - 1
        if (x < -spanX / 2 - 1) x = spanX / 2 + 1
        pos[i * 3] = x
        pos[i * 3 + 1] = y
      }
      geo.attributes.position.needsUpdate = true
      points.rotation.y = Math.sin(t * 0.05) * 0.05
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      sprite.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    />
  )
}
