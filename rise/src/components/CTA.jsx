import { useState } from 'react'
import { motion } from 'framer-motion'
import Bolt from './Bolt.jsx'

const MARQUEE = ['ENERGIZE', 'PERFORM', 'RISE']

export default function CTA() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSent(true)
  }

  return (
    <section id="cta" className="relative pt-28 md:pt-40 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[900px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.92] text-white"
        >
          READY TO
          <br />
          <span className="text-[var(--accent)]">RISE?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-[var(--muted)] max-w-md mx-auto leading-relaxed"
        >
          Join the list. First drop gets a free 4-flavor sampler pack and launch-day pricing.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          onSubmit={submit}
          className="mt-10 mx-auto flex max-w-lg rounded-full border border-white/12 bg-white/[0.04] p-1.5 backdrop-blur"
        >
          {sent ? (
            <p className="w-full py-3.5 text-sm font-semibold text-[var(--accent)]">
              <Bolt className="inline-block h-[0.9em] w-auto" /> You&apos;re on the list. Stay unstoppable.
            </p>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="min-w-0 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-[var(--muted)]"
              />
              <button
                type="submit"
                data-hover
                className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase text-white hover:brightness-110 transition-all shrink-0"
              >
                Notify Me
              </button>
            </>
          )}
        </motion.form>
      </div>

      {/* marquee */}
      <div className="mt-24 border-y border-white/8 py-5 overflow-hidden" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {Array.from({ length: 4 }).flatMap((_, r) =>
                MARQUEE.map((w, i) => (
                  <span
                    key={`${half}-${r}-${i}`}
                    className="font-display text-2xl md:text-4xl text-white/90 px-6 flex items-center gap-12"
                  >
                    {w}
                    <span className="text-[var(--accent)] text-lg">●</span>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <footer className="px-5 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
        <span className="font-display tracking-[0.15em] text-white">
          RISE<span className="text-[var(--accent)]"><Bolt /></span>
        </span>
        <p className="text-xs text-[var(--muted)]">
          © 2026 RISE Energy Co. Rise above. Stay unstoppable.
        </p>
        <div className="flex gap-8 text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--muted)]">
          <a href="#" data-hover className="hover:text-white transition-colors">Instagram</a>
          <a href="#" data-hover className="hover:text-white transition-colors">TikTok</a>
          <a href="#" data-hover className="hover:text-white transition-colors">X</a>
        </div>
      </footer>
    </section>
  )
}
