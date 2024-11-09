import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
} from 'lucide-react'
import Link from 'next/link'

const Courses = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'popular', name: 'Popular' },
    { id: 'new', name: 'New' },
    { id: 'trending', name: 'Trending' },
  ]

  const courseData = [
    {
      id: 'applied-chemistry',
      name: 'Applied Chemistry',
      icon: Beaker,
      description: 'Explore chemical principles in engineering applications',
      category: ['popular', 'new'],
      stats: {
        students: 1200,
        rating: 4.8,
        duration: '8 weeks',
      },
    },
    {
      id: 'programming-in-c',
      name: 'Programming in C',
      icon: Code,
      description: 'Master the fundamentals of C programming for engineering',
      category: ['popular', 'trending'],
      stats: {
        students: 1500,
        rating: 4.9,
        duration: '10 weeks',
      },
    },
    {
      id: 'communication-skills',
      name: 'Communication Skills',
      icon: MessageCircle,
      description: 'Develop effective communication for professional success',
      category: ['new'],
      stats: {
        students: 800,
        rating: 4.7,
        duration: '6 weeks',
      },
    },
    {
      id: 'applied-physics',
      name: 'Applied Physics',
      icon: Atom,
      description: 'Understand physical concepts crucial for engineering',
      category: ['popular'],
      stats: {
        students: 1100,
        rating: 4.8,
        duration: '9 weeks',
      },
    },
    {
      id: 'manufacturing-processes',
      name: 'Manufacturing Processes',
      icon: Cog,
      description: 'Learn about various manufacturing techniques and processes',
      category: ['trending'],
      stats: {
        students: 950,
        rating: 4.6,
        duration: '8 weeks',
      },
    },
    {
      id: 'electrical-science',
      name: 'Electrical Science',
      icon: Zap,
      description:
        'Study electrical principles and their engineering applications',
      category: ['new', 'trending'],
      stats: {
        students: 1050,
        rating: 4.7,
        duration: '9 weeks',
      },
    },
    {
      id: 'applied-mathematics',
      name: 'Applied Mathematics',
      icon: Calculator,
      description: 'Master mathematical concepts essential for engineering',
      category: ['popular'],
      stats: {
        students: 1300,
        rating: 4.9,
        duration: '10 weeks',
      },
    },
    {
      id: 'engineering-mechanics',
      name: 'Engineering Mechanics',
      icon: Scale,
      description: 'Analyze forces and motion in engineering systems',
      category: ['new'],
      stats: {
        students: 900,
        rating: 4.6,
        duration: '8 weeks',
      },
    },
    {
      id: 'environmental-science',
      name: 'Environmental Science',
      icon: Leaf,
      description:
        'Explore environmental issues and sustainable engineering practices',
      category: ['trending'],
      stats: {
        students: 750,
        rating: 4.5,
        duration: '7 weeks',
      },
    },
  ]

  const filteredCourses = courseData.filter(
    (course) =>
      selectedCategory === 'all' || course.category.includes(selectedCategory)
  )

  return (
    <section
      id="courses"
      className="py-24 px-32 bg-gradient-to-b from-background-color to-white/80"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl text-black font-bold mb-4">
          Explore Our Courses
        </h2>
        <p className="text-text-color opacity-80 text-xl">
          Discover the perfect course to advance your engineering journey
        </p>
      </motion.div>

      <motion.div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-6 py-3 rounded-full bg-transparent text-text-color font-medium transition-all duration-300 ease-in-out ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-[#ffd700] to-[#ffa500] text-primary-color shadow-md'
                : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
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
              className="relative bg-white/90 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out shadow-sm"
              onHoverStart={() => setHoveredCard(course.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#ffd700] to-[#ffa500] rounded-xl transition-all duration-300 ease-in-out">
                    <course.icon className="text-primary-color text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold">{course.name}</h3>
                </div>

                <p className="text-text-color">{course.description}</p>

                <div className="flex justify-between my-6 p-4 bg-white/50 rounded-xl backdrop-blur-lg">
                  <div className="text-center">
                    <span className="block text-primary-color font-semibold text-lg">
                      {course.stats.students}
                    </span>
                    <span className="text-text-color opacity-80 text-sm">
                      Students
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-primary-color font-semibold text-lg">
                      {course.stats.rating}
                    </span>
                    <span className="text-text-color opacity-80 text-sm">
                      Rating
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-primary-color font-semibold text-lg">
                      {course.stats.duration}
                    </span>
                    <span className="text-text-color opacity-80 text-sm">
                      Duration
                    </span>
                  </div>
                </div>

                <motion.div
                  className="flex gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link href={`/course/${course.id}`}>
                    <motion.button
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffa500] text-primary-color flex-2 font-medium transition-all duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                  <motion.button
                    className="px-6 py-3 rounded-full bg-transparent border-2 border-primary-color text-primary-color flex-1 font-medium transition-all duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Preview
                  </motion.button>
                </motion.div>
              </div>

              {hoveredCard === course.id && (
                <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 to-transparent pointer-events-none z-0" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default Courses
