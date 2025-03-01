import { useState, useEffect } from "react";
import { fetchCategories, addCategory, deleteCategory } from "../api/categories.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const useCategories = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingCategory, setAddingCategory] = useState(false);

    useEffect(() => {
        if (user) {
            loadCategories();
        }
    }, [user]);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await fetchCategories(user.token);
            setCategories(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId, user.token);
            setCategories((prev) => prev.filter((category) => category.id !== categoryId));
        } catch (err) {
            setError(err.message);
        }
    };

    const createCategory = async (name) => {
        if (!name.trim()) {
            setError("O nome da categoria não pode estar vazio.")
            return;
        }

        setAddingCategory(true);
        try {
            const newCategory = await addCategory(name, user.token);
            setCategories((prev) => [...prev, newCategory]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingCategory(false);
        }
    };

    return { categories, error, loading, removeCategory, createCategory, addingCategory, reload: loadCategories };
}