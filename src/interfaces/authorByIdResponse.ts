import {BookByIdResponse} from "./bookByIdResponse.ts";

export interface AuthorByIdResponse {
    id: number;
    name: string;
    books: BookByIdResponse[];
}