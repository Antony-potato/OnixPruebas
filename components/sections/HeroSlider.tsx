'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { works } from '@/lib/data'

import 'swiper/css'
import 'swiper/css/effect-fade'

export default function HeroAndWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)

  // 1. Control de scroll (500vh para que sea un scroll muy largo y pausado)
  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end end"]
  })

  // 2. Transformaciones
  // Reducción a 3/4 (0.75). El 0.9 hace que la animación dure casi todo el scroll del contenedor.
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.75])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Pausar swiper al bajar
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) swiperRef.current?.autoplay.stop()
      else swiperRef.current?.autoplay.start()
    })
  }, [scrollYProgress])

  // SEPARACIÓN DE DATOS (El primero para el Hero, el resto para la lista)
  const firstWork = works[0];
  const remainingWorks = works.slice(1);

  return (
    <div className="relative w-full bg-[var(--color-bg)]">

      {/* SECCIÓN HERO (CONTENEDOR DE SCROLL LARGO) */}
      <div ref={heroWrapperRef} className="relative h-[500vh] w-full">

        {/* Contenedor Sticky: Mantiene la imagen centrada */}
        <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden z-20">
          <motion.section
            style={{
              scale,
              transformOrigin: "center center" // Reducción hacia el medio
            }}
            className="relative w-full h-[100svh] bg-[var(--color-bg-dark)] shadow-2xl overflow-hidden"
          >
            <div className="relative w-full h-full">
              <Image
                src={firstWork.image}
                alt={firstWork.company}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="max-w-[1440px] w-full px-12 text-center text-white">
                <h1 className="text-6xl md:text-8xl italic font-light" style={{ fontFamily: 'var(--font-display)' }}>
                  {firstWork.company}
                </h1>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* GALERÍA INFERIOR 
          CÁLCULO DE MARGEN:
          La imagen superior reducida a 0.75 deja 12.5vh de espacio muerto abajo (100 - 75 / 2).
          Para que el gap sea exactamente 6rem (gap-24), restamos ese espacio muerto.
      */}
      <div
        className="relative z-10 w-full flex flex-col items-center gap-24 pb-40"
        style={{ marginTop: 'calc(6rem - 12.5vh)' }}
      >
        {remainingWorks.map((work) => (
          <motion.div
            key={`gallery-${work.id}`}
            // w-[75%] para que sea idéntico al tamaño del Hero reducido (3/4)
            className="relative w-[90%] md:w-[75%] aspect-[16/9] overflow-hidden shadow-lg bg-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href={`/works/${work.slug}`} className="block w-full h-full group">
              <Image
                src={work.image}
                alt={work.company}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-3xl italic" style={{ fontFamily: 'var(--font-display)' }}>{work.company}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}