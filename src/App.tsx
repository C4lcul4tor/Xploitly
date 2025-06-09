import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import RegistrationModal from './components/RegistrationModal';
import About from './pages/About';
import Lecturers from './pages/Lecturers';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';

function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);

  const handleRegister = (course: string) => setSelectedCourse(course);
  const closeModal = () => setSelectedCourse(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses'); // this gets ALL courses now
        if (!res.ok) {
          throw new Error('Server responded with error');
        }
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('❌ Failed to load courses:', err);
        alert('Could not fetch courses. Please check your server or database.');
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-futuristic">
      <Navbar />
      <div className="p-10 text-center">
        <h1 className="text-4xl mb-10 animate-pulse">🚀 Cyber Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course: any) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                instructor_name={course.instructor_name}
                duration={course.duration}
                lecture_start_time={course.lecture_start_time}
                lecture_end_time={course.lecture_end_time}
                price={course.price}
                sale_price={course.sale_price}
                curriculum={course.curriculum}
                learning_outcomes={course.learning_outcomes}
                is_open={course.is_open}
                onRegister={handleRegister}
              />
            ))
          ) : (
            <div className="text-cyan-300 col-span-full text-lg">No courses available.</div>
          )}
        </div>
      </div>

      {selectedCourse && (
        <RegistrationModal course={selectedCourse} onClose={closeModal} />
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/lecturers" element={<Lecturers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin-login" element={<AdminLogin />} />
<Route
  path="/admin-xploitly-42"
  element={
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;
