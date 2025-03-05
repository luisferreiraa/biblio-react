// src/api/publishers.ts

import {Publisher} from "../interfaces/publisher.ts";
import {PublisherResponse} from "../interfaces/publisherResponse.ts";

const API_URL = 'http://localhost:9090/api/publishers/';

// Buscar lista de editoras
export const fetchPublishers = async (): Promise<PublisherResponse | void> => {
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

        return await response.json() as PublisherResponse;
    } catch (error) {
        console.error("Erro ao buscar editoras: ", error);
        throw error;
    }
};

// Adicionar uma nova editora
export const addPublisher = async (name: string): Promise<Publisher> => {

    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.");
        throw new Error("Token não encontrado.");
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

    return await response.json() as Publisher;
};

// Remover uma editora
export const deletePublisher = async (publisherId: number): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error("Token não encontrado. Faça login novamente.")
        throw new Error("Token não encontrado.");
    }

    try {
        const response = await fetch(`${API_URL}${publisherId}`, {
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
        console.error("Erro ao buscar editoras: ", error);
        throw error;
    }
};