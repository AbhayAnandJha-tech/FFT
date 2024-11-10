// components/Resources/ResourceCard.js
import React from 'react'
import { motion } from 'framer-motion'
import { useSpring } from '@react-spring/three'
import styles from './Resources.module.css'

const ResourceCard = ({ resource, isSelected, onClick }) => {
  const springProps = useSpring({
    scale: isSelected ? 1.1 : 1,
    rotation: isSelected ? [0, Math.PI / 6, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 },
  })

  return (
    <motion.div
      className={`${styles.resourceCard} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>{resource.icon}</div>
        <h3 className="font-bold">{resource.title}</h3>
        <p>{resource.description}</p>
        {isSelected && (
          <motion.div
            className={styles.details}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul>
              {resource.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.button
              className={styles.accessButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access Now
            </motion.button>
          </motion.div>
        )}
      </div>
      <div className={styles.cardGlow} />
    </motion.div>
  )
}

export default ResourceCard
