const API_URL = 'http://localhost:9090/api/authors/';

export const fetchAuthors = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
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
        console.error("Erro ao buscar autores: ", error);
        throw error;
    }
};

export const addAuthor = async (name) => {

    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
    });

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
};

export const deleteAuthor = async (authorId) => {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}${authorId}`, {
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
        console.error("Erro ao buscar autores: ", error);
        throw error;
    }
};