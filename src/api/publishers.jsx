const API_URL = 'http://localhost:9090/api/publishers/';

export const fetchPublishers = async () => {
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
        console.error("Erro ao buscar editoras: ", error);
        throw error;
    }
};