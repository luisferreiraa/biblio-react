import {Book} from "./book.ts";

export interface BookResponse {
    content: Book[];
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