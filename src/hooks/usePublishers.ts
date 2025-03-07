// src/hooks/usePublishers.ts

import {useState, useEffect} from 'react';
import {fetchPublishers, addPublisher, deletePublisher, fetchPublisherById} from "../api/publishers.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {Publisher} from "../interfaces/publisher.ts";
import {PublisherById} from "../interfaces/publisherById.ts";
import {fetchBookById} from "../api/books.ts";

export const usePublishers = () => {
    const {user} = useAuth();
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [publisher, setPublisher] = useState<PublisherById | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [addingPublisher, setAddingPublisher] = useState<boolean>(false);

    useEffect(() => {
        if (user?.token) {
            loadPublishers();
        }
    }, [user]);

    // Função para carregar os autores
    const loadPublishers = async () => {
        if (!user?.token) {
            setError("Utilizador não autenticado.")
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data = await fetchPublishers();

            // Verifica se há editoras retornadas
            if (data) {
                setPublishers(data.content);
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Função para carregar uma editora em específico
    const loadPublisher = async (publisherId: number) => {
        if (!user?.token) return;

        setLoading(true);
        setError(null);
        setPublisher(null);

        try {
            const data = await fetchPublisherById(publisherId);
            setPublisher(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };


    // Função para remover uma editora
    const removePublisher = async (publisherId: number) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        try {
            const success = await deletePublisher(publisherId);
            if (success) {
                setPublishers((prev) => prev.filter((publisher) => publisher.id !== publisherId));
            } else {
                setError("Erro ao remover editora.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Função para criar uma nova editora
    const createPublisher = async (name) => {
        if (!user?.token) {
            setError("Utilizador não autenticado.");
            return;
        }

        if (!name.trim()) {
            setError("O nome da editora não pode estar vazio.");
            return;
        }

        setAddingPublisher(true);

        try {
            const newPublisher = await addPublisher(name);
            setPublishers((prev) => [...prev, newPublisher]);
        } catch (err) {
            setError(err.message);
        } finally {
            setAddingPublisher(false);
        }
    };

    return {publishers, publisher, error, loading, addingPublisher, reload: loadPublishers, loadPublisher, removePublisher, createPublisher};

}