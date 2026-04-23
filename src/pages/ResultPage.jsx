import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, MessageCircle, Award, Frown, RotateCcw, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function getGrade(percentage) {
  if (percentage >= 90) return { letter: "A+", label: "Mukammal", color: "text-emerald-400" };
  if (percentage >= 80) return { letter: "A", label: "A'lo", color: "text-green-400" };
  if (percentage >= 70) return { letter: "B", label: "Yaxshi", color: "text-blue-400" };
  if (percentage >= 60) return { letter: "C", label: "Qoniqarli", color: "text-yellow-400" };
  return { letter: "F", label: "Qoniqarsiz", color: "text-red-400" };
}

export default function ResultPage({ score, total, skipedCount }) {
  const navigate = useNavigate();
  const percentage = Math.round((score / total) * 100);
  const success = score >= 13;
  const grade = getGrade(percentage);
  const wrong = total - score - skipedCount;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] text-white p-4 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none ${
          success ? "bg-emerald-500" : "bg-red-500"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header strip */}
        <div className="flex items-center gap-3 mb-4 px-1">
          <BookOpen className="w-5 h-5 text-gray-500" />
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
            Imtihon Natijasi
          </span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-600 font-mono">
            {score}/{total} ball
          </span>
        </div>

        {/* Main card */}
        <div className="bg-[#16181f] border border-white/8 rounded-2xl overflow-hidden shadow-2xl">

          {/* Top: Score display */}
          <div className="px-8 pt-8 pb-6 border-b border-white/6 flex items-center gap-6">
            {/* Circle grade */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className={`relative w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center shrink-0 ${
                success
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-red-500/40 bg-red-500/10"
              }`}
            >
              <span className={`text-3xl font-black font-mono ${grade.color}`}>
                {grade.letter}
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">
                {grade.label}
              </span>
            </motion.div>

            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-5xl font-black font-mono tabular-nums ${
                  success ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {percentage}
                <span className="text-2xl text-gray-500">%</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  success
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/15 text-red-400 border border-red-500/20"
                }`}
              >
                {success ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                {success ? "O'tdi" : "O'tmadi"}
              </motion.div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-8 py-4 border-b border-white/6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Natija ko'rsatkichi</span>
              <span className="font-mono">
                {score} / {total}
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  success
                    ? "bg-linear-to-r from-emerald-500 to-green-400"
                    : "bg-linear-to-r from-red-500 to-rose-400"
                }`}
              />
            </div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/6"
          >
            {[
              { label: "To'g'ri", value: score, color: "text-emerald-400", icon: <CheckCircle className="w-4 h-4" /> },
              { label: "Noto'g'ri", value: wrong, color: "text-red-400", icon: <XCircle className="w-4 h-4" /> },
              { label: "O'tkazildi", value: skipedCount, color: "text-yellow-400", icon: <span className="text-sm">—</span> },
            ].map(({ label, value, color, icon }) => (
              <div key={label} className="flex flex-col items-center py-5 gap-1">
                <div className={`${color} opacity-70`}>{icon}</div>
                <span className={`text-2xl font-black font-mono ${color}`}>{value}</span>
                <span className="text-[11px] text-gray-500 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Result message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="px-8 py-6 border-b border-white/6"
          >
            {success ? (
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-base">Tabriklaymiz!</p>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    Siz kursimizni muvaffaqiyatli yakunladingiz va{" "}
                    <span className="text-yellow-400 font-semibold">Sertifikatga</span>{" "}
                    ega bo'ldingiz.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <Frown className="w-8 h-8 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-base">Maqsadga yetilmadi</p>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    Sertifikat olish uchun kamida{" "}
                    <span className="text-white font-semibold">15 ta</span> to'g'ri
                    javob kerak. Yana tayyorlaning va qaytadan urinib ko'ring.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Telegram notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="px-8 py-3 flex items-center gap-2 border-b border-white/6 bg-blue-500/5"
          >
            <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-xs text-blue-400">
              Natijangiz Telegramga muvaffaqiyatli yuborildi
            </span>
          </motion.div>

          {/* Action */}
          <div className="px-8 py-5">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/test")}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-white text-[#0f1117] hover:bg-gray-100 transition-colors duration-150"
            >
              <RotateCcw className="w-4 h-4" />
              Testni qayta boshlash
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-700 mt-4">
          O'tish bali: 13 / {total} • {Math.round((13 / total) * 100)}%
        </p>
      </motion.div>
    </div>
  );
}
