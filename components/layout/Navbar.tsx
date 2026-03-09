'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(247, 245, 242, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span
              className={`text-xl tracking-[0.25em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-[var(--color-text)]' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              workkit
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                  scrolled ? 'text-[var(--color-text)]' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className={`text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white ${
                scrolled
                  ? 'border-[var(--color-text)] text-[var(--color-text)]'
                  : 'border-white text-white'
              }`}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className={`block h-px w-full origin-center transition-colors duration-300 ${
                menuOpen || !scrolled ? 'bg-white' : 'bg-[var(--color-text)]'
              }`}
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />
            <motion.span
              className={`block h-px w-full transition-colors duration-300 ${
                menuOpen || !scrolled ? 'bg-white' : 'bg-[var(--color-text)]'
              }`}
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className={`block h-px w-full origin-center transition-colors duration-300 ${
                menuOpen || !scrolled ? 'bg-white' : 'bg-[var(--color-text)]'
              }`}
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: '#1a1a18' }}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="text-white text-3xl tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="text-white border border-white px-8 py-3 text-[11px] tracking-[0.2em] uppercase"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
            </div>
            <div className="p-8 text-center text-white/40 text-xs tracking-widest">
              © 2025 HITOBA DESIGN
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
