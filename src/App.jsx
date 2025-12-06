import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Maximize2, Minimize2,Expand  } from "lucide-react";

import Home from "./pages/Home";
import TestApp from "./pages/TestPage";
import UserForm from "./pages/UserForm";
import AdminLogin from "./pages/AdminLogin";
import VerifyCode from "./pages/VerifyCode";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        alert(`Fullscreen xatolik: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="w-full h-screen relative bg-gray-50 overflow-auto">
      {/* 🔹 Fullscreen toggle button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-md hover:bg-white/40 text-gray-800 p-2 rounded-lg shadow-lg flex items-center gap-1 transition-all"
      >
        {document.fullscreenElement ? (
          <>
            <Expand className="w-7 h-7" /> Chiqish
          </>
        ) : (
          <>
            <Expand className="w-7 h-7" />
          </>
        )}
      </button>

      {/* 🔹 Browser Router va Routes */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestApp />} />
          <Route path="/re" element={<UserForm />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/verify" element={<VerifyCode />} />
           {/* <Route path="/d" element={<Dashboard />} /> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>

    </div>
  );
}
