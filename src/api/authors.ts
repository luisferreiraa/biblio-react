// src/api/authors.ts

import {Author} from "../interfaces/author.ts";
import {AuthorResponse} from "../interfaces/authorResponse.ts";    // Define a estrutura dos dados que a API retorna

const API_URL = 'http://localhost:9090/api/authors/';

// Buscar lista de autores
export const fetchAuthors = async (): Promise<AuthorResponse | void> => {     // Agora a função retorna um tipo específico
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

        return await response.json() as AuthorResponse;
    } catch (error) {
        console.error("Erro ao buscar autores: ", error);
        throw error;
    }
};

// Adicionar um novo autor
export const addAuthor = async (name: string): Promise<Author> => {

    const token = localStorage.getItem("token"); // Obtém o token do localStorage

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        throw new Error("Token não encontrado.");
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

    return await response.json() as Author;
};

// Remover um autor
export const deleteAuthor = async (authorId: number): Promise<boolean> => {

    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        throw new Error("Token não encontrado.");
    }

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