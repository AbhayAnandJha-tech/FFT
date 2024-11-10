import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, Check, X } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !/^\S+@\S+$/i.test(email)) {
      setStatus('invalid')
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus(null), 3000)
    } catch (error) {
      setStatus('error')
    }
    setIsSubmitting(false)
  }

  return (
    <section className="py-24 px-5 text-black">
      <motion.div
        className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-12 items-center">
          <motion.div
            className="w-24 flex-shrink-0"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Mail className="w-16 h-16" />
          </motion.div>

          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl mb-4 bg-gradient-to-br from-[#ffd700] to-[#ffa500] font-bold text-transparent bg-clip-text">
              Stay Updated with FFT
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-7">
              Get the latest updates on courses, events, and engineering
              insights delivered straight to your inbox.
            </p>
            <ul className="list-none">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 mb-4 text-lg opacity-90"
              >
                ✨ Weekly engineering challenges
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 mb-4 text-lg opacity-90"
              >
                🎯 Exclusive learning resources
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 mb-4 text-lg opacity-90"
              >
                🎁 Special offers and updates
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.form
          className="bg-white bg-opacity-10 p-12 rounded-2xl backdrop-blur-xl border border-white border-opacity-10"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex gap-4 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`flex-1 py-4 px-6 text-base rounded-xl border-2 transition-all ease-in-out ${
                status === 'invalid'
                  ? 'border-red-500'
                  : 'border-[#ffd700] focus:border-[#ffd700]'
              } bg-white bg-opacity-90 focus:outline-none focus:border-secondary focus:bg-white`}
            />
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-gradient-to-br from-[#ffd700] to-[#ffa500] rounded-xl flex items-center justify-center text-primary cursor-pointer"
            >
              {isSubmitting ? (
                <motion.div
                  className="w-5 h-5 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <Send />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {status && (
              <motion.div
                className={`p-4 rounded-xl flex items-center gap-2 text-sm ${
                  status === 'success'
                    ? 'bg-green-200 text-green-600'
                    : status === 'error' || status === 'invalid'
                    ? 'bg-red-200 text-red-600'
                    : ''
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {status === 'success' ? (
                  <>
                    <Check /> Successfully subscribed!
                  </>
                ) : status === 'error' ? (
                  <>
                    <X /> Error subscribing. Please try again.
                  </>
                ) : (
                  <>
                    <X /> Please enter a valid email address.
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </section>
  )
}

export default Newsletter
