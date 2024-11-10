'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBook, FaVideo, FaCode, FaBrain, FaRocket } from 'react-icons/fa'
import ResourceCard from '@/components/Resources/ResourceCard'
import styles from '@/components/Resources/Resources.module.css'
import Navbar from '@/components/Navbar/Navbar'

export default function Resources() {
  const [selectedResource, setSelectedResource] = useState(null)

  const resources = [
    {
      id: 1,
      title: 'Interactive Study Guides',
      description: 'Comprehensive guides with real-world examples',
      icon: <FaBook />,
      features: [
        'Step-by-step explanations',
        'Practice problems',
        'Visual demonstrations',
        'Progress tracking',
      ],
    },
    {
      id: 2,
      title: 'Video Tutorials',
      description: 'Expert-led video lessons on complex topics',
      icon: <FaVideo />,
      features: [
        'HD quality content',
        'Downloadable resources',
        'Closed captions',
        'Mobile-friendly',
      ],
    },
    {
      id: 3,
      title: 'Coding Playground',
      description: 'Interactive coding environment for practice',
      icon: <FaCode />,
      features: [
        'Multiple programming languages',
        'Real-time compilation',
        'Code sharing',
        'Debugging tools',
      ],
    },
    {
      id: 4,
      title: 'AI Learning Assistant',
      description: 'Personalized learning powered by AI',
      icon: <FaBrain />,
      features: [
        '24/7 doubt solving',
        'Adaptive learning path',
        'Performance analytics',
        'Custom recommendations',
      ],
    },
    {
      id: 5,
      title: 'Project Hub',
      description: 'Real-world engineering projects',
      icon: <FaRocket />,
      features: [
        'Industry partnerships',
        'Mentor guidance',
        'Project certification',
        'Portfolio building',
      ],
    },
  ]

  return (
    <>
      <section id="resources" className={styles.resources}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className="font-bold">Learning Resources</h2>
          <p>Everything you need to succeed in your engineering journey</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isSelected={selectedResource === resource.id}
                onClick={() =>
                  setSelectedResource(
                    selectedResource === resource.id ? null : resource.id
                  )
                }
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className={styles.resourceStats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.stat}>
            <span>1000+</span>
            <p>Study Materials</p>
          </div>
          <div className={styles.stat}>
            <span>500+</span>
            <p>Video Lessons</p>
          </div>
          <div className={styles.stat}>
            <span>200+</span>
            <p>Practice Projects</p>
          </div>
        </motion.div>
      </section>
    </>
  )
}
