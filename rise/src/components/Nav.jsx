import { useEffect, useState } from 'react'
import Bolt from './Bolt.jsx'

const LINKS = [
  { label: 'The Can', href: '#showcase' },
  { label: 'Inside', href: '#ingredients' },
  { label: 'Science', href: '#science' },
  { label: 'Flavors', href: '#flavors' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-12 py-4 md:py-5 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-[#07050a]/70 border-b border-white/5' : ''
      }`}
    >
      <a
        href="#top"
        onClick={(e) => go(e, '#hero')}
        className="font-display text-xl md:text-2xl tracking-[0.15em] text-white"
      >
        RISE<span className="text-[var(--accent)]"><Bolt /></span>
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[var(--muted)] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#cta"
        onClick={(e) => go(e, '#cta')}
        data-hover
        className="rounded-full border border-white/25 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 px-5 md:px-7 py-2 text-[12px] font-bold tracking-[0.2em] uppercase transition-all"
      >
        Get Rise
      </a>
    </nav>
  )
}
