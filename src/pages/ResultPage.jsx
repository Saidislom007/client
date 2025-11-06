import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  MessageCircle,
  Award,
  Frown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ResultPage({ score, total, skipedCount }) {
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);
  const success = score >= 15;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-950 to-black text-white p-4 overflow-hidden relative">
      {/* 🔹 Floating gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">
          Test Natijasi
        </h2>

        <div className="space-y-4 mb-6 text-gray-200">
          <div className="flex justify-center items-center gap-2 text-lg font-semibold">
            <CheckCircle className="w-6 h-6 text-green-400" />
            To‘g‘ri javoblar:
            <span className="text-green-300 font-bold">
              {score} / {total}
            </span>
          </div>

          <div className="flex justify-center items-center gap-2 text-lg font-semibold">
            <XCircle className="w-6 h-6 text-yellow-400" />
            Tashlab ketilgan savollar:
            <span className="text-yellow-300 font-bold">
              {skipedCount} / {total}
            </span>
          </div>

          <p
            className={`text-xl font-bold mt-4 ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            Sizning natijangiz: {percentage}%
          </p>
        </div>

        {/* 🔹 Success / Fail Card */}
        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex flex-col items-center gap-3">
              <Award className="w-14 h-14 text-yellow-400 animate-bounce" />
              <h3 className="text-2xl font-bold text-green-400">
                🎉 Tabriklaymiz! 🎉
              </h3>
              <p className="text-gray-300">
                Siz kursimizni muvaffaqiyatli yakunladingiz va
                <br />
                <span className="text-yellow-400 font-semibold">
                  Sertifikatga ega bo‘ldingiz!
                </span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex flex-col items-center gap-3">
              <Frown className="w-14 h-14 text-red-400 animate-pulse" />
              <h3 className="text-2xl font-bold text-red-400">Afsus!</h3>
              <p className="text-gray-300">
                Siz hozircha <span className="font-semibold">sertifikat</span>ga
                ega bo‘la olmadingiz. <br /> Iltimos, yana tayyorlaning.
              </p>
            </div>
          </motion.div>
        )}

        {/* Telegramga yuborildi xabari */}
        <div className="flex items-center justify-center gap-2 text-blue-400 mb-6">
          <MessageCircle className="w-5 h-5 animate-pulse" />
          <span className="font-medium">
            Sizning natijangiz muvaffaqiyatli Telegramga yuborildi
          </span>
        </div>

        {/* Qayta boshlash tugmasi */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/test")}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition-all duration-200"
        >
          Testni qayta boshlash
        </motion.button>
      </motion.div>

      {/* 🔹 Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite ease-in-out; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}
      </style>
    </div>
  );
}
