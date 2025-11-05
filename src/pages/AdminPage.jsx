import { useEffect, useState } from "react";
import AdminForm from "../components/AdminForm";
import AdminList from "../components/AdminList";
import UserList from "../components/UserList";
import ResultsList from "../components/ResultsList";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { ChevronUp, ChevronDown, Users, Award, NotepadTextIcon,LogOut } from "lucide-react";

export default function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [resultsStats, setResultsStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(10)
  const [userSearch, setUserSearch] = useState("");
  const [resultSearch, setResultSearch] = useState("");
  const [sortScoreAsc, setSortScoreAsc] = useState(true);
  const [userPage, setUserPage] = useState(1);
  const [resultsPage, setResultsPage] = useState(1);
  const itemsPerPage = 5;
  // 

  const navigate = useNavigate();
  const handleLogout = () => {
    // LocalStorage dan admin flag yoki tokenni o‘chiramiz
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("auth_token"); // agar JWT token saqlangan bo‘lsa

    // Browser cookie dan JWT token o‘chirish (agar cookie ishlatilsa)
    document.cookie = "auth_token=; Max-Age=0; path=/;";

    toast.success("Siz tizimdan chiqdingiz!");
    navigate("/"); // login yoki home page ga yo‘naltirish
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const [qRes, uRes, rRes, userStatsRes, resultsStatsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BC_URL}/questions`),
        fetch(`${import.meta.env.VITE_BC_URL}/users`),
        fetch(`${import.meta.env.VITE_BC_URL}/results`),
        fetch(`${import.meta.env.VITE_BC_URL}/stats/users`),
        fetch(`${import.meta.env.VITE_BC_URL}/stats/results`),
      ]);
      setQuestions(await qRes.json());
      setUsers(await uRes.json());
      setResults(await rRes.json());
      setUserStats(await userStatsRes.json());
      setResultsStats(await resultsStatsRes.json());
    } catch {
      toast.error("Ma’lumotlarni olishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddQuestion = async (newQuestion) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BC_URL}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setQuestions([...questions, data]);
      toast.success("Savol qo‘shildi!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BC_URL}/questions/${id}`, { method: "DELETE" });
      setQuestions(questions.filter((q) => q.id !== id));
      toast.success("Savol o‘chirildi!");
    } catch {
      toast.error("Savolni o‘chirishda xatolik!");
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BC_URL}/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User o‘chirildi!");
    } catch {
      toast.error("User o‘chirishda xatolik!");
    }
  };

  // 🔹 Filter + Sort
  const filteredUsers = users
    .filter(u =>
      u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone_number.includes(userSearch) ||
      u.id_card_number.includes(userSearch)
    )
    .slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);

  const filteredResults = results
    .filter(r => r.full_name.toLowerCase().includes(resultSearch.toLowerCase()))
    .sort((a, b) => sortScoreAsc ? a.score - b.score : b.score - a.score)
    .slice((resultsPage - 1) * itemsPerPage, resultsPage * itemsPerPage);

  if (loading) return <p className="text-center mt-20">Yuklanmoqda...</p>;

  const totalUserPages = Math.ceil(
    users.filter(u =>
      u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone_number.includes(userSearch) ||
      u.id_card_number.includes(userSearch)
    ).length / itemsPerPage
  );

  const totalResultsPages = Math.ceil(
    results.filter(r => r.full_name.toLowerCase().includes(resultSearch.toLowerCase())).length / itemsPerPage
  );

  // 🔹 Pie chart ranglari
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2"><Users className="w-8 h-8" /> Smart Coders Academy - Admin Panel</h1>
      <button
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 text-white py-2 px-4 border-black border-2 border-b-5 border-r-5 rounded-2xl font-semibold mb-6"
        onClick={() => navigate("/test")}
      >
        <NotepadTextIcon className="w-4 h-4" />
        Test Rejiminiga Kirish
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 border-black border-2 border-b-5 border-r-5 rounded-2xl mt-2 md:mt--10 ml-270"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* 🔹 Savollar */}
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Savollar</h2>
        <AdminForm onAdd={handleAddQuestion} />
        <AdminList questions={questions} onDelete={handleDeleteQuestion} />


      </section>

      {/* 🔹 Charts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Line Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Users className="w-5 h-5" /> Foydalanuvchilar trendlari</h3>
          <LineChart width={300} height={200} data={userStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>

        {/* Results Bar Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Award className="w-5 h-5" /> Natijalar taqsimoti</h3>
          <BarChart width={300} height={200} data={resultsStats.scoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="scoreRange" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Results Pie Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Award className="w-5 h-5" /> To‘g‘ri javoblar foizi</h3>
          <PieChart width={300} height={200}>
            <Pie
              data={resultsStats.correctIncorrect}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {resultsStats.correctIncorrect.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </section>

      {/* 🔹 Foydalanuvchilar */}
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Foydalanuvchilar</h2>
        <input
          type="text"
          placeholder="Foydalanuvchi qidiring..."
          value={userSearch}
          onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }}
          className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <UserList users={filteredUsers} onDelete={handleDeleteUser} />
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: totalUserPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setUserPage(i + 1)}
              className={`px-3 py-1 border rounded ${userPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* 🔹 Natijalar */}
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          Natijalar
          <button
            onClick={() => setSortScoreAsc(!sortScoreAsc)}
            className="p-1 border rounded flex items-center gap-1 text-gray-700 hover:bg-gray-200 ml-2"
          >
            {sortScoreAsc ? <ChevronUp className="w-4 h-6" /> : <ChevronDown className="w-4 h-6" />} Score
          </button>
        </h2>
        <input
          type="text"
          placeholder="Natijalarni qidiring..."
          value={resultSearch}
          onChange={(e) => { setResultSearch(e.target.value); setResultsPage(1); }}
          className="w-full mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <ResultsList results={filteredResults} />
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: totalResultsPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setResultsPage(i + 1)}
              className={`px-3 py-1 border rounded ${resultsPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
