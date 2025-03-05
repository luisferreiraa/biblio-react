import {Category} from "./category.ts";

export interface CategoryResponse {
    content: Category[];  // O campo `content` é um array de categorias
    pageable: object;      // Outros campos que você pode precisar da resposta
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}