import Link from 'next/link'
import { navLinks } from '@/lib/data'

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#1a1a18', color: 'rgba(255,255,255,0.6)' }}
      className="py-16"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-12">
          {/* Logo + tagline */}
          <div>
            <Link href="/" className="block mb-3">
              <span
                className="text-2xl text-white tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
              >
                workkit
              </span>
            </Link>
            <p
              className="text-xs tracking-widest text-white/30 uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              by HITOBA DESIGN
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-[11px] tracking-[0.15em] uppercase text-[var(--color-accent)] hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Contact
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/p/WORK-KIT-100063706086661/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Facebook
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://www.instagram.com/workkit_hitobadesign/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Address */}
          <div>
            <a
              href="https://maps.app.goo.gl/uiDZBotRYUxPACty6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              205 Quest Court Harajuku 3-59-4 Sendagaya, Shibuya-ku, Tokyo
            </a>
          </div>

          {/* Links + copyright */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://store-palette.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest text-white/30 hover:text-white/60 transition-colors uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Store Palette
            </a>
            <Link
              href="/privacypolicy"
              className="text-[10px] tracking-widest text-white/30 hover:text-white/60 transition-colors uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Privacy Policy
            </Link>
            <span
              className="text-[10px] text-white/20"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              © 2025 HITOBA DESIGN
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
