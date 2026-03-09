'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/sections/HeroSlider'
import WorksSection from '@/components/sections/WorksSection'
import AboutSection from '@/components/sections/AboutSection'
import JournalSection from '@/components/sections/JournalSection'
import ContactSection from '@/components/sections/ContactSection'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSlider />
        <WorksSection />
        <AboutSection />
        <JournalSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
