import { useEffect, useState } from 'react'
import { Search, User, Menu, X } from 'lucide-react'

const links = [
  { label: 'Residences', href: '#residences' },
  { label: 'Collection', href: '#collection' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0908]/75 backdrop-blur-xl border-b border-[var(--border)] py-3 md:py-4' : ''
        }`}
      >
        <a
          href="#"
          className="animate-blur-fade-up flex h-8 md:h-10 items-center gap-2 text-lg md:text-xl font-semibold tracking-[0.28em]"
          style={{ animationDelay: '0ms' }}
        >
          <span className="text-[var(--gold)]">◆</span>
          AURUM
          <span className="hidden sm:inline text-[11px] font-light tracking-[0.3em] text-[var(--muted)] mt-1">
            ESTATES
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="animate-blur-fade-up text-sm text-[var(--cream)]/80 hover:text-[var(--gold)] transition-colors tracking-wide"
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="animate-blur-fade-up liquid-glass hidden sm:flex items-center gap-2 rounded-full px-4 md:px-6 py-2 text-sm"
            style={{ animationDelay: '350ms' }}
          >
            <Search size={18} />
            Search
          </button>
          <button
            className="animate-blur-fade-up liquid-glass hidden sm:flex h-10 w-10 items-center justify-center rounded-full"
            style={{ animationDelay: '400ms' }}
            aria-label="Private client login"
          >
            <User size={18} />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="animate-blur-fade-up liquid-glass relative flex lg:hidden h-10 w-10 items-center justify-center rounded-full"
            style={{ animationDelay: '350ms' }}
            aria-label="Menu"
          >
            <Menu
              size={18}
              className={`absolute transition-all duration-500 ease-out ${
                open ? 'rotate-180 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
              }`}
            />
            <X
              size={18}
              className={`absolute transition-all duration-500 ease-out ${
                open ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed left-0 right-0 top-[72px] z-40 lg:hidden border-t border-b border-[var(--border)] bg-[#0a0908]/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div className="flex flex-col px-4 py-4">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-3 text-[var(--cream)]/85 transition-all duration-500 hover:bg-white/5 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex gap-3 border-t border-[var(--border)] pt-4 sm:hidden">
            <button className="liquid-glass flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm">
              <Search size={16} />
              Search
            </button>
            <button className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full" aria-label="Private client login">
              <User size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
