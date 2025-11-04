import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

export default function Timerr({ minutes=15, onTimeUp, isRunning = true }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="flex justify-center items-center gap-2 text-lg font-mono">
      <span className="bg-gray-100 px-4 py-2 rounded-xl shadow-sm border border-gray-300 flex gap-1 font-extrabold">
        <Timer/> {mins}:{secs.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
