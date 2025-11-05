import { useState } from "react";
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-2xl w-96 shadow-lg border border-gray-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          <label className="text-sm">Username</label>
          <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 mt-1">
            <User className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-gray-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm">Password</label>
          <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 mt-1">
            <Lock className="text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-gray-200"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded-lg font-medium"
        >
          {loading ? "Tekshirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
