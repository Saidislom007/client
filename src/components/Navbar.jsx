import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Test Platformasi</h1>
      <div className="flex gap-4">
        <Link to="/">Bosh sahifa</Link>
        <Link to="/test">Testni boshlash</Link>
      </div>
    </nav>
  );
}
