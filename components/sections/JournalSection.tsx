'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { journalPosts } from '@/lib/data'

export default function JournalSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#f0ede8',
        padding: '7rem 0',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-light)] mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Journal
            </p>
            <h2
              className="text-6xl md:text-7xl leading-none text-black"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
            >
              (Journal)
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="self-start md:self-end"
          >
            <Link
              href="/journal"
              className="inline-flex items-center text-[11px] tracking-[0.2em] uppercase border-b border-[var(--color-text)]/30 pb-1 hover:border-[var(--color-text)] transition-colors text-black"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              See All
            </Link>
          </motion.div>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journalPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <Link href={`/journal/${post.categorySlug}/${post.slug}`} className="group block h-full">
                {/* Image */}
                <div className="relative overflow-hidden mb-6 bg-gray-100 w-full" style={{ aspectRatio: '3/4' }}>
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                    <Image
                      src={post.image}
                      alt={post.alt || post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-[10px] tracking-wider text-[var(--color-text-light)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {post.date}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 bg-white text-[var(--color-text-light)]"
                    style={{ fontFamily: 'var(--font-jp)', fontWeight: 300 }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-sm leading-relaxed text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ fontFamily: 'var(--font-jp)', fontWeight: 400, lineHeight: 1.7 }}
                >
                  {post.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
