const places = [
  'Amalfi Coast',
  'Lake Como',
  'Tel Aviv',
  'Santorini',
  'Gstaad',
  'Saint-Tropez',
  'Joshua Tree',
  'Paradise Island',
]

export default function Marquee() {
  const items = [...places, ...places]
  return (
    <div className="relative z-10 overflow-hidden border-t border-b border-[var(--border)] bg-[var(--deep)] py-8">
      <div className="marquee-track gap-16">
        {items.map((place, i) => (
          <span
            key={i}
            className="flex items-center gap-16 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-[var(--muted)]"
          >
            {place}
            <span className="text-[var(--gold)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
