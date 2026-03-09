'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion, useInView } from 'framer-motion'
import { works } from '@/lib/data'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'

export default function WorksSection() {
  const swiperRef = useRef<SwiperType | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      // CORRECCIÓN CLAVE: 
      // Usamos -mt-[100vh] para que suba exactamente la altura de una pantalla.
      // Como el Hero mide 200vh y se queda sticky 100vh, esto empata perfecto.
      className="relative bg-red-500 z-50 -mt-[100vh]"

      // Añadimos padding-top para que el contenido de esta sección no quede 
      // "aplastado" contra el hero cuando termine la animación de escala.
      // 50vh es la mitad de la pantalla (el tamaño final de tu imagen encogida).
      style={{ paddingTop: 'calc(50vh + 8rem)', paddingBottom: '6rem' }}
    >
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-6 lg:pl-[8.5%] lg:pr-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-light)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Workkit
          </p>
          <h2
            className="text-6xl md:text-7xl leading-none"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
          >
            workkit
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-3 self-end"
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-12 h-12 border border-[var(--color-border)] rounded-full flex items-center justify-center hover:bg-[var(--color-text)] hover:border-[var(--color-text)] transition-colors group"
            aria-label="Previous"
          >
            <ArrowLeft size={18} className="text-[var(--color-text)] group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-12 h-12 border border-[var(--color-border)] rounded-full flex items-center justify-center hover:bg-[var(--color-text)] hover:border-[var(--color-text)] transition-colors group"
            aria-label="Next"
          >
            <ArrowRight size={18} className="text-[var(--color-text)] group-hover:text-white transition-colors" />
          </button>
        </motion.div>
      </div>

      {/* Large Image Slider */}
      <div className="relative mb-16 pl-6 lg:pl-[8.5%]">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1.1}
          spaceBetween={24}
          loop
          breakpoints={{
            640: { slidesPerView: 1.2, spaceBetween: 24 },
            1024: { slidesPerView: 1.5, spaceBetween: 32 },
            1440: { slidesPerView: 1.8, spaceBetween: 40 },
          }}
          onSwiper={(swiper: SwiperType) => { swiperRef.current = swiper }}
          className="works-main-swiper overflow-visible"
        >
          {works.map((work) => (
            <SwiperSlide key={work.id}>
              {({ isActive }: { isActive: boolean }) => (
                <Link href={`/works/${work.slug}`} className="block group">
                  <div className="relative overflow-hidden w-full aspect-[4/3] md:aspect-[16/10]">
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                    >
                      <Image
                        src={work.image}
                        alt={work.alt || work.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Overlay label */}
                    <div
                      className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10 transition-transform duration-500"
                    >
                      <p
                        className="text-xl md:text-2xl tracking-wide mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                      >
                        {work.company}
                      </p>
                      <div className="overflow-hidden">
                        <p
                          className="text-white/80 text-[10px] md:text-xs tracking-[0.2em] uppercase translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          View Project
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Works List */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mt-20">
        <div className="border-t border-[var(--color-border)]">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            >
              <Link
                href={`/works/${work.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-4 py-6 border-b border-[var(--color-border)] hover:bg-white/40 transition-colors -mx-6 px-6"
              >
                {/* Thumbnail */}
                <div className="img-zoom w-24 h-[4.5rem] flex-shrink-0 overflow-hidden bg-gray-100 hidden md:block">
                  <Image
                    src={work.thumbnail}
                    alt={work.alt || work.company}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Company Name */}
                <div className="flex-1 min-w-0 md:ml-4">
                  <p
                    className="text-base tracking-wide truncate group-hover:text-[var(--color-text-light)] transition-colors duration-500"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                  >
                    {work.company}
                  </p>
                </div>

                <div className="flex items-center gap-6 mt-3 md:mt-0 flex-1 md:flex-none justify-between md:justify-end w-full md:w-auto">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-[10px] tracking-wider text-[var(--color-text-light)]" style={{ fontFamily: 'var(--font-jp)', fontWeight: 300 }}>
                    {work.tags.slice(0, 2).map((tag, idx) => (
                      <span key={tag}>
                        {tag}{idx < Math.min(work.tags.length, 2) - 1 ? ' /' : ''}
                      </span>
                    ))}
                  </div>

                  {/* Area & Completion (Desktop only) */}
                  <div className="hidden lg:flex items-center gap-12 flex-shrink-0 text-[11px] tracking-widest text-black/60" style={{ fontFamily: 'var(--font-body)' }}>
                    <div className="w-16">
                      <p>{work.area}</p>
                    </div>
                    <div className="w-12">
                      <p>{work.completion}</p>
                    </div>
                  </div>

                  {/* Desktop Hover Arrow */}
                  <div className="hidden md:flex flex-shrink-0 ml-4 w-8 justify-end">
                    <span className="w-0 h-px bg-current group-hover:w-full transition-all duration-500 ease-out" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* See All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase border-b border-[var(--color-text)] pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            See All Works
            <span className="w-8 h-px bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}