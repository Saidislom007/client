import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isAdmin") === "true") {
            navigate("/admin");
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "1234") {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            setError("Username yoki password xato!");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}> <h2>Admin Login</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}> <User />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /> </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}> <Lock />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /> </div> <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>} </form> </div>
    );
}
