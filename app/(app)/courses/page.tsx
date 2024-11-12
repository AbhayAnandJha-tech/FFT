"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Beaker,
  Code,
  MessageCircle,
  Atom,
  Cog,
  Zap,
  Calculator,
  Scale,
  Leaf,
} from "lucide-react";
import styles from "@/components/Courses/Courses.module.css";

export default function Courses() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "popular", name: "Popular" },
    { id: "new", name: "New" },
    { id: "trending", name: "Trending" },
  ];

  const courseData = [
    {
      id: "applied-chemistry",
      name: "Applied Chemistry",
      icon: Beaker,
      description: "Explore chemical principles in engineering applications",
      category: ["popular", "new"],
      stats: {
        students: 1200,
        rating: 4.8,
        duration: "8 weeks",
      },
    },
    {
      id: "programming-in-c",
      name: "Programming in C",
      icon: Code,
      description: "Master the fundamentals of C programming for engineering",
      category: ["popular", "trending"],
      stats: {
        students: 1500,
        rating: 4.9,
        duration: "10 weeks",
      },
    },
    {
      id: "communication-skills",
      name: "Communication Skills",
      icon: MessageCircle,
      description: "Develop effective communication for professional success",
      category: ["new"],
      stats: {
        students: 800,
        rating: 4.7,
        duration: "6 weeks",
      },
    },
    {
      id: "applied-physics",
      name: "Applied Physics",
      icon: Atom,
      description: "Understand physical concepts crucial for engineering",
      category: ["popular"],
      stats: {
        students: 1100,
        rating: 4.8,
        duration: "9 weeks",
      },
    },
    {
      id: "manufacturing-processes",
      name: "Manufacturing Processes",
      icon: Cog,
      description: "Learn about various manufacturing techniques and processes",
      category: ["trending"],
      stats: {
        students: 950,
        rating: 4.6,
        duration: "8 weeks",
      },
    },
    {
      id: "electrical-science",
      name: "Electrical Science",
      icon: Zap,
      description:
        "Study electrical principles and their engineering applications",
      category: ["new", "trending"],
      stats: {
        students: 1050,
        rating: 4.7,
        duration: "9 weeks",
      },
    },
    {
      id: "applied-mathematics",
      name: "Applied Mathematics",
      icon: Calculator,
      description: "Master mathematical concepts essential for engineering",
      category: ["popular"],
      stats: {
        students: 1300,
        rating: 4.9,
        duration: "10 weeks",
      },
    },
    {
      id: "engineering-mechanics",
      name: "Engineering Mechanics",
      icon: Scale,
      description: "Analyze forces and motion in engineering systems",
      category: ["new"],
      stats: {
        students: 900,
        rating: 4.6,
        duration: "8 weeks",
      },
    },
    {
      id: "environmental-science",
      name: "Environmental Science",
      icon: Leaf,
      description:
        "Explore environmental issues and sustainable engineering practices",
      category: ["trending"],
      stats: {
        students: 750,
        rating: 4.5,
        duration: "7 weeks",
      },
    },
  ];

  const filteredCourses = courseData.filter(
    (course) =>
      selectedCategory === "all" || course.category.includes(selectedCategory)
  );

  return (
    <section id="courses" className={styles.courses}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.coursesHeader}
      >
        <h2 className="font-bold">Explore Our Courses</h2>
        <p>Discover the perfect course to advance your engineering journey</p>
      </motion.div>

      <motion.div className={styles.categoryTabs}>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`${styles.categoryTab} ${
              selectedCategory === category.id ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6" layout>
        <AnimatePresence>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                translateZ: 20,
              }}
              className={`${styles.courseCard} !shadow-lg`}
              onHoverStart={() => setHoveredCard(course.id)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                perspective: "1000px",
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    <course.icon className={styles.courseIcon} />
                  </div>
                  <h3 className="font-bold">{course.name}</h3>
                </div>

                <p>{course.description}</p>

                <div className={styles.courseStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {course.stats.students}
                    </span>
                    <span className={styles.statLabel}>Students</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {course.stats.rating}
                    </span>
                    <span className={styles.statLabel}>Rating</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statValue}>
                      {course.stats.duration}
                    </span>
                    <span className={styles.statLabel}>Duration</span>
                  </div>
                </div>

                <motion.div
                  className={styles.cardActions}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href={`/course/${course.id}`}>
                    <motion.button
                      className={styles.enrollButton}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                  <motion.button
                    className={`border border-[#ffd700] border-px flex-auto rounded-full`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Preview
                  </motion.button>
                </motion.div>
              </div>

              {hoveredCard === course.id && <div className={styles.cardGlow} />}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
