import React from 'react'
import { Heart } from 'lucide-react'
import BackToTop from './back-to-top'
import LanguageSwitcher from './languageSwitcher'

const Footer = () => {
  const legal = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
  ]

  return (
    <footer className="text-black">
      <div className="max-w-screen-xl mx-auto px-8">
        {/* Footer Bottom Section */}
        <div className="py-6 text-center text-black">
          <div className="flex justify-center gap-6 mb-4">
            <LanguageSwitcher />
          </div>
          <div className="max-w-screen-xl mx-auto px-8">
            <div className="flex justify-center gap-4 mb-4">
              {legal.map((link, index) => (
                <React.Fragment key={link.path}>
                  <a href={link.path} className="text-black text-sm">
                    {link.label}
                  </a>
                  {index < legal.length - 1 && (
                    <span className="text-muted">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-black text-sm flex items-center justify-center gap-2">
              Made with <Heart size={14} className="text-primary" /> by FFT Team
              <span className="ml-2">
                © {new Date().getFullYear()} Fifteen For Teen. All rights
                reserved.
              </span>
            </p>
          </div>
        </div>
      </div>
      <BackToTop />
    </footer>
  )
}

export default Footer
