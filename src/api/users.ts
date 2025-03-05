// src/api/users.ts

import {User} from "../interfaces/user.ts";
import {UserResponse} from "../interfaces/userResponse.ts";

const API_URL = 'http://localhost:9090/api/users/';

// Buscar lista de utilizadores
export const fetchUsers = async (): Promise<UserResponse | void> => {
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

        return await response.json() as UserResponse;
    } catch (error) {
        console.error("Erro ao buscar utilizadores: ", error);
        throw error;
    }
};

// Adicionar um novo utilizador
export const addUser = async (username: string, password: string, role: string): Promise<User> => {

    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.")
        throw new Error("Token não encontrado.");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ username: username, password: password, role: role }),
    });

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json() as User;
};

// Remover um utilizador
export const deleteUser = async (userId: number): Promise<boolean> => {

    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.")
        throw new Error("Token não encontrado.");
    }

    try {
        const response = await fetch(`${API_URL}${userId}`, {
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
        console.error("Erro ao buscar utilizadores: ", error);
        throw error;
    }
};