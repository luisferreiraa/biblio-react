import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import {jwtDecode} from "jwt-decode";
import LoadingSpinner from "./LoadingSpinner.jsx";
import {DecodedToken} from "../interfaces/decodedToken.ts";
import {User} from "../interfaces/user.ts"; // Importar a interface User

type FormData = {
    username: string;
    password: string;
};

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({username: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let logo: string | undefined = 'src/assets/logo.png';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:9090/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
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

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="h-13 mb-2" src={logo} alt="logo"/>
                </a>
                <span className="mb-5 text-xl font-regular text-gray-600" style={{fontFamily: "'Poppins', sans-serif"}}>BIBLIO.Gest</span>
                <div
                    className="w-full bg-slate-100 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                            Faz login na tua conta
                        </h1>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="username"
                                       className="block mb-2 text-sm font-medium text-gray-600">
                                    Utilizador
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Utilizador"
                                    value={formData.username}
                                    onChange={handleChange}
                                    // className="bg-white border border-slate-300 text-gray-900 rounded-lg focus:ring-red-200 focus:border-red-300 block w-full p-2.5 dark:bg-slate-200 dark:border-slate-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-200 dark:focus:border-red-300"
                                    className="bg-white border border-slate-300 text-gray-900 rounded-lg focus:ring-red-200 focus:border-red-300 focus:outline-none block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-600">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    // className="bg-white border border-slate-300 text-gray-900 rounded-lg focus:ring-red-200 focus:border-red-300 block w-full p-2.5 dark:bg-slate-200 dark:border-slate-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-200 dark:focus:border-red-300"
                                    className="bg-white border border-slate-300 text-gray-900 rounded-lg focus:ring-red-200 focus:border-red-300 focus:outline-none block w-full p-2.5"
                                    required
                                />
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-red-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
