const LABELS = ["A", "B", "C", "D", "E"];

export default function Question({ data, onSelect, selected }) {
  return (
    <div>
      <p className="text-base font-semibold text-gray-800 leading-relaxed mb-5">
        {data.question}
      </p>

      <div className="flex flex-col gap-2">
        {data.options.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <button
              key={i}
              onClick={() => onSelect(opt)}
              className={`group flex items-center gap-4 w-full text-left px-4 py-3 border transition-colors rounded ${
                isSelected
                  ? "border-[#1a3a6b] bg-[#1a3a6b] text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#1a3a6b] hover:bg-blue-50"
              }`}
            >
              <span
                className={`w-7 h-7 rounded shrink-0 flex items-center justify-center text-xs font-bold border transition-colors ${
                  isSelected
                    ? "bg-white text-[#1a3a6b] border-white"
                    : "border-gray-300 text-gray-400 group-hover:border-[#1a3a6b] group-hover:text-[#1a3a6b]"
                }`}
              >
                {LABELS[i] ?? i + 1}
              </span>
              <span className="text-sm font-medium">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
