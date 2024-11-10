"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown, LogIn } from "lucide-react";
import SearchBar from "./SearchBar";
import NotificationBadge from "../NotificationBadge.tsx";
import UserProfile from "./UserProfile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${scrolled}%`
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Learn",
      dropdown: [
        { to: "/courses", label: "Courses", icon: "📚" },
        { to: "/games", label: "Games", icon: "🎮" },
        { to: "/tutorials", label: "Tutorials", icon: "📝" },
        { to: "/workshops", label: "Workshops", icon: "👥" },
        { to: "/roadmap", label: "Learning Path", icon: "🗺️" },
      ],
    },
    {
      label: "Community",
      dropdown: [
        { to: "/forums", label: "Forums", icon: "💬" },
        { to: "/events", label: "Events", icon: "📅" },
        { to: "/mentorship", label: "Mentorship", icon: "🤝" },
        { to: "/projects", label: "Projects", icon: "🛠️" },
      ],
    },
    { to: "/resources", label: "Resources" },
    { to: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#ffffff98] backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-100"
          style={{ width: "var(--scroll-progress, 0%)" }}
        />
        <div className="max-w-7xl mx-auto px-[5%] py-3 flex justify-between items-center relative">
          <Link href="/" className="flex items-center">
            <motion.div
              className="relative p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src="https://yt3.googleusercontent.com/E8jiN7fQJMA4X1bsuNLlVyUFXUzIJ6Vdagcls4CsOzE-qxhJ5aQ2EDR2f6kYzOrD-_7Rs3di4w=s900-c-k-c0x00ffffff-no-rj"
                alt="FFT Logo"
                className="h-[45px] w-auto object-contain rounded-lg overflow-hidden filter drop-shadow-sm md:h-[35px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex gap-8 items-center lg:gap-4">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 font-medium hover:bg-gray-100 transition-all duration-300 lg:px-2"
                      whileHover={{ scale: 1.05 }}
                    >
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
                          className="absolute top-full left-0 bg-white rounded-lg shadow-lg min-w-[200px] py-2 z-50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.to}
                              href={dropdownItem.to}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <span className="mr-3 text-lg">
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
                    href={item.to}
                    className="px-4 py-2 rounded-lg text-gray-800 font-medium hover:bg-gray-100 transition-all duration-300 lg:px-2"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 z-[1001]">
            <SearchBar />
            <NotificationBadge />
            {isLoggedIn ? (
              <UserProfile
                user={{
                  name: "Abhay",
                  email: "abhayanandjha04@gmail.com",
                  role: "Student",
                  avatar:
                    "https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png",
                }}
              />
            ) : (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ffd700] to-[#ffa500] text-white font-medium hover:scale-105 transition-transform duration-200"
                onClick={() => setIsLoggedIn(true)}
              >
                <LogIn size={20} />
                <span>Login</span>
              </button>
            )}

            <motion.button
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsDarkMode(!isDarkMode)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed md:hidden top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white pt-20 px-8 overflow-y-auto shadow-xl"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
              >
                {navItems.map((item) => (
                  <div key={item.label} className="py-2">
                    {item.dropdown ? (
                      <>
                        <button className="flex items-center justify-between w-full px-4 py-2 text-gray-800 font-medium">
                          {item.label}
                          <ChevronDown size={16} />
                        </button>
                        <div className="pl-4">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.to}
                              href={dropdownItem.to}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <span className="mr-3 text-lg">
                                {dropdownItem.icon}
                              </span>
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.to}
                        className="px-4 py-2 rounded-lg text-gray-800 font-medium"
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
    </>
  );
}
