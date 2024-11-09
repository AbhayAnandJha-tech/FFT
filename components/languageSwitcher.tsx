import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('en')

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ]

  const handleLanguageChange = (langCode) => {
    setSelectedLang(langCode)
    setIsOpen(false)
    // Add your language change logic here
  }

  return (
    <div className="relative z-50">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 bg-secondary border border-light rounded-lg text-primary cursor-pointer text-sm transition-all duration-300 ease-in-out hover:bg-hover"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={16} />
        <span>
          {languages.find((lang) => lang.code === selectedLang)?.label}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 z-48"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute bottom-[calc(100%+0.5rem)] left-0 min-w-[200px] bg-primary border border-light rounded-lg shadow-lg z-49 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left border-none text-black bg-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-secondary ${
                    selectedLang === lang.code ? 'bg-secondary font-medium' : ''
                  }`}
                  onClick={() => handleLanguageChange(lang.code)}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  {selectedLang === lang.code && (
                    <Check size={16} className="text-primary" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
