import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { Users, UserCheck, BookOpen, Award } from 'lucide-react'

const Statistics = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const stats = [
    {
      icon: Users,
      value: 5000,
      label: 'Active Students',
      suffix: '+',
    },
    {
      icon: UserCheck,
      value: 50,
      label: 'Expert Mentors',
      suffix: '+',
    },
    {
      icon: BookOpen,
      value: 100,
      label: 'Courses',
      suffix: '+',
    },
    {
      icon: Award,
      value: 95,
      label: 'Success Rate',
      suffix: '%',
    },
  ]

  return (
    <section className="py-24 px-32">
      <div className="py-16 bg-gradient-to-br from-[#ffd700]/10 via-[#ffed4a]/10 to-[#ffd700]/10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-screen-xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-90 rounded-2xl p-8 text-center shadow-md backdrop-blur-md border border-[#ffd700] transition-transform duration-300 hover:transform hover:translate-y-[-5px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mb-6 place-items-center">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#ffd700] to-[#ffa500] bg-clip-text">
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <div className="text-lg text-[#1a1a1a] opacity-80">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
