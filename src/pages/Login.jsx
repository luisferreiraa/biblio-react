import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode"; // Importa corretamente sem chaves {}

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(""); // Estado para erros

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reseta erro antes de tentar login

        try {
            const response = await fetch("http://localhost:9090/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Login falhou");
            }

            const data = await response.json();
            console.log("🔑 Token recebido:", data.token);

            const decodedToken = jwtDecode(data.token); // Decodifica o token
            console.log("🔓 Token decodificado:", decodedToken);

            if (!decodedToken.role) {
                throw new Error("Token inválido: 'role' não encontrado");
            }

            login({
                token: data.token,
                role: decodedToken.role, // Extrai o role corretamente
            });

            navigate("/dashboard"); // Redireciona após login
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError("Usuário ou senha incorretos"); // Define mensagem de erro para UI
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>} {/* Exibe erro se existir */}
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-2 border rounded mb-2"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
