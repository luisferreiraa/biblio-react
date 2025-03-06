// scr/api/books.ts
import {Book} from "../interfaces/book.ts";
import {BookResponse} from "../interfaces/bookResponse.ts";
import axiosInstance from "./axiosInstance.ts";
import {BookByIdResponse} from "../interfaces/bookByIdResponse.ts";

// Buscar lista de livros
export const fetchBooks = async (): Promise<BookResponse> => {
    try {
        const { data } = await axiosInstance.get<BookResponse>("books/");
        return data;
    } catch(error) {
        console.error("Erro ao buscar livros: ", error);
        throw error;
    }
};

// Buscar um livro pelo id
export const fetchBookById = async (bookId: number): Promise<BookByIdResponse> => {
    try {
        const { data } = await axiosInstance.get<BookByIdResponse>(`books/${bookId}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar livro: ", error);
        throw error;
    }
};

// Adicionar um novo livro
export const addBook = async (
    title: string,
    authorsId: number[],
    publisherId: number,
    categoriesId: number[],
): Promise<Book> => {
    try {
        const { data } = await axiosInstance.post<Book>("books/", { title, authorsId, publisherId, categoriesId });
        return data;
    } catch (error) {
        console.error("Erro ao adicionar novo livro: ", error);
        throw error;
    }
};

// Remover um livro
export const deleteBook = async (bookId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`books/${bookId}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover livro: ", error);
        throw error;
    }
};