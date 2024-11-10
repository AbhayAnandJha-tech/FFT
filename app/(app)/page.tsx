"use client";

import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { FaRocket, FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Statistics from "@/components/statistics";
import Courses from "@/components/courses";
import FeaturesTable from "@/components/features";
import Testimonials from "@/components/testimonials";
import SocialProof from "@/components/trustedby";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar/Navbar";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  const onSplineLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen overflow-hidden bg-background font-['Roboto',sans-serif]"
      >
        <Navbar />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 min-h-screen">
          <motion.div
            className="max-w-lg space-y-7 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[clamp(2.75rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
              <span className="font-['Roboto', sans-serif]">
                Empowering Teens
              </span>
              <span className="block font-['Roboto', sans-serif]">Through</span>
              <span className="block bg-gradient-to-r from-[#ffd700] to-[#ffa500] bg-clip-text text-transparent font-['Roboto', sans-serif]">
                Engineering Education
              </span>
            </h1>

            <p className="text-[clamp(1.125rem,2vw,1.25rem)] leading-relaxed text-muted-foreground/90">
              Join the community of young innovators shaping the future
            </p>
            <div className="flex flex-wrap gap-5 pt-3">
              <Button
                size="lg"
                className="group h-14 px-7 flex items-center gap-2.5 bg-gradient-to-r from-[#ffd700] to-[#ffa500] text-white shadow-lg hover:shadow-xl rounded-full transition-all duration-300 hover:scale-105 text-base font-medium"
              >
                <FaRocket className="text-lg group-hover:rotate-12 transition-transform" />
                Start Learning
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group h-14 px-7 flex items-center gap-2.5 text-[#ffa500] border-2 border-[#ffa500] rounded-full hover:bg-[#fff8e5] transition-all duration-300 hover:scale-105 text-base font-medium"
              >
                <FaPlay className="text-lg group-hover:translate-x-1 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <div className="relative h-[75vh] lg:h-full flex justify-center items-center">
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground/70"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-10 h-10 border-4 border-t-[#ffa500] rounded-full animate-spin" />
                  <p className="text-sm font-medium">Loading 3D Scene...</p>
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
    </>
  );
}
