import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Question from "../components/Question";
import ResultPage from "./ResultPage";
import Timerr from "../components/Timer";

export default function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userIdCard = searchParams.get("user");

  // Savollarni olish
  useEffect(() => {
    if (!userIdCard) {
      toast.error("Iltimos, avval ro‘yxatdan o‘ting!");
      return navigate("/");
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BC_URL}/questions`);
        const data = await res.json();
        setQuestions(data);
      } catch {
        toast.error("Savollarni olishda xatolik yuz berdi!");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [userIdCard]);

  // Javobni tanlash
  const handleSelect = (answer) => {
    setSelected(answer);
    setAnswers({ ...answers, [current]: answer });
  };

  // Keyingi savol
  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] || "");
    } else {
      handleFinish();
    }
  };

  // Oldingi savol
  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1] || "");
    }
  };

  // Test yakunlash
  const handleFinish = async () => {
    let totalScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) totalScore++;
    });

    setScore(totalScore);
    setFinished(true);

    try {
      await fetch(`${import.meta.env.VITE_BC_URL}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_card_number: userIdCard,
          score: totalScore,
          total: questions.length,
        }),
      });
      toast.success("Natija yuborildi!");
    } catch {
      toast.error("Natijani yuborishda xatolik yuz berdi!");
    }
  };

  // Timer tugaganda
  const handleTimeUp = () => {
    toast.error("⏰ Vaqt tugadi! Test avtomatik yakunlandi.");
    handleFinish();
  };

  // Qayta boshlash
  const handleRestart = () => {
    setAnswers({});
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected("");
  };

  // Yuklanish holati
  if (loading)
    return <p className="text-center mt-20 text-lg">Savollar yuklanmoqda...</p>;

  if (!questions.length)
    return <p className="text-center mt-20 text-lg">Savollar topilmadi.</p>;

  if (finished)
    return (
      <ResultPage
        score={score}
        total={questions.length}
        onRestart={handleRestart}
      />
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded-2xl shadow-lg relative">
      {/* Header qismi */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-700">
          Savol {current + 1} / {questions.length}
        </h2>
        <Timerr minutes={localStorage.getItem("adminTimer")} onTimeUp={handleTimeUp} isRunning={!finished} />
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-red-500 to-orange-500 h-2.5 transition-all duration-300"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Savol komponenti */}
      <Question
        data={questions[current]}
        onSelect={handleSelect}
        selected={selected}
      />

      {/* Tugmalar */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className={`px-4 py-2 rounded-lg border font-semibold transition-all ${
            current === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          ← Oldingi
        </button>

        {current + 1 === questions.length ? (
          <button
            onClick={handleFinish}
            disabled={!selected}
            className={`px-4 py-2 rounded-lg border font-semibold transition-all ${
              selected
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Tugatish
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`px-4 py-2 rounded-lg border font-semibold transition-all ${
              selected
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Keyingi →
          </button>
        )}
      </div>
    </div>
  );
}
