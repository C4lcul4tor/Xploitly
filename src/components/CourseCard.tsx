import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  instructor_name: string;
  duration: string;
  lecture_start_time: string;
  lecture_end_time: string;
  price: string;
  sale_price?: string;
  curriculum: string;
  learning_outcomes: string;
  is_open: number;
  onRegister: (course: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  instructor_name,
  duration,
  lecture_start_time,
  lecture_end_time,
  price,
  sale_price,
  curriculum,
  learning_outcomes,
  is_open,
  onRegister
}) => {
  const handleClick = () => {
    onRegister(title); // ✅ Always allow modal to open
  };

  return (
    <div className="bg-[#0b0b0f] border border-cyan-500 rounded-xl p-6 text-white shadow-[0_0_20px_#00ffff55] hover:shadow-[0_0_30px_#00ffffaa] transition-all duration-300 space-y-5 w-full max-w-2xl mx-auto">

      {/* 🔒 LOCKED WARNING */}
      {is_open === 0 && (
        <div className="text-center text-red-500 font-bold animate-pulse text-sm mb-2">
          🔒 Registration Locked
        </div>
      )}

      {/* 📌 Title & Description */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-cyan-300 tracking-wide uppercase">{title}</h2>
        <p className="text-cyan-100 italic text-sm mt-2">{description}</p>
      </div>

      {/* 📋 Details */}
      <div className="text-sm text-white space-y-2 border-t border-cyan-800 pt-4">
        <p><span className="text-cyan-400 font-medium">👨‍🏫 Instructor:</span> {instructor_name}</p>
        <p><span className="text-cyan-400 font-medium">🗓️ Duration:</span> {duration}</p>
        <p><span className="text-cyan-400 font-medium">🕐 Lecture Time:</span> {lecture_start_time} – {lecture_end_time}</p>
        <p>
          <span className="text-cyan-400 font-medium">💸 Price:</span>{' '}
          {sale_price ? (
            <>
              <span className="line-through text-red-400">{price}₾</span>{' '}
              <span className="text-green-400 font-bold">{sale_price}₾</span>
            </>
          ) : (
            <span className="text-green-400 font-bold">{price}₾</span>
          )}
        </p>
      </div>

      {/* 📚 Curriculum */}
      <div className="mt-6 border-t border-cyan-800 pt-4">
        <h3 className="text-cyan-400 font-semibold mb-2">📚 Curriculum:</h3>
        <ul className="space-y-1 text-sm text-white">
          {curriculum.split('\n').map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-cyan-400 mr-2">✔️</span>
              <span>{item.trim()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🎯 Learning Outcomes */}
      <div className="mt-6 border-t border-cyan-800 pt-4">
        <h3 className="text-cyan-400 font-semibold mb-2">🎯 Learning Outcomes:</h3>
        <ul className="space-y-1 text-sm text-white">
          {learning_outcomes.split('\n').map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-purple-400 mr-2">✔️</span>
              <span>{item.trim()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 🚀 Register Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleClick}
          className={`${
            is_open ? "bg-cyan-500 hover:bg-cyan-400" : "bg-gray-600"
          } text-black font-bold px-6 py-2 rounded-full shadow-lg transition`}
        >
          🚀 Register
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
