import Navbar from './components/Navbar'
import CourseCard from './components/CourseCard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-futuristic">
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-4xl mb-10 animate-pulse">🚀 Cyber Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <CourseCard
            title="Ethical Hacking 101"
            description="Learn ethical hacking techniques and tools to become a certified penetration tester."
          />
          <CourseCard
            title="Intro to Cybersecurity"
            description="Understand basic security principles and how to protect systems and data."
          />
          <CourseCard
            title="Advanced Threat Analysis"
            description="Dive deep into malware, threat intelligence, and attack prevention."
          />
        </div>
      </div>
    </div>
  )
}

export default App
