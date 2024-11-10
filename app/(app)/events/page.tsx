'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import Image from 'next/image'
import styles from '@/components/Events/Events.module.css'

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const events = [
    {
      id: 1,
      title: 'Engineering Innovation Summit',
      date: '2024-06-15',
      time: '10:00 AM',
      location: 'Virtual Event',
      category: 'Conference',
      description:
        'Join industry leaders and innovators for a day of inspiring talks and workshops.',
      speakers: [
        'Dr. Sarah Johnson - Microsoft',
        'Prof. Alex Chen - Stanford',
        'Eng. Mike Peters - Tesla',
      ],
      image:
        'https://fastly.picsum.photos/id/504/536/354.jpg?hmac=zZqkNcPlphLOPXp316SfRWkNFXoyGEh2elLvfSptGcQ',
    },
    {
      id: 2,
      title: 'Hackathon 2024',
      date: '2024-07-20',
      time: '9:00 AM',
      location: 'FFT Campus',
      category: 'Competition',
      description:
        '48-hour coding challenge to solve real-world engineering problems.',
      prizes: [
        '1st Prize: ₹1,00,000',
        '2nd Prize: ₹50,000',
        '3rd Prize: ₹25,000',
      ],
      image:
        'https://fastly.picsum.photos/id/162/536/354.jpg?hmac=O9LyWssbp2-8dlACsHdgF2OiKw5IrePVo8GUg6t7d5Y',
    },
    // Add more events as needed...
  ]

  return (
    <section className={styles.events} ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={styles.header}
      >
        <h2>Upcoming Events</h2>
        <p>Join our community events and enhance your learning journey</p>
      </motion.div>

      <div className={styles.timeline}>
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className={styles.timelineItem}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 }}
          >
            <div className={styles.timelineContent}>
              <motion.div
                className={`${styles.eventCard} ${
                  selectedEvent === event.id ? styles.selected : ''
                }`}
                onClick={() =>
                  setSelectedEvent(selectedEvent === event.id ? null : event.id)
                }
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.eventImage}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                  <div className={styles.category}>{event.category}</div>
                </div>

                <div className={styles.eventInfo}>
                  <h3>{event.title}</h3>

                  <div className={styles.eventMeta}>
                    <div>
                      <FaCalendar />
                      <span>{event.date}</span>
                    </div>
                    <div>
                      <FaClock />
                      <span>{event.time}</span>
                    </div>
                    <div>
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p>{event.description}</p>

                  <AnimatePresence>
                    {selectedEvent === event.id && (
                      <motion.div
                        className={styles.eventDetails}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {event.speakers && (
                          <div className={styles.speakers}>
                            <h4>Speakers</h4>
                            <ul>
                              {event.speakers.map((speaker, idx) => (
                                <li key={idx}>{speaker}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {event.prizes && (
                          <div className={styles.prizes}>
                            <h4>Prizes</h4>
                            <ul>
                              {event.prizes.map((prize, idx) => (
                                <li key={idx}>{prize}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <motion.button
                          className={styles.registerButton}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Register Now
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default EventsPage
