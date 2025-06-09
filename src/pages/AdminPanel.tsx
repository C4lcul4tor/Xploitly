import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Registration {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  personalNumber: string;
  mobile: string;
  email: string;
  course: string;
  registered_at: string;
  is_paid: number;
  is_replied: number;
}

interface CourseStatus {
  title: string;
  is_open: number;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  sent_at: string;
}

const AdminPanel: React.FC = () => {
  const [regs, setRegs] = useState<Registration[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [coursesStatus, setCoursesStatus] = useState<CourseStatus[]>([]);
  const [newCourse, setNewCourse] = useState<any>({});
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin-auth') === 'true';
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }

    fetch('http://localhost:5000/api/register/all')
      .then(res => res.json())
      .then(setRegs)
      .catch(err => console.error("Failed to fetch registrations", err));

    fetch('http://localhost:5000/api/register/courses/status')
      .then(res => res.json())
      .then(setCoursesStatus)
      .catch(err => console.error("Failed to fetch course status", err));

    fetch('http://localhost:5000/api/contact/all')
      .then(res => res.json())
      .then(setContactMessages)
      .catch(err => console.error("Failed to fetch contact messages", err));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('admin-auth');
    window.location.href = '/admin-login';
  };

  const togglePayment = async (id: number, paid: number) => {
    setRegs(rs => rs.map(r => r.id === id ? { ...r, is_paid: paid ? 0 : 1 } : r));
    await fetch('http://localhost:5000/api/register/toggle-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_paid: !paid })
    });
  };

  const toggleCourse = async (title: string, open: number) => {
    setCoursesStatus(cs => cs.map(c => c.title === title ? { title, is_open: open ? 0 : 1 } : c));
    await fetch('http://localhost:5000/api/register/toggle-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course: title, is_open: !open })
    });
  };

  const handleCourseInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const submitNewCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        ...newCourse,
        meetings_per_week: Number(newCourse.meetings_per_week),
        price: Number(newCourse.price),
        sale_price: newCourse.sale_price ? Number(newCourse.sale_price) : 0,
        is_open: 1
      };

      const res = await fetch('http://localhost:5000/api/courses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert('✅ Course created successfully!');
        setNewCourse({});
        const refreshed = await fetch('http://localhost:5000/api/register/courses/status');
        setCoursesStatus(await refreshed.json());
      } else {
        const error = await res.json();
        console.error('Server error:', error);
        alert('❌ Failed to create course. Check console.');
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Error while submitting course.');
    }
  };

  const filtered = regs.filter(r =>
    (filter === 'All' || r.course === filter) &&
    (search.trim() === '' || r.personalNumber.includes(search.trim()))
  );

  const courses = Array.from(new Set(regs.map(r => r.course)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white font-futuristic p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-cyan-300">🧠 Admin Panel</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow transition"
        >
          Logout
        </button>
      </div>

      {/* --- Course Access Toggle --- */}
      <div className="mb-6">
        <h2 className="text-xl text-cyan-300 mb-2">Course Registration Access</h2>
        {coursesStatus.map(c => (
          <div key={c.title} className="flex items-center mb-2">
            <span className="mr-4">{c.title}</span>
            <button
              onClick={() => toggleCourse(c.title, c.is_open)}
              className={`px-3 py-1 rounded font-semibold ${c.is_open ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {c.is_open ? 'Allowed' : 'Locked'}
            </button>
          </div>
        ))}
      </div>

      {/* --- Course Creation Form --- */}
      <div className="bg-[#0f0f1a] border border-cyan-700 rounded p-6 mb-8 shadow-[0_0_20px_#00ffff]">
        <h2 className="text-xl text-cyan-300 mb-4">➕ Add New Course</h2>
        <form onSubmit={submitNewCourse} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="title" placeholder="Course Title" required value={newCourse.title || ''} onChange={handleCourseInput} className="input-field" />
          <input name="instructor_name" placeholder="Instructor Name" required value={newCourse.instructor_name || ''} onChange={handleCourseInput} className="input-field" />
          <input name="duration" placeholder="Duration (e.g. 6 weeks)" required value={newCourse.duration || ''} onChange={handleCourseInput} className="input-field" />
          <input name="meetings_per_week" placeholder="Meetings per Week" required value={newCourse.meetings_per_week || ''} onChange={handleCourseInput} className="input-field" />
          <input name="lecture_start_time" placeholder="Start Time" required value={newCourse.lecture_start_time || ''} onChange={handleCourseInput} className="input-field" />
          <input name="lecture_end_time" placeholder="End Time" required value={newCourse.lecture_end_time || ''} onChange={handleCourseInput} className="input-field" />
          <input name="price" placeholder="Price (GEL)" required value={newCourse.price || ''} onChange={handleCourseInput} className="input-field" />
          <input name="sale_price" placeholder="Sale Price (optional)" value={newCourse.sale_price || ''} onChange={handleCourseInput} className="input-field" />
          <textarea name="description" placeholder="Full Description" required value={newCourse.description || ''} onChange={handleCourseInput} className="input-field col-span-2" />
          <textarea name="curriculum" placeholder="Short Curriculum" required value={newCourse.curriculum || ''} onChange={handleCourseInput} className="input-field col-span-2" />
          <textarea name="learning_outcomes" placeholder="Learning Outcomes" required value={newCourse.learning_outcomes || ''} onChange={handleCourseInput} className="input-field col-span-2" />
          <button type="submit" className="col-span-2 mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_15px_#00ffff] text-lg">
            🚀 Create Course
          </button>
        </form>
      </div>

      {/* --- Filters --- */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div>
          <label className="mr-2 text-cyan-400 font-semibold">Filter by Course:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="text-black px-2 py-1 rounded">
            <option value="All">All</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="Search by Personal #"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-black px-3 py-1 rounded border border-cyan-500"
          />
        </div>
      </div>

      {/* --- Registration Table --- */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full table-auto border-collapse border border-cyan-500">
          <thead className="bg-cyan-900 text-cyan-200">
            <tr>
              <th className="border px-2 py-2">#</th>
              <th className="border px-2 py-2">Name</th>
              <th className="border px-2 py-2">Surname</th>
              <th className="border px-2 py-2">Birthdate</th>
              <th className="border px-2 py-2">Personal #</th>
              <th className="border px-2 py-2">Mobile</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Course</th>
              <th className="border px-2 py-2">Registered</th>
              <th className="border px-2 py-2">Paid</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className="text-center">
                <td className="border px-2 py-2">{i + 1}</td>
                <td className="border px-2 py-2">{r.name}</td>
                <td className="border px-2 py-2">{r.surname}</td>
                <td className="border px-2 py-2">{r.birthdate.split('T')[0]}</td>
                <td className="border px-2 py-2">{r.personalNumber}</td>
                <td className="border px-2 py-2">{r.mobile}</td>
                <td className="border px-2 py-2">{r.email}</td>
                <td className="border px-2 py-2">{r.course}</td>
                <td className="border px-2 py-2">{r.registered_at.split('T')[0]}</td>
                <td className="border px-2 py-2">
                  <button
                    onClick={() => togglePayment(r.id, r.is_paid)}
                    className={`px-2 py-1 rounded font-bold ${r.is_paid ? 'bg-green-500' : 'bg-yellow-500'}`}
                  >
                    {r.is_paid ? 'Paid' : 'Not Paid'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* --- Contact Messages --- */}
<div>
  <h2 className="text-xl text-cyan-300 mb-4">📬 Contact Messages</h2>
  <div className="space-y-4">
    {Array.isArray(contactMessages) && contactMessages.length === 0 ? (
      <p className="text-cyan-200">No messages yet.</p>
    ) : (
      contactMessages.map((msg) => (
        <div
          key={msg.id}
          className={`border rounded p-4 shadow bg-[#0a0a23] ${
            msg.is_replied === 1 ? 'border-green-600' : 'border-yellow-600'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
            </div>
            <div>
              <span
                className={`px-3 py-1 text-sm font-bold rounded-full ${
                  msg.is_replied === 1 ? 'bg-green-500 text-black' : 'bg-yellow-400 text-black'
                }`}
              >
                {msg.is_replied === 1 ? '✅ Replied' : '⏳ Not Replied'}
              </span>
            </div>
          </div>

          <p><strong>Message:</strong> {msg.message}</p>

          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-cyan-400">
              {new Date(msg.sent_at).toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
            <button
              className={`px-3 py-1 rounded text-sm font-semibold ${
                msg.is_replied === 1 ? 'bg-yellow-500' : 'bg-green-500'
              } text-black`}
              onClick={async () => {
                await fetch('http://localhost:5000/api/contact/mark-replied', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    id: msg.id,
                    is_replied: msg.is_replied === 1 ? 0 : 1
                  })
                });

                const res = await fetch('http://localhost:5000/api/contact/all');
                const updated = await res.json();
                setContactMessages(updated);
              }}
            >
              {msg.is_replied === 1 ? 'Mark as Not Replied' : 'Mark as Replied'}
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</div>


      </div>
    </div>
  );
};

export default AdminPanel;
