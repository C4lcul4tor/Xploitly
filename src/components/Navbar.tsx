import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 shadow-lg flex justify-between items-center font-futuristic sticky top-0 z-50">
      <Link to="/" className="text-2xl tracking-widest text-cyan-400 hover:text-cyan-300 transition-all">
        ⚡ Xploitly
      </Link>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
        <Link to="/about" className="hover:text-cyan-400 transition">About</Link>
        <Link to="/lecturers" className="hover:text-cyan-400 transition">Lecturers</Link>
        <Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link>
      </div>
    </nav>
  )
}
