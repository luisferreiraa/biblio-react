// src/api/authors.ts
import {Author} from "../interfaces/author.ts";
import {AuthorResponse} from "../interfaces/authorResponse.ts";
import axiosInstance from "./axiosInstance.ts";
import {AuthorByIdResponse} from "../interfaces/authorByIdResponse.ts";

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

// Buscar um autor pelo id
export const fetchAuthorById = async (authorId: number): Promise<AuthorByIdResponse> => {
    try {
        const { data } = await axiosInstance.get<AuthorByIdResponse>(`authors/${authorId}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar autor: ", error);
        throw error;
    }
};

// Adicionar um novo autor
export const addAuthor = async (name: string): Promise<Author> => {
    try {
        const { data } = await axiosInstance.post<Author>("authors/", { name });
        return data;
    } catch (error) {
        console.error("Erro ao adicionar novo autor: ", error);
        throw error;
    }
};

// Remover um autor
export const deleteAuthor = async (authorId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`authors/${authorId}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover autor: ", error);
        throw error;
    }
};