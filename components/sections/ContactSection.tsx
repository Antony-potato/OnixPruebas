'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '60vh' }}>
      {/* Background images - split layout */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=900&q=80"
            alt="Office contact"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=80"
            alt="Office space"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[var(--color-bg-dark)]/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full py-28 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.25em] uppercase text-white/50 mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-7xl text-white mb-6 leading-none"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
        >
          (Contact)
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-sm mb-10 leading-relaxed max-w-xs"
          style={{ fontFamily: 'var(--font-jp)', fontWeight: 300, lineHeight: 2 }}
        >
          お仕事や協業のご相談、採用のご応募は
          <br />
          こちらよりお願いいたします。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center border border-white/30 text-white px-12 py-5 hover:bg-white hover:text-black transition-colors duration-500 ease-out"
          >
            <span
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              お問い合わせ
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
