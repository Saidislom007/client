import { useState } from "react";

export default function AdminForm({ onAdd }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !options || !answer) return;
    onAdd({
      question,
      options: options.split(",").map((o) => o.trim()),
      answer,
    });
    setQuestion("");
    setOptions("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2 ">
      <input
        type="text"
        placeholder="Savol"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 border-2 border-b-5  border-r-5 rounded-2xl"
      />
      <input
        type="text"
        placeholder="Variantlar (vergul bilan ajratilgan)"
        value={options}
        onChange={(e) => setOptions(e.target.value)}
        className="w-full p-3 border-2 border-b-5  border-r-5 rounded-2xl"
      />
      <input
        type="text"
        placeholder="To‘g‘ri javob"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 border-2 border-b-5  border-r-5 rounded-2xl"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 border-black border-2 border-b-5  border-r-5 rounded-2xl"
      >
        Savol qo‘shish
      </button>
    </form>
  );
}
