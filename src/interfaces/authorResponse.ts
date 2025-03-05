
import {Author} from "./author.ts";

export interface AuthorResponse {
    content: Author[];
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