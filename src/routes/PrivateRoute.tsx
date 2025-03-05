// src/routes/PrivateRoute.jsx

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth} from "../context/AuthContext.tsx";
import React from "react";

// Tipando as props do componente
interface PrivateRouteProps {
    allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
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