import { Link } from "react-router-dom";
import { GraduationCap, Rocket, BookOpen, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: <BookOpen className="w-4 h-4" />, label: "Savollar", value: "20 ta" },
  { icon: <Clock className="w-4 h-4" />, label: "Vaqt", value: "15 minut" },
  { icon: <Shield className="w-4 h-4" />, label: "O'tish bali", value: "13 / 20" },
];

export default function Home() {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-indigo-500" />

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
            Smart Coders Academy
          </span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-600 font-mono">v1.0</span>
        </div>

        {/* Main card */}
        <div className="bg-[#16181f] border border-white/8 rounded-2xl overflow-hidden shadow-2xl">

          {/* Top: Icon + title */}
          <div className="px-8 pt-8 pb-6 border-b border-white/6 flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-24 h-24 rounded-full border-2 border-indigo-500/40 bg-indigo-500/10 flex flex-col items-center justify-center shrink-0"
            >
              <GraduationCap className="w-10 h-10 text-indigo-400" />
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black text-white leading-tight"
              >
                Kompyuter <br />
                <span className="text-indigo-400">Savodxonligi</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
              >
                <Rocket className="w-3.5 h-3.5" />
                Sertifikat dasturi
              </motion.div>
            </div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/6"
          >
            {stats.map(({ icon, label, value }) => (
              <div key={label} className="flex flex-col items-center py-5 gap-1">
                <div className="text-indigo-400 opacity-70">{icon}</div>
                <span className="text-lg font-black font-mono text-white">{value}</span>
                <span className="text-[11px] text-gray-500 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="px-8 py-6 border-b border-white/6"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-base">Imtihon haqida</p>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  Kurs talabalariga mo'ljallangan test tizimi. 20 ta savoldan{" "}
                  <span className="text-white font-semibold">kamida 13 tasiga</span>{" "}
                  to'g'ri javob bersangiz,{" "}
                  <span className="text-indigo-400 font-semibold">Sertifikat</span>ga ega bo'lasiz.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action */}
          <div className="px-8 py-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <Link
                to="/re"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-white text-[#0f1117] hover:bg-gray-100 transition-colors duration-150"
              >
                <Rocket className="w-4 h-4" />
                Testni boshlash
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-700 mt-4">
          O'tish bali: 13 / 20 • 65%
        </p>
      </motion.div>
    </div>
  );
}
