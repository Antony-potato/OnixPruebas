'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { navLinks } from '@/lib/data'

export default function Navbar() {
  const [isTop, setIsTop] = useState(true)
  const [isHidden, setIsHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0

    if (latest <= 60) {
      setIsTop(true)
      setIsHidden(false)
    } else {
      setIsTop(false)
      if (latest > previous && latest > 150) {
        setIsHidden(true)
        setMenuOpen(false)
      } else {
        setIsHidden(false)
      }
    }
  })

  const navVariants = {
    visible: { y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    hidden: { y: "-100%", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  }

  const textColor = isTop ? 'text-white' : 'text-black'
  const bgColor = isTop ? 'bg-transparent' : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
  const lineColor = isTop ? 'bg-white' : 'bg-black'

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="visible"
        animate={isHidden ? "hidden" : "visible"}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${bgColor}`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5 lg:py-6 grid grid-cols-2 lg:grid-cols-[1fr_max-content_1fr] items-center">

          {/* 1. IZQUIERDA: Menú y Logo */}
          <div className="flex items-center gap-6 lg:gap-8 justify-self-start">

            {/* Botón Hamburguesa */}
            <button
              className="w-10 h-10 flex flex-col justify-center gap-[6px] relative z-50 group cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className={`block h-[2px] w-[90%] origin-left transition-colors duration-500 ${menuOpen ? 'bg-white' : lineColor}`}
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? -2 : 0 }}
              />
              <motion.span
                className={`block h-[2px] w-[60%] transition-all duration-300 group-hover:w-[90%] ${menuOpen ? 'bg-white' : lineColor}`}
                animate={{ opacity: menuOpen ? 0 : 1 }}
              />
              <motion.span
                className={`block h-[2px] w-[90%] origin-left transition-colors duration-500 ${menuOpen ? 'bg-white' : lineColor}`}
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 2 : 0 }}
              />
            </button>

            {/* Logo - Más grande y Bold */}
            <Link href="/" className="relative -top-[2px]">
              <span
                className={`text-3xl sm:text-4xl tracking-wider font-bold transition-colors duration-500 ${menuOpen ? 'text-white' : textColor}`}
              >
                Workkit
              </span>
            </Link>
          </div>

          {/* 2. CENTRO: Navegación Principal (Tipografía limpia, sin uppercase, más grande) */}
          <nav className="hidden lg:flex justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[16px] lg:text-[18px] tracking-wide font-medium transition-colors duration-500 hover:opacity-50 ${textColor}`}
              >
                {/* Asumo que link.label viene Capitalizado (ej: 'Home', 'Works'). Si viene en mayúsculas desde tu data, cámbialo en tu archivo data.ts */}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 3. DERECHA: Contacto */}
          <div className="hidden lg:flex justify-self-end">
            <Link
              href="/contact"
              className={`text-[16px] lg:text-[18px] tracking-wide font-medium relative group pb-1 transition-colors duration-500 ${textColor}`}
            >
              Contact

              <span className={`absolute bottom-0 left-0 w-full h-[2px] transition-colors duration-500 ${isTop ? 'bg-white/30' : 'bg-black/10'}`} />
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 ease-out group-hover:w-full ${lineColor}`} />
            </Link>
          </div>

        </div>
      </motion.header>

      {/* Menú Móvil Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-10 px-8 mt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="text-white hover:text-white/70 text-5xl sm:text-7xl font-semibold tracking-tight transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-16"
              >
                <Link
                  href="/contact"
                  className="text-black bg-white hover:bg-white/80 transition-colors px-12 py-5 text-[16px] font-semibold rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  Start a project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}