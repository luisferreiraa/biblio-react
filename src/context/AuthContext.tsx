// src/context/AuthContext.tsx

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {AuthContextType} from "../interfaces/authContextType.ts";
import {User} from "../interfaces/user.ts";

// Criar o contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definição das props do AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Provedor de Autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser?.role) {
                    setUser(parsedUser);
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao processar o usuário do localStorage:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
            }
        }
        setLoading(false);
    }, []);



    const login = (userData: User, token: string) => {
        if (!userData.role) {
            console.error("❌ ERRO: userData recebido não contém 'role'", userData);
            return;
        }

        // Armazenar o token no localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData); // Armazenar o estado do usuário
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto de autenticação
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
