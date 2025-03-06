import { useState, useEffect } from "react";
import {fetchBooks, addBook, deleteBook, fetchBookById} from "../api/books.ts";
import { useAuth } from "../context/AuthContext.tsx";
import {Book} from "../interfaces/book.ts";
import {BookByIdResponse} from "../interfaces/bookByIdResponse.ts";

export const useBooks = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState<Book[]>([]);
    const [book, setBook] = useState<BookByIdResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingBook, setAddingBook] = useState<boolean>(false);

    useEffect(() => {
      if (user?.token) {
          loadBooks();
      }
    }, [user]);

    // Função para carregar os livros
    const loadBooks = async () => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await fetchBooks();

            // Verifica se há livros retornados
            if (data) {
                setBooks(data.content);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Função para carregar um livro específico
    const loadBook = async (bookId: number) => {
        if (!user?.token) return;

        setLoading(true);
        setError(null);
        setBook(null); // Evita exibição de dados antigos enquanto carrega um novo

        try {
            const data = await fetchBookById(bookId);
            setBook(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Função para remover livro
    const removeBook = async (bookId: number) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        try {
            const success = await deleteBook(bookId);
            if (success) {
                setBooks((prev) => prev.filter((book) => book.id !== bookId));
            } else {
                setError("Erro ao remover livro.")
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para criar livro
    const createBook = async (title: string, authorsId: number[], publisherId: number, categoriesId: number[]) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        if (!title.trim()) {
            setError("O título do livro não pode estar vazio.");
            return;
        }

        if (!authorsId.length) {
            setError("Pelo menos um autor deve ser selecionado.")
            return;
        }

        if (!publisherId) {
            setError("A editora deve ser selecionada.");
            return;
        }

        if (!categoriesId.length) {
            setError("Pelo menos uma categoria deve ser selecionada.")
            return;
        }

        setAddingBook(true);

        try {
            const newBook = await addBook(title, authorsId, publisherId, categoriesId);
            setBooks((prev) => [...prev, newBook]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingBook(false);
        }
    };

    return { books, book, error, loading, addingBook, createBook, reload: loadBooks, loadBook, removeBook };
}