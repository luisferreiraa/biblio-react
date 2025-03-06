// src/api/authors.ts

import {Author} from "../interfaces/author.ts";
import {AuthorResponse} from "../interfaces/authorResponse.ts";
import axiosInstance from "./axiosInstance.ts";

const API_URL = 'http://localhost:9090/api/authors/';

// Buscar lista de autores
export const fetchAuthors = async (): Promise<AuthorResponse> => {
    try {
        const { data } = await axiosInstance.get<AuthorResponse>("authors/");
        return data;
    } catch (error) {
        console.error("Erro ao buscar autores: ", error);
        throw error;
    }
};

// Adicionar um novo autor
export const addAuthor = async (name: string): Promise<Author> => {
    try {
        const { data } = await axiosInstance.post<Author>("authors/", {name},
        );
        return data;
    } catch (error) {
        console.error("Erro ao adicionar novo autor: ", error);
        throw error;
    }
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