import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


export default function UserForm() {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [id_card_number, setIdCardNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null); // OnlineTracker uchun

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!full_name || !phone_number || !id_card_number) {
      return toast.error("Iltimos barcha maydonlarni to‘ldiring!");
    }

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BC_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, phone_number, id_card_number }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xatolik yuz berdi");

      // Foydalanuvchi ma’lumotlarini localStorage va state ga saqlash
      const userData = { full_name, id: id_card_number };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      toast.success("Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!");
      // User ID bilan test sahifasiga yuborish
      navigate(`/test?user=${id_card_number}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Agar foydalanuvchi allaqachon localStorage da bo‘lsa, OnlineTracker ishga tushadi
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg transition-all border-2 border-b-5 border-r-5">
      {/* OnlineTracker */}
      

      <h2 className="text-2xl font-semibold text-center mb-4">
        Foydalanuvchi Ro‘yxatdan O‘tish
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="To‘liq ism"
          className="w-full p-3 border-2 border-b-5 border-r-5 rounded-2xl"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefon raqam"
          className="w-full p-3 border-2 border-b-5 border-r-5 rounded-2xl"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID karta raqami"
          className="w-full p-3 border-2 border-b-5 border-r-5 rounded-2xl"
          value={id_card_number}
          onChange={(e) => setIdCardNumber(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold p-3 border-black border-2 border-b-5 border-r-5 rounded-2xl ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Yuklanmoqda..." : "Ro‘yxatdan o‘tish"}
        </button>
      </form>
    </div>
  );
}
