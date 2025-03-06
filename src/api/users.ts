// src/api/users.ts
import {User} from "../interfaces/user.ts";
import {UserResponse} from "../interfaces/userResponse.ts";
import axiosInstance from "./axiosInstance.ts";

// Buscar lista de utilizadores
export const fetchUsers = async (): Promise<UserResponse> => {
    try {
        const { data } = await axiosInstance.get<UserResponse>("users/");
        return data;
    } catch (error) {
        console.error("Erro ao buscar utilizadores: ", error);
        throw error;
    }
};

// Adicionar um novo utilizador
export const addUser = async (username: string, password: string, role: string): Promise<User> => {
    try {
        const { data } = await axiosInstance.post<User>("users/", { username, password, role });
        return data;
    } catch (error) {
        console.error("Erro ao adicionar novo utilizador: ", error);
        throw error;
    }
};

// Remover um utilizador
export const deleteUser = async (userId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`users/${userId}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover utilizador: ", error);
        throw error;
    }
};