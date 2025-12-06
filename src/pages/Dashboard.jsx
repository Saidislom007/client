import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Rocket, BookOpen, MonitorCheck,Play } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    console.log(user.id_card_number)
  }, []);

  return (
    <div className="relative flex flex-wrap lg:flex-nowrap gap-12 items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-100 overflow-hidden p-6">

      {/* Floating Background Orbs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>

      {/* CARD 1 – Final Exam */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl animate-fadeIn">
        <div className="flex justify-center mb-4">
          <GraduationCap className="w-14 h-14 text-indigo-600 drop-shadow-md" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oxirgi Imtihon (Exam)
        </h1>

        <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
          Kursni muvaffaqiyatli tamomlaganingizni tekshiruvchi yakuniy test.
          To‘g‘ri bajarganingizda <span className="font-semibold text-indigo-600">sertifikat</span> beriladi.
        </p>

        <Link
          to="/re"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <Rocket className="w-5 h-5" />
          Testni boshlash
        </Link>
      </div>

      {/* CARD 2 – Mock Test */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md border border-white/40 rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl animate-fadeIn">
        <div className="flex justify-center mb-4">
          <MonitorCheck className="w-14 h-14 text-indigo-600 drop-shadow-md" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Test uchun (Mock)
        </h1>

        <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
          Bilimingizni oldindan sinab ko‘rish uchun mo‘ljallangan test.
          Yaxshi natija kursni yakuniy imtihonda <span className="font-semibold text-indigo-600">o‘tish imkoningizni oshiradi!</span>
        </p>

        <Link
          to="/re"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <Play className="w-5 h-5" />
          Testni boshlash
        </Link>
      </div>

      {/* Floating Decorative Icons */}
      <div className="absolute top-12 right-12 text-yellow-400 animate-bounce-slow">
        <BookOpen className="w-6 h-6" />
      </div>
      <div className="absolute bottom-24 left-10 text-pink-400 animate-bounce-slow">
        <GraduationCap className="w-6 h-6" />
      </div>
      <div className="absolute bottom-36 right-24 text-green-400 animate-bounce-slow">
        <Rocket className="w-6 h-6" />
      </div>
    </div>
  );
}
