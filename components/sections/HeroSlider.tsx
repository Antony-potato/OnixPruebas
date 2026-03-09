'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { works } from '@/lib/data'

import 'swiper/css'
import 'swiper/css/effect-fade'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // 1. CAPTURA DE SCROLL
  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end end"]
  })

  // 2. SUAVIZADO (La clave de la suavidad)
  // Creamos un scroll "físico" que tiene inercia. 
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100, // Rigidez del resorte
    damping: 30,    // Amortiguación (evita rebote excesivo)
    restDelta: 0.001
  })

  // 3. TRANSFORMACIONES VINCULADAS AL SCROLL SUAVE
  const scale = useTransform(smoothScroll, [0, 0.9], [1, 0.75])
  const opacity = useTransform(smoothScroll, [0, 0.2], [1, 0])

  // Lógica de la Barra de Progreso del Swiper
  useEffect(() => {
    let animationFrameId: number
    const animateProgress = () => {
      if (swiperRef.current && swiperRef.current.autoplay && swiperRef.current.autoplay.running) {
        const timeLeft = swiperRef.current.autoplay.timeLeft
        const delay = 4000
        const currentProgress = ((delay - timeLeft) / delay) * 100
        setProgress(Math.max(0, Math.min(100, currentProgress)))
      }
      animationFrameId = requestAnimationFrame(animateProgress)
    }
    animationFrameId = requestAnimationFrame(animateProgress)
    return () => cancelAnimationFrame(animationFrameId)
  }, [activeIndex])

  // Pausar swiper al bajar
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > 0.05) swiperRef.current?.autoplay.stop()
      else swiperRef.current?.autoplay.start()
    })
  }, [scrollYProgress])

  const firstWork = works[0]
  const remainingWorks = works.slice(1)

  return (
    <div className="relative w-full bg-[var(--color-bg)]">

      {/* SECCIÓN HERO (500vh para máximo control) */}
      <div ref={heroWrapperRef} className="relative h-[500vh] w-full">

        <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden z-20">
          <motion.section
            style={{ scale, transformOrigin: "center center" }}
            className="relative w-full h-[100svh] bg-[var(--color-bg-dark)] shadow-2xl overflow-hidden"
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              speed={1200}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              onSwiper={(s: SwiperType) => (swiperRef.current = s)}
              onSlideChange={(s: SwiperType) => {
                setActiveIndex(s.realIndex)
                setProgress(0)
              }}
              className="w-full h-full"
            >
              {works.map((work) => (
                <SwiperSlide key={`hero-${work.id}`}>
                  <div className="relative w-full h-full">
                    <Image src={work.image} alt={work.company} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* UI QUE SE DESVANECE (Título + Barra + Contador) */}
            <motion.div
              style={{ opacity }}
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6 md:px-12"
            >
              <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-12 items-center gap-10 text-white">

                {/* Contador */}
                <div className="hidden md:flex gap-1 items-end col-span-2 text-xl font-light italic">
                  <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-40">{String(works.length).padStart(2, '0')}</span>
                </div>

                {/* Título Central */}
                <div className="col-span-12 md:col-span-8 text-center">
                  <h1 className="text-6xl md:text-9xl italic font-light leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    {works[activeIndex].company}
                  </h1>
                </div>

                {/* Barra de Progreso Derecha (Vertical o Horizontal según prefieras) */}
                <div className="hidden md:flex col-span-2 justify-end">
                  <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white origin-left"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* GALERÍA INFERIOR */}
      <div
        className="relative z-10 w-full flex flex-col items-center gap-24 pb-40"
        style={{ marginTop: 'calc(6rem - 12.5vh)' }} // Mismo cálculo de precisión para el gap
      >
        {remainingWorks.map((work) => (
          <motion.div
            key={`gallery-${work.id}`}
            className="relative w-[90%] md:w-[75%] aspect-[16/9] overflow-hidden shadow-lg bg-gray-200"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Transición de entrada muy suave
          >
            <Link href={`/works/${work.slug}`} className="block w-full h-full group">
              <Image
                src={work.image}
                alt={work.company}
                fill
                className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-700" />
              <div className="absolute bottom-10 left-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <p className="text-4xl italic" style={{ fontFamily: 'var(--font-display)' }}>{work.company}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}