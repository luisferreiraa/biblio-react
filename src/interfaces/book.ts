// Definir interface para Livro
export interface Book {
    id: number;
    title: string;
    authorsId: number[];
    publisherId: number;
    categoriesId: number[];
}