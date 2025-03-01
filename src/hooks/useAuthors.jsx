import { useState, useEffect } from "react";
import { fetchAuthors, addAuthor, deleteAuthor } from "../api/authors.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const useAuthors = () => {
    const { user } = useAuth();
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingAuthor, setAddingAuthor] = useState(false);

    useEffect(() => {
        if (user) {
            loadAuthors();
        }
    }, [user]);

    const loadAuthors = async () => {
        try {
            setLoading(true);
            const data = await fetchAuthors(user.token);
            setAuthors(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeAuthor = async (authorId) => {
        try {
            await deleteAuthor(authorId, user.token);
            setAuthors((prev) => prev.filter((author) => author.id !== authorId));
        } catch (err) {
            setError(err.message);
        }
    };

    const createAuthor = async (name) => {
        if (!name.trim()) {
            setError("O nome do autor não pode estar vazio.");
            return;
        }

        setAddingAuthor(true);

        try {
            const newAuthor = await addAuthor(name, user.token);
            setAuthors((prev) => [...prev, newAuthor]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingAuthor(false);
        }
    };

    return { authors, error, loading, removeAuthor, createAuthor, addingAuthor, reload: loadAuthors };

}