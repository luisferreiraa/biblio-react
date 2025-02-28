import { Navigate, Outlet } from 'react-router-dom'
import { useAuth} from "../context/AuthContext.jsx";

// const PrivateRoute = ({ allowedRoles }) => {
//     const { user } = useAuth();
//
//     console.log("🔍 Utilizador logado:", user); // Verifica o estado do user
//
//     if (!user || !user.role) {
//         console.warn("⚠️ Redirecionado para login porque user ou role está indefinido");
//         return <Navigate to="/login" />;
//     }
//
//     return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/unauthorized" />;
// };
//
// export default PrivateRoute;

const PrivateRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    // Se estiver carregando, não redirecionamos imediatamente
    if (loading) {
        return <div>Carregando...</div>; // Ou outro componente de loading
    }

    console.log("🔍 Utilizador logado:", user); // Verifica o estado do user

    if (!user || !user.role) {
        console.warn("⚠️ Redirecionado para login porque user ou role está indefinido");
        return <Navigate to="/login" />;
    }

    // Se o role do user não estiver na lista de allowedRoles, redirecione para a página de não autorizado
    return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;