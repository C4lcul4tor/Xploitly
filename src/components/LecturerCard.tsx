import { motion } from 'framer-motion'

interface LecturerProps {
  name: string
  role: string
  image?: string
  bio: string
}

export default function LecturerCard({ name, role, image, bio }: LecturerProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 border border-cyan-500 p-6 rounded-xl text-center shadow-md"
    >
      <img
        src={image || 'https://via.placeholder.com/150'}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-cyan-500"
      />
      <h3 className="text-cyan-400 text-lg font-bold">{name}</h3>
      <p className="text-sm text-white mb-2">{role}</p>
      <p className="text-gray-300 text-sm">{bio}</p>
    </motion.div>
  )
}
