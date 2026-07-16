export default function Footer() {
  return (
    <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] bg-[var(--void)] px-4 py-10 sm:px-6 md:px-12">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.28em]">
        <span className="text-[var(--gold)]">◆</span> AURUM
        <span className="text-[11px] font-light tracking-[0.3em] text-[var(--muted)]">ESTATES</span>
      </div>
      <div className="flex gap-8 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
        <a href="#residences" className="transition-colors hover:text-[var(--gold)]">Residences</a>
        <a href="#collection" className="transition-colors hover:text-[var(--gold)]">Collection</a>
        <a href="#contact" className="transition-colors hover:text-[var(--gold)]">Contact</a>
      </div>
      <p className="text-[11px] tracking-wide text-[var(--muted)]">
        © 2026 Aurum Estates. By appointment only.
      </p>
    </footer>
  )
}
