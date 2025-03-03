import { useState, useEffect } from "react";
import { fetchBooks, addBook, deleteBook } from "../api/books.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const useBooks = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingBook, setAddingBook] = useState(false);

    useEffect(() => {
      if (user) {
          loadBooks();
      }
    }, [user]);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await fetchBooks(user.token);
            setBooks(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeBook = async (bookId) => {
        try {
            await deleteBook(bookId, user.token);
            setBooks((prev) => prev.filter((book) => book.id !== bookId));
        } catch (err) {
            setError(err.message);
        }
    };

    const createBook = async (title) => {
        if (!title.trim()) {
            setError("O título do livro não pode estar vazio.");
            return;
        }

        setAddingBook(true);

        try {
            const newBook = await addBook(title, user.token);
            setBooks((prev) => [...prev, newBook]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingBook(false);
        }
    };

    return { books, error, loading, addingBook, createBook, reload: loadBooks, removeBook };
}