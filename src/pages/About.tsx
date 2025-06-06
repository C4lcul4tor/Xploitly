import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-futuristic">
      <Navbar />
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl text-center mb-10">
          💡 <span className="text-cyan-400">About Xploitly Academy</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-gray-300 mb-8 leading-relaxed"
        >
          Xploitly Academy is a futuristic cybersecurity education platform offering
          hands-on training in ethical hacking, cyber defense, and threat intelligence.
          Our mission is to empower the next generation of digital defenders and
          cyber professionals with cutting-edge knowledge and skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg border border-cyan-500 shadow-xl"
        >
          <h2 className="text-2xl text-cyan-300 mb-3">🚀 What We Offer</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-200 text-base">
            <li>Interactive and practical course content</li>
            <li>Expert instructors with real-world experience</li>
            <li>Live project-based learning with simulation environments</li>
            <li>Futuristic design, immersive UI, and accessible navigation</li>
            <li>Career-ready cybersecurity training paths</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
