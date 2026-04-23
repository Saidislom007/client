import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Question from "../components/Question";
import ResultPage from "./ResultPage";
import Timerr from "../components/Timer";
import { ChevronLeft, ChevronRight, Flag, CheckSquare } from "lucide-react";

export default function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userIdCard = searchParams.get("user");

  useEffect(() => {
    if (!userIdCard) {
      toast.error("Iltimos, avval ro'yxatdan o'ting!");
      return navigate("/");
    }

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BC_URL}/exam/questions`);
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

  const handleSelect = (answer) => {
    setSelected(answer);
    setAnswers({ ...answers, [current]: answer });
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] || "");
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    setSkippedCount((prev) => prev + 1);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] || "");
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1] || "");
    }
  };

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

  const handleTimeUp = () => {
    toast.error("Vaqt tugadi! Test avtomatik yakunlandi.");
    handleFinish();
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected("");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded px-10 py-8 text-center shadow-sm">
          <div className="w-8 h-8 border-2 border-[#1a3a6b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
            Ma'lumotlar yuklanmoqda...
          </p>
        </div>
      </div>
    );

  if (!questions.length)
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">
        <p className="text-sm text-gray-500 font-medium">Savollar topilmadi.</p>
      </div>
    );

  if (finished)
    return (
      <ResultPage
        score={score}
        total={questions.length}
        onRestart={handleRestart}
        skipedCount={skippedCount}
      />
    );

  const answeredCount = Object.keys(answers).length;
  const progressPct = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">

      {/* ── Official top bar ── */}
      <header className="bg-[#1a3a6b] text-white">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Seal placeholder */}
            <div className="w-9 h-9 rounded-full border-2 border-[#c8a951] bg-[#c8a951]/10 flex items-center justify-center shrink-0">
              <span className="text-[#c8a951] font-black text-xs">SCA</span>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase leading-none">
                Smart Coders Academy
              </p>
              <p className="text-[10px] text-blue-200 tracking-wider uppercase mt-0.5">
                Kompyuter Savodxonligi Imtihoni
              </p>
            </div>
          </div>

          <Timerr minutes={15} onTimeUp={handleTimeUp} isRunning={!finished} />
        </div>

        {/* Progress strip */}
        <div className="h-1 bg-[#0f2347]">
          <div
            className="h-full bg-[#c8a951] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* ── Document body ── */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-1">
          <span className="uppercase tracking-wider">Imtihon varaqasi</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-[#1a3a6b]" />
              Javob berildi: <strong className="text-gray-700 ml-1">{answeredCount}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Flag className="w-3.5 h-3.5 text-amber-500" />
              O'tkazildi: <strong className="text-gray-700 ml-1">{skippedCount}</strong>
            </span>
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded">
          {/* Card header */}
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-[#1a3a6b] text-white text-sm font-bold flex items-center justify-center font-mono">
                {current + 1}
              </span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Savol {current + 1} / {questions.length}
              </span>
            </div>

            {/* Step dots */}
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current
                      ? "bg-[#1a3a6b]"
                      : answers[i]
                      ? "bg-[#c8a951]"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question body */}
          <div className="px-6 py-5">
            <Question
              data={questions[current]}
              onSelect={handleSelect}
              selected={selected}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border transition-colors rounded ${
              current === 0
                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-white"
                : "border-[#1a3a6b] text-[#1a3a6b] hover:bg-[#1a3a6b] hover:text-white bg-white"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Oldingi
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white transition-colors rounded bg-white"
          >
            <Flag className="w-4 h-4" />
            O'tkazib yuborish
          </button>

          {current + 1 === questions.length ? (
            <button
              onClick={handleFinish}
              disabled={!selected}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border transition-colors rounded ${
                selected
                  ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
                  : "border-gray-200 text-gray-300 cursor-not-allowed bg-white"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              Yakunlash
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border transition-colors rounded ${
                selected
                  ? "border-[#1a3a6b] bg-[#1a3a6b] text-white hover:bg-[#0f2347]"
                  : "border-gray-200 text-gray-300 cursor-not-allowed bg-white"
              }`}
            >
              Keyingi
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Footer stamp */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-[15px]  uppercase tracking-[0.25em] ">
            Rasmiy imtihon tizimi · {new Date().getFullYear()}
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      </main>
    </div>
  );
}
