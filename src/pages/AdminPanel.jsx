import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Painel de Administração</h1>
            <p>Bem-vindo, {user?.role}</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4">
                Logout
            </button>
        </div>
    );
};

export default AdminPanel;