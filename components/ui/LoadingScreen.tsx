'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#1a1a18' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <span
              className="text-white text-3xl tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
            >
              workkit
            </span>
            <div className="w-16 h-px bg-white/20 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
