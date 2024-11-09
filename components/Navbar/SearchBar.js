import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Book, Video, File, Users, Clock } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches] = useState([
    "Circuit Design",
    "Python Basics",
    "Machine Learning",
  ]);

  const searchRef = useRef(null);

  const searchCategories = [
    { icon: <Book size={18} />, label: "Courses" },
    { icon: <Video size={18} />, label: "Tutorials" },
    { icon: <File size={18} />, label: "Resources" },
    { icon: <Users size={18} />, label: "Community" },
  ];

  const quickLinks = [
    { icon: <Clock size={18} />, label: "Recent Courses" },
    { icon: <Book size={18} />, label: "Popular Tutorials" },
    { icon: <Users size={18} />, label: "Active Forums" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <motion.button
        className={styles.searchToggle}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search size={20} />
        <span className={styles.searchLabel}>Search...</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.searchBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className={styles.searchModal}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className={styles.searchHeader}>
                <Search size={20} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search courses, tutorials, resources..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  data-search
                />
                <motion.button
                  className={styles.closeButton}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className={styles.searchContent}>
                {!query && (
                  <>
                    <div className={styles.searchSection}>
                      <h3>Search Categories</h3>
                      <div className={styles.categoryGrid}>
                        {searchCategories.map((category) => (
                          <motion.button
                            key={category.label}
                            className={styles.categoryButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {category.icon}
                            <span>{category.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.searchSection}>
                      <h3>Quick Links</h3>
                      <div className={styles.quickLinks}>
                        {quickLinks.map((link) => (
                          <motion.a
                            key={link.label}
                            href="#"
                            className={styles.quickLink}
                            whileHover={{ x: 5 }}
                          >
                            {link.icon}
                            <span>{link.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {recentSearches.length > 0 && (
                      <div className={styles.searchSection}>
                        <h3>Recent Searches</h3>
                        <div className={styles.recentSearches}>
                          {recentSearches.map((search) => (
                            <motion.button
                              key={search}
                              className={styles.recentSearch}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Clock size={14} />
                              <span>{search}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {query && (
                  <div className={styles.searchResults}>
                    {/* Add your search results here */}
                    <div className={styles.noResults}>
                      <p>No results found for "{query}"</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
