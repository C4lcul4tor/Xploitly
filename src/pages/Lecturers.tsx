import { useEffect, useState } from 'react';
import LecturerCard from '../components/LecturerCard';
import Navbar from '../components/Navbar';

interface Lecturer {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export default function Lecturers() {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const res = await fetch('http://82.29.178.64:5000/api/lecturers');
        if (!res.ok) throw new Error('Failed to fetch lecturers');
        const data = await res.json();
        setLecturers(data);
      } catch (err) {
        console.error('Failed to fetch lecturers:', err);
      }
    };

    fetchLecturers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-futuristic">
      <Navbar />
      <h1 className="text-4xl text-center my-10">🧠 Meet Our Lecturers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10 pb-16">
        {lecturers.length > 0 ? (
          lecturers.map((lecturer) => (
            <LecturerCard key={lecturer.id} {...lecturer} />
          ))
        ) : (
          <p className="text-center col-span-full text-cyan-300">
            No lecturers available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
