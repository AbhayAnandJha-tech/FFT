import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ChevronDown, LogIn } from 'lucide-react'
import SearchBar from './SearchBar'
import NotificationBadge from './NotificationBadge'
import UserProfile from './UserProfile'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Updated: Set to false by default

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      document.documentElement.style.setProperty(
        '--scroll-progress',
        `${scrolled}%`
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      label: 'Learn',
      dropdown: [
        { to: '/courses', label: 'Courses', icon: '📚' },
        { to: '/games', label: 'Games', icon: '🎮' },
        { to: '/tutorials', label: 'Tutorials', icon: '📝' },
        { to: '/workshops', label: 'Workshops', icon: '👥' },
        { to: '/roadmap', label: 'Learning Path', icon: '🗺️' },
      ],
    },
    {
      label: 'Community',
      dropdown: [
        { to: '/forums', label: 'Forums', icon: '💬' },
        { to: '/events', label: 'Events', icon: '📅' },
        { to: '/mentorship', label: 'Mentorship', icon: '🤝' },
        { to: '/projects', label: 'Projects', icon: '🛠️' },
      ],
    },
    { to: '/resources', label: 'Resources' },
    { to: '/pricing', label: 'Pricing' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 ${
          isScrolled
            ? 'bg-white bg-opacity-90 backdrop-blur-lg'
            : 'bg-transparent'
        } transition-all duration-300 ease`}
      >
        <div className="absolute bottom-0 left-0 h-0.5 bg-primary w-[var(--scroll-progress)] transition-width duration-100"></div>
        <div className="max-w-screen-xl mx-auto px-5 py-3 flex justify-between items-center relative">
          <Link to="/" className="text-decoration-none flex items-center">
            <motion.div className="relative p-2">
              <motion.img
                src="https://yt3.googleusercontent.com/E8jiN7fQJMA4X1bsuNLlVyUFXUzIJ6Vdagcls4CsOzE-qxhJ5aQ2EDR2f6kYzOrD-_7Rs3di4w=s900-c-k-c0x00ffffff-no-rj"
                alt="FFT Logo"
                className="h-11 object-contain filter drop-shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <motion.button className="text-primary font-medium py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300">
                      {item.label}
                      <motion.span
                        animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </motion.button>
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          className="absolute top-full left-0 bg-white rounded-lg shadow-lg min-w-[200px] mt-2 py-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.to}
                              to={dropdownItem.to}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                            >
                              <span className="mr-3 text-xl">
                                {dropdownItem.icon}
                              </span>
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className="text-primary font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 z-20">
            <SearchBar />
            <NotificationBadge />
            {isLoggedIn ? (
              <UserProfile
                user={{
                  name: 'Abhay',
                  email: 'abhayanandjha04@gmail.com',
                  role: 'Student',
                  avatar:
                    'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png',
                }}
              />
            ) : (
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-light font-medium hover:scale-105 transition-all duration-300"
                onClick={() => setIsLoggedIn(true)}
              >
                <LogIn size={20} />
                <span>Login</span>
              </motion.button>
            )}

            <motion.button
              className="bg-transparent border-none text-primary p-2 hover:scale-110 transition-all duration-300"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              className="bg-transparent border-none text-primary p-2 hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] bg-bg-primary px-8 py-8 shadow-lg overflow-y-auto"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 20 }}
              >
                {navItems.map((item) => (
                  <div key={item.label} className="py-4">
                    {item.dropdown ? (
                      <>
                        <button className="w-full flex justify-between items-center py-2 px-4 text-lg text-primary">
                          {item.label}
                          <ChevronDown size={16} />
                        </button>
                        <div className="pl-4">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.to}
                              to={dropdownItem.to}
                              className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-100"
                            >
                              <span className="mr-3 text-xl">
                                {dropdownItem.icon}
                              </span>
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.to}
                        className="text-lg text-primary py-3 px-4 block hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  )
}
