import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'

const FeaturesTable = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const features = {
    learning: [
      {
        name: 'Course Access',
        basic: 'Basic Courses Only',
        pro: 'Full Library',
        premium: 'Full Library + Premium',
        info: 'Access to our course library varies by plan level',
      },
      {
        name: 'Course Downloads',
        basic: 'Limited',
        pro: 'Unlimited',
        premium: 'Unlimited',
        info: 'Download courses for offline viewing',
      },
      {
        name: 'Learning Path',
        basic: 'Standard',
        pro: 'Personalized',
        premium: 'AI-Powered Custom',
        info: 'Customized learning journey based on your goals',
      },
    ],
    support: [
      {
        name: 'Mentor Support',
        basic: false,
        pro: 'Group Sessions',
        premium: '1-on-1 Sessions',
        info: 'Get guidance from industry experts',
      },
      {
        name: 'Response Time',
        basic: '48 hours',
        pro: '24 hours',
        premium: 'Priority (4 hours)',
        info: 'Average response time for support queries',
      },
    ],
    projects: [
      {
        name: 'Project Templates',
        basic: 'Basic',
        pro: 'Advanced',
        premium: 'Industry Level',
        info: 'Ready-to-use project templates',
      },
      {
        name: 'Code Reviews',
        basic: false,
        pro: '2/month',
        premium: 'Unlimited',
        info: 'Get your code reviewed by experts',
      },
    ],
    career: [
      {
        name: 'Career Guidance',
        basic: false,
        pro: 'Basic',
        premium: 'Advanced',
        info: 'Career planning and guidance sessions',
      },
      {
        name: 'Job Placement',
        basic: false,
        pro: false,
        premium: true,
        info: 'Job placement assistance and support',
      },
    ],
  }

  const renderValue = (value) => {
    if (value === true) return <FaCheck className="text-green-500" />
    if (value === false) return <FaTimes className="text-red-500" />
    return value
  }

  return (
    <section className="py-24 px-5">
      <motion.div
        className="max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-black mb-4">
            Features Comparison
          </h2>
          <p className="text-gray-600 text-lg opacity-80">
            Detailed comparison of all features across plans
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {['basic', 'pro', 'premium'].map((plan) => (
            <motion.button
              key={plan}
              className={`py-2 px-8 rounded-full text-lg font-medium border-2 ${
                selectedPlan === plan
                  ? 'bg-gradient-to-br from-[#ffd700] to-[#ffa500] text-white shadow-md'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
              onClick={() => setSelectedPlan(plan)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-12 shadow-lg">
          {Object.entries(features).map(([category, categoryFeatures]) => (
            <div key={category} className="mb-12">
              <h3 className="text-black text-2xl font-semibold border-b-2 border-gray-300 pb-3 mb-6">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>

              {categoryFeatures.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  className="flex justify-between items-center py-4 border-b border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredFeature(feature.name)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="flex items-center gap-2 text-gray-800 font-medium">
                    {feature.name}
                    <motion.div
                      className="text-gray-600 opacity-60 cursor-pointer relative"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaInfoCircle />
                      <AnimatePresence>
                        {hoveredFeature === feature.name && (
                          <motion.div
                            className="absolute left-full top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-4 rounded-lg text-sm shadow-md w-48"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            {feature.info}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-800">
                    {renderValue(feature[selectedPlan])}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default FeaturesTable
