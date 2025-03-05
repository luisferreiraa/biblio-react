import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { DecodedToken } from "../interfaces/decodedToken.ts";
import { User } from "../interfaces/user.ts"; // Importar a interface User

type FormData = {
    username: string;
    password: string;
};

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:9090/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login falhou");
            }

            const data = await response.json();
            console.log("🔑 Token recebido:", data.token);

            const decodedToken = jwtDecode<DecodedToken>(data.token); // Tipando o token
            console.log("🔓 Token decodificado:", decodedToken);

            if (!decodedToken.role) {
                throw new Error("Token inválido: 'role' não encontrado");
            }

            // Converter id para número (ou usar 0 como valor padrão)
            const userData: User = {
                username: formData.username,
                role: decodedToken.role,
                token: data.token,
                id: Number(decodedToken.id) || 0,  // Converte para número, ou usa 0 como valor padrão
            };

            // Chamar o login com o objeto correto
            login(userData, data.token);

            if (decodedToken.role === "ADMIN") {
                navigate("/admin");
            } else if (decodedToken.role === "USER") {
                navigate("/dashboard");
            } else {
                setError("Acesso negado.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError(error.message || "Utilizador ou password incorretos");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-20 h-20" src="https://icons.veryicon.com/png/o/education-technology/blue-gray-solid-blend-icon/book-157.png"
                         alt="logo"/>
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Faz login na tua conta
                        </h1>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Utilizador
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Utilizador"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
