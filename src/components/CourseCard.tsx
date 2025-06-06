import { motion } from 'framer-motion'
import { useState } from 'react'
import RegistrationModal from './RegistrationModal'

interface CourseCardProps {
  title: string
  description: string
}

export default function CourseCard({ title, description }: CourseCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-900 border border-cyan-500 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-cyan-300">{title}</h2>
        <p className="text-white mt-2">{description}</p>
        <button
          className="mt-4 px-4 py-2 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400"
          onClick={() => setOpen(true)}
        >
          Register
        </button>
      </motion.div>

      {open && <RegistrationModal onClose={() => setOpen(false)} course={title} />}
    </>
  )
}
