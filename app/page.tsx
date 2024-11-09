'use client'

import { Suspense, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { FaRocket, FaPlay } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Statistics from '@/components/statistics'
import Courses from '@/components/courses'
import FeaturesTable from '@/components/features'
import Testimonials from '@/components/testimonials'
import SocialProof from '@/components/trustedby'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'
import Navbar from '@/components/Navbar/Navbar'

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true)

  const onSplineLoad = () => {
    setIsLoading(false)
  }

  return (
    <>
      <Navbar />
      <section id="hero" className="relative min-h-screen overflow-hidden">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 min-h-screen">
          <motion.div
            className="max-w-lg space-y-6 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-text-primary">
              Empowering Teens Through <br />
              <span className="bg-gradient-to-r from-[#ffd700] to-[#ffa500] bg-clip-text text-transparent">
                Engineering Education
              </span>
            </h1>
            <p className="text-lg text-text-secondary opacity-80">
              Join the community of young innovators shaping the future
            </p>
            <div className="flex gap-4 mt-4">
              <Button
                variant="solid"
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-[#ffd700] to-[#ffa500] text-white shadow-md hover:shadow-lg rounded-full"
              >
                <FaRocket />
                Start Learning
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 text-[#ffa500] border-2 border-[#ffa500]  rounded-full"
              >
                <FaPlay />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <div className="relative h-[75vh] lg:h-full flex justify-center items-center">
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center text-text-muted opacity-70"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="animate-spin h-10 w-10 border-4 border-t-[#ffa500] rounded-full mb-4"></div>
                  <p>Loading 3D Scene...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <Suspense fallback={null}>
              <Spline
                scene="https://prod.spline.design/5L3Uo2OsxqBNwt3u/scene.splinecode"
                width={1440}
                height={750}
                onLoad={onSplineLoad}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </Suspense>
          </div>
        </div>
      </section>

      <Statistics />
      <Courses />
      <FeaturesTable />
      <Testimonials />
      <SocialProof />
      <Newsletter />
      <Footer />
    </>
  )
}
