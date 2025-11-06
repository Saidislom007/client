import { useState, useEffect } from "react";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BC_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Xatolik yuz berdi");
      if (data.step === "verify_code") {
        navigate("/verify", { state: { username } });
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Matrix-style rain effect
  useEffect(() => {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "01";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF00"; // Yashil rang
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full  flex items-center justify-center overflow-hidden">
      {/* 🔹 Matrix rain background */}
      <canvas id="matrix" className="absolute inset-0 z-0"></canvas>

      {/* 🔹 Login form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-black/70 border border-green-500/30 backdrop-blur-md p-8 rounded-2xl w-96 shadow-2xl text-green-400"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400 tracking-widest">
          ADMIN PANEL
        </h1>

        <div className="mb-4">
          <label className="text-sm text-green-300">Username</label>
          <div className="flex items-center gap-2 border border-green-700 rounded-lg px-3 py-2 mt-1 bg-black/50">
            <User className="text-green-400 w-5 h-5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-green-300 placeholder-green-700"
              placeholder="Admin nomi"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-green-300">Password</label>
          <div className="flex items-center gap-2 border border-green-700 rounded-lg px-3 py-2 mt-1 bg-black/50">
            <Lock className="text-green-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-green-300 placeholder-green-700"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors py-2 rounded-lg font-semibold text-black hover:shadow-[0_0_15px_#00FF00]"
        >
          {loading ? "Tekshirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
