import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import NeonDateInput from "../components/NeonDateInput"

interface ModalProps {
  onClose: () => void
  course: string
}

const RegistrationModal: React.FC<ModalProps> = ({ onClose, course }) => {
  const [submitted, setSubmitted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const resetForm = () => setSubmitted(false)
  const goHome = () => {
    onClose()
    navigate("/")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0a0a23]/95 border border-cyan-500 text-white shadow-[0_0_40px_#00ffff] rounded-2xl p-10 w-full max-w-2xl backdrop-blur-md"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl text-cyan-300 font-bold text-center animate-pulse">
              🚀 Registering for: <span className="text-white">{course}</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                className="input-field"
              />
              <input
                type="text"
                placeholder="Surname"
                required
                className="input-field"
              />

              <div className="col-span-2">
                <NeonDateInput />
              </div>

              <input
                type="text"
                placeholder="Personal Number"
                required
                maxLength={11}
                pattern="\d{11}"
                className="input-field"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                required
                maxLength={9}
                pattern="\d{9}"
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="input-field col-span-2"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-full shadow-[0_0_20px_#00ffff] text-lg transition"
            >
              🚀 Register Now
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 bg-[#0b0b2b] border border-cyan-400 rounded-xl p-6 shadow-[0_0_40px_#00ffff]"
          >
            <div className="text-5xl text-cyan-300 animate-bounce">🧬</div>
            <div className="text-2xl font-bold text-cyan-200">
              Successfully Registered for <span className="text-white">{course}</span>
            </div>
            <p className="text-cyan-400 text-sm">
              Welcome to Xploitly Academy — we’ll reach you through secure channels.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={resetForm}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_15px_#00ffff] text-lg"
              >
                Register Another
              </button>
              <button
                onClick={goHome}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_15px_#00ffff] text-lg"
              >
                Return Home
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default RegistrationModal