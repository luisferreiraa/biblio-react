import {useParams} from "react-router-dom";
import {useBooks} from "../hooks/useBooks.ts";
import {useReviews} from "../hooks/useReviews.ts";
import {useEffect} from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

const BookAdmin = () => {
    const {id} = useParams(); // Obtém o ID da URL
    const {book, error, loading, loadBook} = useBooks();
    const {reviews, loadReviews, reviewsLoading, reviewsError} = useReviews();

    // Carrega o livro quando o ID muda
    useEffect(() => {
        if (id) {
            loadBook(Number(id));
            loadReviews(Number(id));
        }
    }, [id]);

    if (loading) return <LoadingSpinner/>;
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

                {/* Reviews */}
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Reviews</h2>

                    {reviewsLoading && <LoadingSpinner/>}
                    {reviewsError && <p className="text-red-500">Erro ao carregar reviews.</p>}

                    {reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-4 bg-gray-800 rounded-lg shadow">
                                    <p className="text-sm text-gray-400 font-semibold text-white">{review.username}</p>
                                    <p className="text-sm text-gray-400">
                                        <span className="font-semibold text-white">Avaliação: </span> {review.rating}/10
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        <span className="font-semibold text-white">Comentário: </span> {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-300">Ainda não há reviews para este livro.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BookAdmin;