import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden p-6">
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded font-semibold mb-6"
        onClick={() => navigate("/admin")}
      >
        Admin
      </button>

      {/* 🔹 Soft floating circles for visual interest */}
      <div className="absolute top-0 -left-16 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 -right-16 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>

      {/* 🔹 Hero Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl p-10 max-w-md text-center shadow-lg animate-slideUp">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Smart Coders Academy
        </h1>
        <p className="text-gray-700 mb-6 text-base md:text-lg">
          Kompyuter savodxonligi kursi talabalari uchun test tizimi. <br />
          Testni tugatganingizda sertifikat olishingiz mumkin!
        </p>

        {/* 🔹 Start Test Button (big and clear for all ages) */}
        <Link
          to="/re"
          className="inline-block w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          Testni boshlash
        </Link>
      </div>

      {/* 🔹 Subtle floating icons */}
      <div className="absolute top-12 right-10 w-6 h-6 bg-yellow-300 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-24 left-10 w-5 h-5 bg-pink-300 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-36 right-28 w-5 h-5 bg-green-300 rounded-full animate-bounce-slow"></div>
    </div>
  );
}
