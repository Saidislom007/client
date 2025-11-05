import { User, Phone, CreditCard,Trash2 } from "lucide-react";

export default function UserList({ users , onDelete}) {
  return (
    <ul className="space-y-3">
      {users.map((u) => (
        <li
          key={u.id}
          className="p-4 border-2 border-b-5 border-r-5 rounded-2xl bg-white shadow-md flex flex-col space-y-2"
        >
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-800">{u.full_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{u.phone_number}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">{u.id_card_number}</span>
          </div>
          <button
                onClick={() => onDelete(u.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 border-black border-2 border-b-5 border-r-5 rounded-2xl mt-2 md:mt-0 w-40   "
              >
                <Trash2 className="w-4 h-4" />
                O‘chirish
              </button>
        </li>
      ))}
    </ul>
  );
}

