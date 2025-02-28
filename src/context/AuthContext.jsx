import {createContext, useContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        if (!userData.role) {
            console.error("❌ ERRO: userData recebido não contém 'role'", userData);
        }
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);