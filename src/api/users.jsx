const API_URL = 'http://localhost:9090/api/users/';

export const fetchUsers = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.")
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar utilizadores: ", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Token não encontrado. Faça login novamente.")
        return;
    }

    try {
        const response = await fetch(`${API_URL}${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error("Erro ao buscar utilizadores: ", error);
        throw error;
    }
};