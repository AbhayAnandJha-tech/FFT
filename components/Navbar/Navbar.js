"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ChevronDown, LogIn } from "lucide-react";
import SearchBar from "./SearchBar";
import NotificationBadge from "../NotificationBadge";
import UserProfile from "./UserProfile";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop;
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
        { to: "/roadmap", label: "Roadmap", icon: "🗺️" },
      ],
    },
    {
      label: "Community",
      dropdown: [
        { to: "/events", label: "Events", icon: "📅" },
        { to: "/mentorship", label: "Mentorship", icon: "🤝" },
      ],
    },
    { to: "/resources", label: "Resources" },
    { to: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.progressBar} />
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logoWrapper}>
          <motion.div
            className={styles.logoContainer}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="https://yt3.googleusercontent.com/E8jiN7fQJMA4X1bsuNLlVyUFXUzIJ6Vdagcls4CsOzE-qxhJ5aQ2EDR2f6kYzOrD-_7Rs3di4w=s900-c-k-c0x00ffffff-no-rj"
              alt="FFT Logo"
              className={styles.logoImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </motion.div>
        </Link>

        <div className={styles.desktopNav}>
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className={styles.navItem}
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown ? (
                <>
                  <motion.button
                    className={styles.dropdownTrigger}
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
                        className={styles.dropdown}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.to}
                            href={dropdownItem.to}
                            className={styles.dropdownItem}
                          >
                            <span className={styles.dropdownIcon}>
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
                <Link href={item.to} className={styles.navLink}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className={styles.controls}>
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
              className={styles.loginButton}
              onClick={() => setIsLoggedIn(true)}
            >
              <LogIn size={20} />
              <span>Login</span>
            </button>
          )}

          <motion.button
            className={styles.themeToggle}
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
