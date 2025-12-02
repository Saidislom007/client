import { Edit3, CheckCircle, List, Trash2 } from "lucide-react";

export default function AdminList({ questions, onDelete }) {
  return (
    <div>
      <ul className="space-y-3">
        {questions?.map((q) => {
          // options → undefined bo‘lsa bo‘sh array qaytaradi
          const optionsArray = Array.isArray(q?.options)
            ? q.options
            : typeof q?.options === "string"
            ? q.options.split(",").map((o) => o.trim())
            : [];

          return (
            <li
              key={q?.id}
              className="p-4 border-2 border-b-5 border-r-5 rounded-2xl bg-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            >
              <div className="flex flex-col gap-2">

                {/* Savol */}
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    {q?.question || "Savol mavjud emas"}
                  </span>
                </div>

                {/* Javob */}
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    {q?.answer || "Javob mavjud emas"}
                  </span>
                </div>

                {/* Variantlar */}
                <div className="flex items-center gap-2 flex-wrap">
                  <List className="w-5 h-5 text-gray-600" />

                  {optionsArray.length > 0 ? (
                    optionsArray.map((o, index) => (
                      <span key={index} className="mr-2 text-gray-700">
                        {o}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Variantlar yo‘q</span>
                  )}
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(q?.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 border-black border-2 border-b-5 border-r-5 rounded-2xl mt-2 md:mt-0"
              >
                <Trash2 className="w-4 h-4" />
                O‘chirish
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
