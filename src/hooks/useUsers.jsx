import { useState, useEffect } from 'react';
import {fetchUsers, deleteUser, addUser} from "../api/users.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const useUsers = () => {
    const  { user } = useAuth();
    const [ users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingUser, setAddingUser] = useState(false);

    useEffect(() => {
        if (user) {
            loadUsers();
        }
    }, [user]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchUsers(user.token);
            setUsers(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (userId) => {
        try {
            await deleteUser(userId, user.token);
            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (err) {
            setError(err.message);
        }
    };

    const createUser = async (username, password, role) => {
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
            const newUser = await addUser(username, password, role, user.token);
            setUsers((prev) => [...prev, newUser]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingUser(false);
        }
    };

    return { users, error, loading, reload: loadUsers, removeUser, createUser, addingUser };

}