import { useNavigate } from "react-router-dom";

export default function ResultPage({ score, total }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold mb-4">Test Natijasi</h2>
      <p className="text-lg mb-4">To‘g‘ri javoblar: {score} / {total}</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded font-semibold"
        onClick={() => navigate("/test")}
      >
        Testni qayta boshlash
      </button>
    </div>
  );
}
