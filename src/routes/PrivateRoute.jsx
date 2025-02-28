import { Navigate, Outlet } from 'react-router-dom'
import { useAuth} from "../context/AuthContext.jsx";

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    console.log("🔍 Utilizador logado:", user); // Verifica o estado do user

    if (!user || !user.role) {
        console.warn("⚠️ Redirecionado para login porque user ou role está indefinido");
        return <Navigate to="/login" />;
    }

    return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;