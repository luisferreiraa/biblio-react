// src/hooks/useUsers.ts

import { useState, useEffect } from 'react';
import {fetchUsers, deleteUser, addUser} from "../api/users.ts";
import { useAuth } from "../context/AuthContext.tsx";
import {User} from "../interfaces/user.ts";

export const useUsers = () => {
    const  { user } = useAuth();
    const [ users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingUser, setAddingUser] = useState<boolean>(false);

    useEffect(() => {
        if (user?.token) {
            loadUsers();
        }
    }, [user]);

    // Função para carregar os utilizadores
    const loadUsers = async () => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await fetchUsers();

            if (data) {
                setUsers(data.content);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Função para remover um utilizador
    const removeUser = async (userId: number) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        try {
            const success = await deleteUser(userId);
            if (success) {
                setUsers((prev) => prev.filter((user) => user.id !== userId));
            } else {
                setError("Erro ao remover utilizador.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para criar novo utilizador
    const createUser = async (username: string, password: string, role: string) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        if (!username.trim()) {
            setError("O username não pode estar vazio.");
            return;
        }

        if (!password.trim()) {
            setError("A password não pode estar vazia.");
            return;
        }

        if (!role.trim()) {
            setError("O role não pode estar vazio.");
            return;
        }

        setAddingUser(true);

        try {
            const newUser = await addUser(username, password, role);
            setUsers((prev) => [...prev, newUser]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingUser(false);
        }
    };

    return { users, error, loading, reload: loadUsers, removeUser, createUser, addingUser };

}