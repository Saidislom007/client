export default function QuestionHelper({ data, onSelect, selected }) {
  return (
    <div className="p-4 bg-gray-100 ">
      <h2 className="text-lg font-semibold mb-2 p-3 "> Savol :   {data.question}</h2>
      <div className="flex flex-col gap-2">
        
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(opt)}
            className={`p-3 border-2 border-b-5  border-r-5 rounded-2xl ${
              selected === opt ? "bg-gray-600 text-white" : "bg-white"
            }`}
          >
          
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
