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
        <div className="bg-white text-gray-600 min-h-screen flex flex-col items-center justify-center">
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
        </div>
    );
};

export default AdminPanel;