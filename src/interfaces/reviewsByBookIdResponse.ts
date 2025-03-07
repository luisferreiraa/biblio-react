import {Review} from "./review.ts";

export interface ReviewsByBookIdResponse {
    content: Review[];
    pageable: object;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;

}