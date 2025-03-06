import {useParams} from "react-router-dom";
import {useBooks} from "../hooks/useBooks.ts";
import {useEffect} from "react";

const BookAdmin = () => {
    const {id} = useParams(); // Obtém o ID da URL
    const {book, error, loading, loadBook} = useBooks();

    // Carrega o livro quando o ID muda
    useEffect(() => {
        if (id) {
            loadBook(Number(id));
        }
    }, [id]);

    if (loading) return <p className="text-center text-gray-300">Carregando...</p>;
    if (error) return <p className="text-center text-red-500">Erro ao carregar o livro.</p>;
    if (!book || !book.title) return <p className="text-center text-gray-400">Livro não encontrado.</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
                {/* Título do Livro */}
                <h1 className="text-3xl font-bold text-white mb-4">{book.title}</h1>

                {/* Autores */}
                <p className="text-lg text-gray-300">
                    <span className="font-semibold text-white">
                        {Array.isArray(book.authors) && book.authors.length > 1 ? "Autores: " : "Autor: "}
                    </span>
                    {Array.isArray(book.authors) && book.authors.length > 0
                        ? book.authors.map((author) => author.name).join(", ")
                        : "Autor não disponível"}
                </p>

                {/*Editora*/}
                <p className="text-lg text-gray-300">
                <span className="font-semibold text-white">
                    Editora:
                </span>
                    <span className="ml-1">{book.publisher.name}</span>
                </p>

                {/* Categorias */}
                <p className="text-lg text-gray-300">
                    <span className="font-semibold text-white">
                        {Array.isArray(book.categories) && book.categories.length > 1 ? "Categorias: " : "Categoria: "}
                    </span>
                    {Array.isArray(book.categories) && book.categories.length > 0
                        ? book.categories.map((category) => category.name).join(", ")
                        : "Categoria não disponível"}
                </p>

                {/* Espaço reservado para Reviews */}
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                    <p className="text-gray-300">Em breve, as avaliações estarão disponíveis aqui...</p>
                </div>
            </div>
        </div>
    );
};

export default BookAdmin;