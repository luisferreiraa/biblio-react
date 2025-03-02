import { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from "../api/users.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const useUsers = () => {
    const  { user } = useAuth();
    const [ users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return { users, error, loading, reload: loadUsers, removeUser };

}