import {Publisher} from "./publisher.ts";

export interface PublisherResponse {
    content: Publisher[];
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