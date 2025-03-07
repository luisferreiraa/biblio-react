import {useParams} from "react-router-dom";
import {usePublishers} from "../hooks/usePublishers.ts";
import {useEffect} from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

const PublisherAdmin = () => {
    const {id} = useParams();
    const {publisher, error, loading, loadPublisher} = usePublishers();

    useEffect(() => {
        if (id) {
            loadPublisher(Number(id));
        }
    }, [id]);

    if (loading) return <LoadingSpinner/>
    if (error) return <p className="text-center text-red-500">Erro ao carregar editora.</p>;
    if (!publisher || !publisher.name) return <p className="text-center text-gray-400">Editora não encontrada.</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
                {/* Nome da Editora */}
                <h1 className="text-3xl font-bold text-white mb-4">{publisher.name}</h1>
                {/* Lista de Livros*/}
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Livros</h2>

                    {publisher.books.length > 0 ? (
                        <div className="space-y-4">
                            {publisher.books.map((book) => (
                                <div key={book.id} className="p-4 bg-gray-800 rounded-lg shadow">
                                    <p className="text-sm text-gray-400 font-semibold text-white">{book.title}</p>
                                    <p className="text-sm text-gray-400">
                                        <span className="font-semibold text-white">Autores: </span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        <span className="font-semibold text-white">Categorias: </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-300">Ainda não há livros para esta editora.</p>
                    )}
                </div>

            </div>
        </div>


    );
};

export default PublisherAdmin;