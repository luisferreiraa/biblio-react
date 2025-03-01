import { useState, useEffect } from 'react';
import { fetchPublishers, addPublisher, deletePublisher } from "../api/publishers.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const usePublishers = () => {
    const { user } = useAuth();
    const [publishers, setPublishers] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addingPublisher, setAddingPublisher] = useState(false);

    useEffect(() => {
        if (user) {
            loadPublishers();
        }
    }, [user]);

    const loadPublishers = async () => {
        try {
            setLoading(true);
            const data = await fetchPublishers(user.token);
            setPublishers(data.content);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removePublisher = async (publisherId) => {
        try {
            await deletePublisher(publisherId, user.token);
            setPublishers((prev) => prev.filter((publisher) => publisher.id !== publisherId));
        } catch (err) {
            setError(err.message);
        }
    };

    const createPublisher = async (name) => {
        if (!name.trim()) {
            setError("O nome da editora não pode estar vazio.");
            return;
        }

        setAddingPublisher(true);

        try {
            const newPublisher = await addPublisher(name, user.token);
            setPublishers((prev) => [...prev, newPublisher]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingPublisher(false);
        }
    };

    return { publishers, error, loading, addingPublisher, reload: loadPublishers, removePublisher, createPublisher };

}