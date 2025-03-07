import {Book} from "./book.ts";
import {BookResponse} from "./bookResponse.ts";

export interface PublisherById {
    id: number;
    name: string;
    books: Book[];
}