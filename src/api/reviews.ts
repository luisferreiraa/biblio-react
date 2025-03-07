// src/api/reviews.ts

// Buscar lista de reviews pelo bookId
import {ReviewsByBookIdResponse} from "../interfaces/reviewsByBookIdResponse.ts";
import axiosInstance from "./axiosInstance.ts";

export const fetchReviewsByBookId = async(bookId: number):Promise<ReviewsByBookIdResponse> => {
    try {
        const { data } = await axiosInstance.get<ReviewsByBookIdResponse>(`reviews/${bookId}`);
        return data;
    } catch (error) {
        console.error("Erro ao buscar reviews: ", error);
        throw error;
    }
};