// src/api/category.ts

import {Category} from "../interfaces/category.ts";
import {CategoryResponse} from "../interfaces/categoryResponse.ts";

const API_URL = 'http://localhost:9090/api/categories/';

// Buscar lista de categorias
export const fetchCategories = async (): Promise<CategoryResponse | void> => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.")
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

        return await response.json() as CategoryResponse;
    } catch (error) {
        console.error("Erro ao buscar categorias: ", error);
        throw error;
    }
};

// Adicionar uma nova categoria
export const addCategory = async (name: string): Promise<Category> => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        throw new Error("Token não encontrado.")
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

    return await response.json() as Category;
};

// Remover uma categoria
export const deleteCategory = async (categoryId: number): Promise<boolean> => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        throw new Error("Token não encontrado.");
    }

    try {
        const response = await fetch(`${API_URL}${categoryId}`, {
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
        console.error("Erro ao buscar categorias: ", error);
        throw error;
    }
};