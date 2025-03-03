const API_URL = "http://localhost:9090/api/books/";

export const fetchBooks = async () => {
    const token = localStorage.getItem("token");

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
        console.error("Erro ao buscar livros: ", error);
        throw error;
    }
};

export const addBook = async (title) => {

    const token = localStorage.getItem("token");

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
        body: JSON.stringify({ title: title }),
    });

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
};

export const deleteBook = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_URL}${bookId}`, {
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
        console.error("Erro ao buscar livros: ", error);
        throw error;
    }
};