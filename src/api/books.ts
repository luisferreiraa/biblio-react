// scr/api/books.ts

import {Book} from "../interfaces/book.ts";
import {BookResponse} from "../interfaces/bookResponse.ts";

const API_URL = "http://localhost:9090/api/books/";

// Buscar lista de livros
export const fetchBooks = async (): Promise<BookResponse> => {
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

        return await response.json() as BookResponse;
    } catch (error) {
        console.error("Erro ao buscar livros: ", error);
        throw error;
    }
};

// Adicionar um novo livro
export const addBook = async (
    title: string,
    authorsId: number[],
    publisherId: number,
    categoriesId: number[]
): Promise<Book> => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(
            {
                title: title,
                authorsId: authorsId,
                publisherId: publisherId,
                categoriesId: categoriesId
            }),
    });

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json() as Book;
};

// Remover um livro
export const deleteBook = async (bookId: number): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
    }

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