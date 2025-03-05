// src/hooks/useAuthors.ts

import {useState, useEffect} from "react";
import {fetchAuthors, addAuthor, deleteAuthor} from "../api/authors.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {Author} from "../interfaces/author.ts";

export const useAuthors = () => {
    const {user} = useAuth();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingAuthor, setAddingAuthor] = useState<boolean>(false);

    useEffect(() => {
        if (user?.token) {
            loadAuthors();
        }
    }, [user]);

    // Função para carregar os autores
    const loadAuthors = async () => {
        if (!user?.token) {
            setError("Utilizador não autenticado.")
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await fetchAuthors();

            // Verifica se há autores retornados
            if (data) {
                setAuthors(data.content);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Função para remover um autor
    const removeAuthor = async (authorId: number) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        try {
            const success = await deleteAuthor(authorId);
            if (success) {
                setAuthors((prev) => prev.filter((author) => author.id !== authorId));
            } else {
                setError("Erro ao remover autor.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para criar novo autor
    const createAuthor = async (name: string) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        if (!name.trim()) {
            setError("O nome do autor não pode estar vazio.");
            return;
        }

        setAddingAuthor(true);

        try {
            const newAuthor = await addAuthor(name);
            setAuthors((prev) => [...prev, newAuthor]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingAuthor(false);
        }
    };

    return {authors, error, loading, removeAuthor, createAuthor, addingAuthor, reload: loadAuthors};
}