import {Publisher} from "./publisher.ts";
import {Category} from "./category.ts";
import {Author} from "./author.ts";

export interface BookByIdResponse {
    id: number;
    title: string;
    publisher: Publisher;
    categories: Category[];
    authors: Author[];
}