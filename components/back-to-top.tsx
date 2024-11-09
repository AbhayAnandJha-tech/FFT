import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-black/10 text-black shadow-lg flex items-center justify-center z-100 cursor-pointer"
        >
          <ChevronUp size={24} />
          <span className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-dark text-black text-sm px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out whitespace-nowrap">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
