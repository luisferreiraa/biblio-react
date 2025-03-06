// src/api/publishers.ts
import {Publisher} from "../interfaces/publisher.ts";
import {PublisherResponse} from "../interfaces/publisherResponse.ts";
import axiosInstance from "./axiosInstance.ts";

// Buscar lista de editoras
export const fetchPublishers = async (): Promise<PublisherResponse> => {
    try {
        const { data } = await axiosInstance.get<PublisherResponse>("publishers/");
        return data;
    } catch (error) {
        console.error("Erro ao buscar editoras: ", error);
        throw error;
    }
} ;

// Adicionar uma nova editora
export const addPublisher = async (name: string): Promise<Publisher> => {
    try {
        const { data } = await axiosInstance.post<Publisher>("publishers/", { name });
        return data;
    } catch (error) {
        console.error("Erro ao adicionar editora: ", error);
        throw error;
    }
};

// Remover uma editora
export const deletePublisher = async (publisherId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`publishers/${publisherId}`);
        return true;
    } catch (error) {
        console.error("Erro ao remover editora: ", error);
        throw error;
    }
};