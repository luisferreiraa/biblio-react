import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Indica se a aplicação está carregando

    // // Ao carregar a aplicação, verifique se o token já está presente
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const decodedUser = JSON.parse(localStorage.getItem("user"));
    //         setUser(decodedUser); // Armazenar o usuário no estado
    //     }
    //     setLoading(false); // Termina o loading após verificar o token
    // }, []);

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



    const login = (userData, token) => {
        if (!userData.role) {
            console.error("❌ ERRO: userData recebido não contém 'role'", userData);
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

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);
