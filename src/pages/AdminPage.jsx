import { useEffect, useState } from "react";
import AdminForm from "../components/AdminForm";
import AdminList from "../components/AdminList";
import UserList from "../components/UserList";
import ResultsList from "../components/ResultsList";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Users, NotepadTextIcon, LogOut } from "lucide-react";

export default function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  the [resultSearch, setResultSearch] = useState("");
  const [sortScoreAsc, setSortScoreAsc] = useState(true);

  const [userPage, setUserPage] = useState(1);
  const [resultsPage, setResultsPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("auth_token");
    document.cookie = "auth_token=; Max-Age=0; path=/;";
    toast.success("Siz tizimdan chiqdingiz!");
    navigate("/");
  };

  // 🔹 Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);

      const [qRes, uRes, rRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BC_URL}/questions`),
        fetch(`${import.meta.env.VITE_BC_URL}/users`),
        fetch(`${import.meta.env.VITE_BC_URL}/results`)
      ]);

      setQuestions(await qRes.json());
      setUsers(await uRes.json());
      setResults(await rRes.json());
    } catch {
      toast.error("Ma’lumotlarni olishda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Add Question
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

  // 🔹 Delete Question
  const handleDeleteQuestion = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BC_URL}/questions/${id}`, { method: "DELETE" });
      setQuestions(questions.filter(q => q.id !== id));
      toast.success("Savol o‘chirildi!");
    } catch {
      toast.error("Savolni o‘chirishda xatolik!");
    }
  };

  // 🔹 Delete User
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_BC_URL}/users/${id}`, { method: "DELETE" });
      setUsers(users.filter(u => u.id !== id));
      toast.success("User o‘chirildi!");
    } catch {
      toast.error("Userni o‘chirishda xatolik!");
    }
  };

  // 🔹 Filter + Pagination fix (undefined check qo‘shilgan)
  const filteredUsers = users
    .filter(u =>
      (u.full_name ?? "").toLowerCase().includes((userSearch ?? "").toLowerCase()) ||
      (u.phone_number ?? "").includes(userSearch) ||
      (u.id_card_number ?? "").includes(userSearch)
    )
    .slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);

  const filteredResults = results
    .filter(r =>
      (r.full_name ?? "").toLowerCase().includes((resultSearch ?? "").toLowerCase())
    )
    .sort((a, b) => sortScoreAsc ? a.score - b.score : b.score - a.score)
    .slice((resultsPage - 1) * itemsPerPage, resultsPage * itemsPerPage);

  if (loading) return <p className="text-center mt-20">Yuklanmoqda...</p>;

  const totalUserPages = Math.ceil(
    users.filter(u =>
      (u.full_name ?? "").toLowerCase().includes((userSearch ?? "").toLowerCase())
    ).length / itemsPerPage
  );

  const totalResultsPages = Math.ceil(
    results.filter(r =>
      (r.full_name ?? "").toLowerCase().includes((resultSearch ?? "").toLowerCase())
    ).length / itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 space-y-8">

      <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <Users className="w-8 h-8" />
        Smart Coders Academy - Admin Panel
      </h1>

      <button
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 border-black border-2 rounded-2xl font-semibold"
        onClick={() => navigate("/test")}
      >
        <NotepadTextIcon className="w-4 h-4" />
        Test Rejimi
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 border-black border-2 rounded-2xl"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* 🔹 SAVOLLAR */}
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Savollar</h2>
        <AdminForm onAdd={handleAddQuestion} />
        <AdminList questions={questions} onDelete={handleDeleteQuestion} />
      </section>

      {/* 🔹 USERS */}
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Foydalanuvchilar</h2>

        <input
          type="text"
          placeholder="Foydalanuvchi qidiring..."
          value={userSearch}
          onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }}
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
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

      {/* 🔹 RESULTS */}
      <section className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Natijalar</h2>

        <div className="flex gap-5">
          <button className="p-2 border-2 border-b-5 border-r-5 rounded-2xl bg-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <Link to={"https://docs.google.com/spreadsheets/d/17HZATBfmifUVaEMU94IHZi4iheVStEzuMhurnC76BAY/edit?gid=0#gid=0"}>See Sheets</Link>
          </button>

          <button
            onClick={() => setSortScoreAsc(!sortScoreAsc)}
            className="p-1 border rounded text-gray-700 hover:bg-gray-200 mb-2"
          >
            {sortScoreAsc ? "Score ↑" : "Score ↓"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Natijalarni qidiring..."
          value={resultSearch}
          onChange={(e) => {
            setResultSearch(e.target.value);
            setResultsPage(1);
          }}
          className="w-full mb-2 p-2 border border-gray-300 rounded-md"
        />

        <ResultsList results={filteredResults} />

        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: totalResultsPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setResultsPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                resultsPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
