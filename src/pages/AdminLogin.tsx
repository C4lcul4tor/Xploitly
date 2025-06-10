import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://82.29.178.64:5000/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
  localStorage.setItem("admin-auth", "true");
  window.location.href = "/admin-xploitly-42"; // ✅ reload app state
}
 else {
        alert(data.error || "❌ Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("🚫 Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white font-futuristic">
      <div className="bg-[#0f0f1a] border border-cyan-500 shadow-[0_0_25px_#00ffff] rounded-2xl p-10 w-full max-w-sm space-y-6">
        <h2 className="text-2xl text-center font-bold text-cyan-300">🛡️ Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field w-full"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full shadow transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "🚀 Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
