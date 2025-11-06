import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";

export default function VerifyCode() {
  const { state } = useLocation();
  const username = state?.username;
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef(null); // ✅ ref yaratamiz
  const API_URL = import.meta.env.VITE_BC_URL;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Canvas mavjud bo'lmasa hech narsa qilinmaydi
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/admin/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Kod xato");
      localStorage.setItem("auth_token", data.token);
      alert(data.msg);
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-400 bg-black font-mono">
        <p>Avval login qiling.</p>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>

      <form
        onSubmit={handleVerify}
        className="relative z-10 bg-black/80 backdrop-blur-md border border-green-500/30 p-8 rounded-2xl w-96 shadow-2xl font-mono text-green-400"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-green-400 tracking-wide">
          Kod Tasdiqlash
        </h1>

        <div className="mb-6">
          <label className="text-sm">Telegramdan kelgan kod</label>
          <div className="flex items-center gap-2 border border-green-500/40 rounded-lg px-3 py-2 mt-1 bg-black/50">
            <KeyRound className="text-green-400 w-5 h-5" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-green-300 placeholder-green-700"
              placeholder="Kodni kiriting..."
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors py-2 rounded-lg font-semibold text-black"
        >
          {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
        </button>
      </form>
    </div>
  );
}
