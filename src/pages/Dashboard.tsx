import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p>Bem-vindo, {user?.role}</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;