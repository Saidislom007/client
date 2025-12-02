import { User, Phone, CreditCard, Trash2 } from "lucide-react";

export default function UserList({ users = [], onDelete = () => {} }) {
  return (
    <ul className="space-y-3">
      {Array.isArray(users) && users.length > 0 ? (
        users.map((u) => {
          const fullName = u?.full_name || "Ism mavjud emas";
          const phone = u?.phone_number || "Telefon mavjud emas";
          const idCard = u?.id_card_number || "ID karta mavjud emas";

          return (
            <li
              key={u?.id || Math.random()}
              className="p-4 border-2 border-b-5 border-r-5 rounded-2xl bg-white shadow-md flex flex-col space-y-2"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-800">{fullName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{idCard}</span>
              </div>

              <button
                onClick={() => onDelete(u?.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 border-black border-2 border-b-5 border-r-5 rounded-2xl w-40"
              >
                <Trash2 className="w-4 h-4" />
                O‘chirish
              </button>
            </li>
          );
        })
      ) : (
        <p className="text-gray-600 text-sm">Foydalanuvchilar mavjud emas</p>
      )}
    </ul>
  );
}
