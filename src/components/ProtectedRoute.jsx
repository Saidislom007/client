import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp > now && decoded.role === "admin") {
        setIsValid(true);
      } else {
        localStorage.removeItem("auth_token");
        setIsValid(false);
      }
    } catch {
      localStorage.removeItem("auth_token");
      setIsValid(false);
    }
  }, []);

  if (isValid === null) {
    return <div className="min-h-screen flex items-center justify-center">Tekshirilmoqda...</div>;
  }

  return isValid ? children : <Navigate to="/admin-login" replace />;
}
