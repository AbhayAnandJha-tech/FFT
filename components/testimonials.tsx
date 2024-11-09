import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteLeft, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Tushika Rawat',
      role: 'Computer Science Student',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkp1qVElUT8F7ElbjtqgNBTYOyS0kLafiB1w&s',
      quote:
        'FFT helped me master complex engineering concepts through their interactive learning approach.',
      linkedin: 'https://www.linkedin.com/in/tushika-rawat/',
      instagram: 'https://www.instagram.com/tushika_rawat/',
      rating: 5,
    },
    // Add more testimonials as needed...
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentIndex])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="py-24 px-5 bg-gradient-to-br from-bg-secondary to-bg-primary overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl mb-4 text-black font-bold">
          Student Success Stories
        </h2>
        <p className="text-text-primary opacity-80 text-xl">
          Hear from our community of learners
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative overflow-hidden rounded-xl">
        <div className="bg-gradient-to-r from-[#ffd700] to-[#ffa500] h-1.5 w-full"></div>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white p-12 rounded-2xl shadow-lg relative overflow-hidden"
          >
            <div className="text-black text-3xl mb-6 opacity-30">
              <FaQuoteLeft />
            </div>
            <p className="text-text-primary text-xl mb-8 italic">
              {testimonials[currentIndex].quote}
            </p>
            <div className="flex items-center gap-6">
              <motion.img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full object-cover border-4 border-secondary"
              />
              <div className="flex-1">
                <h4 className="text-primary text-xl mb-2">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-text-primary opacity-80 text-sm mb-2">
                  {testimonials[currentIndex].role}
                </p>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-primary text-xl">
                      ★
                    </span>
                  ))}
                </div>

                <div className="flex flex-row">
                  <a
                    href={testimonials[currentIndex].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xl mr-2 hover:translate-y-[-2px] transition-all"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={testimonials[currentIndex].instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xl hover:translate-y-[-2px] transition-all"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-8 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-primary shadow-md transition-all"
          >
            ←
          </motion.button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2.5 h-2.5 rounded-full bg-text-primary opacity-50 cursor-pointer hover:opacity-80 ${
                  index === currentIndex ? 'bg-primary opacity-100' : ''
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-primary shadow-md transition-all"
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
