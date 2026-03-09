'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { works } from '@/lib/data'

import 'swiper/css'
import 'swiper/css/effect-fade'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const heroWrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end end"]
  })

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    mass: 0.5,
    bounce: 0,
    restDelta: 0.001
  })

  // Usamos SCALE de nuevo para el "Zoom Out" perfecto sin que la imagen se deforme o expanda
  const scale = useTransform(smoothScroll, [0, 0.9], [1, 0.8])
  const opacity = useTransform(smoothScroll, [0, 0.2], [1, 0])

  useEffect(() => {
    let animationFrameId: number
    const animateProgress = () => {
      if (swiperRef.current?.autoplay?.running) {
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

  useEffect(() => {
    return scrollYProgress.on("change", (latest: number) => {
      if (latest > 0.05) swiperRef.current?.autoplay.stop()
      else swiperRef.current?.autoplay.start()
    })
  }, [scrollYProgress])

  return (
    <div className="relative w-full bg-white">

      {/* 1. SECCIÓN HERO */}
      <div ref={heroWrapperRef} className="relative h-[200vh] w-full z-10">
        <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden">

          <motion.div
            style={{
              scale, // Volvemos al Scale
              width: '100%',
              height: '100%', // Pantalla completa real
              transformOrigin: "center center"
            }}
            className="flex items-center justify-center pointer-events-none"
          >
            <Link
              href={`/works/${works[activeIndex].slug}`}
              className="relative w-full h-full pointer-events-auto block"
            >
              <section className="relative w-full h-full bg-black overflow-hidden group border border-black/5">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    speed={1500}
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
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-1000" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>

                <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6 md:px-12">
                  <div className="max-w-[1440px] w-full grid grid-cols-12 items-center gap-10 text-white">
                    <div className="hidden md:flex gap-1 items-end col-span-2 text-xl font-light italic">
                      <span className="font-space-mono">{String(activeIndex + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="col-span-12 md:col-span-8 text-center">
                      <h1 className="text-7xl md:text-9xl italic font-light tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                        {works[activeIndex].company}
                      </h1>
                    </div>
                    <div className="hidden md:flex col-span-2 justify-end">
                      <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                        <motion.div className="absolute inset-0 bg-white origin-left" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 2. GALERÍA INFERIOR CON MATEMÁTICA EXACTA
          ¿Cómo funciona este marginTop?
          - La galería usa gap-32 (que son 8rem de espacio).
          - El contenedor del Hero deja 10svh de espacio vacío abajo al reducirse al 80% (0.8).
          - Hacemos "8rem - 10svh". Esto empuja la galería exactamente la distancia necesaria para que el espacio visual resultante sea exactamente de 8rem (gap-32).
      */}
      <div
        className="relative z-20 w-full flex flex-col items-center gap-32 pb-32 bg-white"
        style={{ marginTop: "calc(8rem - 10svh)" }}
      >
        {works.slice(1).map((work) => (
          <motion.div
            key={`gallery-${work.id}`}
            // Usamos w-[80vw] para que mida exactamente lo mismo que el Hero reducido a 0.8
            className="relative w-[80vw] md:w-[80vw] aspect-[16/9] overflow-hidden border border-black/5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/works/${work.slug}`} className="block w-full h-full group">
              <Image src={work.image} alt={work.company} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-4xl italic uppercase" style={{ fontFamily: 'var(--font-display)' }}>{work.company}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}