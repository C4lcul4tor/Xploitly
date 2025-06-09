import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeonDateInput from "../components/NeonDateInput";

interface ModalProps {
  onClose: () => void;
  course: string;
}

const RegistrationModal: React.FC<ModalProps> = ({ onClose, course }) => {
  const [submitted, setSubmitted] = useState(false);
  const [courseLocked, setCourseLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCourseLock = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/register/courses/status");
        const list = await res.json();
        const found = list.find(
          (c: any) => c.title.trim().toLowerCase() === course.trim().toLowerCase()
        );
        setCourseLocked(!found || Number(found.is_open) !== 1);
      } catch (err) {
        console.error("🚨 Error checking course lock:", err);
        setCourseLocked(true); // fallback
      } finally {
        setLoading(false);
      }
    };

    checkCourseLock();
  }, [course]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      birthdate: formData.get("birthdate"),
      personalNumber: formData.get("personalNumber"),
      mobile: formData.get("mobile"),
      email: formData.get("email"),
      course,
    };

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      alert("❌ Something went wrong.");
    }
  };

  const goHome = () => {
    onClose();
    navigate("/");
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0a0a23]/95 border border-cyan-500 text-white shadow-[0_0_40px_#00ffff] rounded-2xl p-10 w-full max-w-2xl backdrop-blur-md"
      >
        {loading ? (
          <div className="text-center text-cyan-400 text-xl animate-pulse">Checking course status...</div>
        ) : courseLocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 bg-[#0f0f2a] border border-pink-500 rounded-xl p-6 shadow-[0_0_40px_#ff00ff]"
          >
            <div className="text-4xl text-pink-400 animate-pulse">🚫</div>
            <div className="text-2xl font-bold text-pink-300">
              Registration for <span className="text-white">{course}</span> is <span className="text-red-500">Locked</span>
            </div>
            <p className="text-pink-400 text-sm">
              Please check back later or contact the Xploitly team.
            </p>
            <button
              onClick={goHome}
              className="bg-pink-500 hover:bg-pink-400 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_15px_#ff00ff] text-lg"
            >
              Return Home
            </button>
          </motion.div>
        ) : !submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl text-cyan-300 font-bold text-center animate-pulse">
              🚀 Registering for: <span className="text-white">{course}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" placeholder="Name" required className="input-field" />
              <input name="surname" placeholder="Surname" required className="input-field" />
              <div className="sm:col-span-2">
                <NeonDateInput />
              </div>
              <input name="personalNumber" placeholder="Personal Number" required maxLength={11} pattern="\d{11}" className="input-field" />
              <input name="mobile" placeholder="Mobile Number" required maxLength={9} pattern="\d{9}" className="input-field" />
              <input name="email" type="email" placeholder="Email" required className="input-field sm:col-span-2" />
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
  );
};

export default RegistrationModal;
