import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";

const AdminPanel: React.FC = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">Painel de Administração</h1>
            <p>Olá, {user?.username ?? "Convidado"}</p>

            <button
                onClick={handleLogout}
                className="mt-5 text-white bg-red-700 hover:bg-red-500 focus:ring-4
                           focus:outline-none focus:ring-red-300 font-medium rounded-lg
                           text-sm px-5 py-2.5 text-center"
            >
                Logout
            </button>

            <div className="grid grid-cols-2 gap-4 mt-5">
                <button onClick={() => navigate("/users")} className="bg-blue-500 hover:bg-blue-700 ...">Utilizadores</button>
                <button onClick={() => navigate("/authors")} className="bg-blue-500 hover:bg-blue-700 ...">Autores</button>
                <button onClick={() => navigate("/publishers")} className="bg-blue-500 hover:bg-blue-700 ...">Editoras</button>
                <button onClick={() => navigate("/categories")} className="bg-blue-500 hover:bg-blue-700 ...">Categorias</button>
            </div>
        </div>
    );
};

export default AdminPanel;