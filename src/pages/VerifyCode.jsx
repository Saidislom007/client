import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { KeyRound } from "lucide-react";

export default function VerifyCode() {
  const { state } = useLocation();
  const username = state?.username;
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BC_URL;

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
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        <p>Avval login qiling.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <form
        onSubmit={handleVerify}
        className="bg-gray-900 p-8 rounded-2xl w-96 shadow-lg border border-gray-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Kod Tasdiqlash</h1>
        <div className="mb-6">
          <label className="text-sm">Telegramdan kelgan kod</label>
          <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-3 py-2 mt-1">
            <KeyRound className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-gray-200"
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors py-2 rounded-lg font-medium"
        >
          {loading ? "Tekshirilmoqda..." : "Tasdiqlash"}
        </button>
      </form>
    </div>
  );
}
