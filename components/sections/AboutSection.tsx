'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ paddingTop: '10rem', paddingBottom: '8rem' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 lg:col-start-2 relative"
          >
            <div className="img-zoom relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85"
                alt="Office design by HITOBA DESIGN"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-4 lg:col-start-8 xl:col-start-9 flex flex-col justify-center mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl tracking-wide text-black mb-8 lg:mb-12"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              (About)
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[13px] md:text-sm leading-8 text-[var(--color-text)] mb-10 max-w-[280px] lg:max-w-none text-justify tracking-wide"
              style={{ fontFamily: 'var(--font-jp)', fontWeight: 300 }}
            >
              workkitとは、空間デザインを手がける「株式会社ヒトバデザイン」による、
              働く人と場をクライアントとともに豊かにしていく壮大なプロジェクトです。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center"
              >
                <span
                  className="text-[11px] tracking-[0.2em] uppercase border-b border-[var(--color-text)]/30 pb-1 group-hover:border-[var(--color-text)] transition-colors"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  About Project
                </span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
