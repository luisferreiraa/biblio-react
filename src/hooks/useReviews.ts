// src/hooks/useReviews.ts

import {useAuth} from "../context/AuthContext.tsx";
import {useState} from "react";
import {Review} from "../interfaces/review.ts";
import {fetchReviewsByBookId} from "../api/reviews.ts";

export const useReviews = () => {
    const {user} = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsError, setReviewsError] = useState<string | null>("");
    const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);

    // Função para carregar reviews por bookId
    const loadReviews = async (bookId: number)  => {
        if (!user?.token) return;

        setReviewsLoading(true);
        setReviewsError(null);
        setReviews([]);

        try {
            setReviewsLoading(true);
            const data = await fetchReviewsByBookId(bookId);

            if (data) {
                setReviews(data.content);
            }
        } catch (err) {
            setReviewsError((err as Error).message);
        } finally {
            setReviewsLoading(false);
        }
    };

    return {reload: loadReviews, loadReviews, reviews, reviewsError, reviewsLoading};
}