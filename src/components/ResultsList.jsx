import { User, CheckCircle, Clock, SquareCheck, XCircle } from "lucide-react";

export default function ResultsList({ results }) {
  return (
    <ul className="space-y-3">
      {results.map((r) => {
        const isPassed = r.success === true || r.success === "true"; // string/boolean support
        return (
          <li
            key={r.id}
            className={`p-4 border-2 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-md gap-2 transition-all duration-300 ${
              isPassed
                ? "bg-green-50 border-green-400 hover:bg-green-100"
                : "bg-red-50 border-red-400 hover:bg-red-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <User
                className={`w-5 h-5 ${
                  isPassed ? "text-green-600" : "text-red-600"
                }`}
              />
              <span className="font-semibold text-gray-800">
                {r.full_name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle
                className={`w-5 h-5 ${
                  isPassed ? "text-green-600" : "text-red-600"
                }`}
              />
              <span className="text-gray-700">
                {r.score} / {r.total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600 text-sm">
                {new Date(r.date).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isPassed ? (
                <SquareCheck className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
