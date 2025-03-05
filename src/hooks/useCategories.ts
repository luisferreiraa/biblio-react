// src/hooks/useCategories.ts

import { useState, useEffect } from "react";
import { fetchCategories, addCategory, deleteCategory } from "../api/categories.ts";
import { useAuth } from "../context/AuthContext.tsx";
import {Category} from "../interfaces/category.ts";

export const useCategories = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingCategory, setAddingCategory] = useState<boolean>(false);

    // Efeito para carregar as categorias sempre que o utilizador mudar
    useEffect(() => {
        if (user?.token) {      // Verifica se o utilizador está autenticado
            loadCategories();
        }
    }, [user]);

    // Função para carregar as categorias
    const loadCategories = async () => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await fetchCategories();

            if (data) {
                setCategories(data.content);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Função para remover uma categoria
    const removeCategory = async (categoryId: number) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        try {
            await deleteCategory(categoryId);
            setCategories((prev) => prev.filter((category) => category.id !== categoryId));
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para adicionar uma nova categoria
    const createCategory = async (name: string) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        if (!name.trim()) {
            setError("O nome da categoria não pode estar vazio.")
            return;
        }

        setAddingCategory(true);

        try {
            const newCategory = await addCategory(name);
            setCategories((prev) => [...prev, newCategory]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingCategory(false);
        }
    };

    return { categories, error, loading, removeCategory, createCategory, addingCategory, reload: loadCategories };
}