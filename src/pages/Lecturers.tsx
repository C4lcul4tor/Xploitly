import LecturerCard from '../components/LecturerCard'
import Navbar from '../components/Navbar'

export default function Lecturers() {
  const lecturers = [
    {
      name: 'Dr. Maia Techshield',
      role: 'Cyber Defense Specialist',
      bio: 'Maia has 15+ years of experience in digital infrastructure protection and zero-day threat response.',
      image: 'https://i.pravatar.cc/150?img=47'
    },
    {
      name: 'Prof. Luka Quantum',
      role: 'Ethical Hacking Lead',
      bio: 'Luka specializes in penetration testing and reverse engineering advanced malware.',
      image: 'https://i.pravatar.cc/150?img=55'
    },
    {
      name: 'Ana Bytehunter',
      role: 'Threat Intelligence Analyst',
      bio: 'Ana is an expert in threat intel, cyber forensics, and advanced persistent threat profiling.',
      image: 'https://i.pravatar.cc/150?img=65'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-futuristic">
      <Navbar />
      <h1 className="text-4xl text-center my-10">🧠 Meet Our Lecturers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10 pb-16">
        {lecturers.map((lecturer, index) => (
          <LecturerCard key={index} {...lecturer} />
        ))}
      </div>
    </div>
  )
}
