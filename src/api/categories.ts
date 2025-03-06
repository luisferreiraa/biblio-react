// src/api/categories.ts
import {Category} from "../interfaces/category.ts";
import {CategoryResponse} from "../interfaces/categoryResponse.ts";
import axiosInstance from "./axiosInstance.ts";

// Buscar lista de categorias
export const fetchCategories = async (): Promise<CategoryResponse> => {
    try {
        const { data } = await axiosInstance.get<CategoryResponse>("categories/");
        return data;
    } catch (error) {
        console.error("Erro ao buscar categorias: ", error);
        throw error;
    }
};

// Adicionar uma nova categoria
export const addCategory = async (name: string): Promise<Category> => {
    try {
        const { data } = await axiosInstance.post<Category>("categories/", {name});
        return data;
    } catch (error) {
        console.error("Erro ao adicionar categoria: ", error);
        throw error;
    }
};

// Remover uma categoria
export const deleteCategory = async (categoryId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`categories/${categoryId}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover categoria: ", error);
        throw error;
    }
};