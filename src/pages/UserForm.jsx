import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { User, Phone, IdCard } from "lucide-react";

export default function UserForm() {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [id_card_number, setIdCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!full_name || !phone_number || !id_card_number) {
      return toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BC_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, phone_number, id_card_number }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xatolik yuz berdi");

      const userData = { full_name, id: id_card_number };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!");
      navigate(`/test?user=${id_card_number}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 via-gray-950 to-black overflow-hidden">
      {/* 🔹 Gradient moving background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* 🔹 Main Form Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl text-white animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-wide">
          Kompyuter Savodxonligi
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Smart Coders Academy test tizimiga xush kelibsiz!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:border-indigo-400 transition">
            <User className="text-indigo-300 w-5 h-5" />
            <input
              type="text"
              placeholder="To‘liq ism"
              className="bg-transparent flex-1 outline-none placeholder-gray-400 text-white"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:border-indigo-400 transition">
            <Phone className="text-indigo-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Telefon raqam"
              className="bg-transparent flex-1 outline-none placeholder-gray-400 text-white"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus-within:border-indigo-400 transition">
            <IdCard className="text-indigo-300 w-5 h-5" />
            <input
              type="text"
              placeholder="ID karta raqami"
              className="bg-transparent flex-1 outline-none placeholder-gray-400 text-white"
              value={id_card_number}
              onChange={(e) => setIdCardNumber(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-xl transition-transform duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:scale-105 shadow-lg"
            }`}
          >
            {loading ? "Yuklanmoqda..." : "Ro‘yxatdan o‘tish"}
          </button>
        </form>
      </div>

      {/* 🔹 Animation keyframes */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite ease-in-out; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        `}
      </style>
    </div>
  );
}
