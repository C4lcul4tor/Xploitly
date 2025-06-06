import Navbar from '../components/Navbar'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000) // Reset after 3s
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-futuristic">
      <Navbar />
      <div className="px-6 py-12 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl mb-10 text-cyan-300">📡 Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#0a0a23]/90 p-8 rounded-xl border border-cyan-500 shadow-[0_0_30px_#00ffff] backdrop-blur-md"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded bg-[#1e1e3f] text-white border border-cyan-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded bg-[#1e1e3f] text-white border border-cyan-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            className="w-full px-4 py-3 rounded bg-[#1e1e3f] text-white border border-cyan-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full shadow-[0_0_15px_#00ffff] text-lg transition"
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 text-cyan-300 font-semibold text-xl animate-pulse"
          >
            ✅ Message Sent! We'll reach out soon.
          </motion.div>
        )}
      </div>
    </div>
  )
}
