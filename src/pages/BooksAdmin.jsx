import {useState} from "react";
import {useBooks} from "../hooks/useBooks.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

const BooksAdmin = () => {
    const { books, error, loading, removeBook, createBook, addingBook } = useBooks();
    const [newBookTitle, setNewBookTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddBook = async (e) => {
        e.preventDefault();
        await createBook(newBookTitle);
        setNewBookTitle("");
        setIsModalOpen(false);
    }

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Erro: {error}</p>
    }

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-xl font-bold">Lista de Livros</h2>

                {/* Botão para abrir o modal */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Adicionar Livro
                </button>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-black/60">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
                            {/* Botão de Fechar (X) */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-3 right-3 text-white text-xl hover:text-gray-400"
                            >
                                &times;
                            </button>

                            <h3 className="text-lg font-semibold mb-4 text-white">Novo Livro</h3>
                            <form onSubmit={handleAddBook} className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Nome do autor"
                                    value={newBookTitle}
                                    onChange={(e) => setNewBookTitle(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 mb-3 w-full"
                                    required
                                />
                                {/* Botão Salvar com largura total do input */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full"
                                    disabled={addingBook}
                                >
                                    {addingBook ? "Adicionando..." : "Salvar"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Lista de Livros */}
                <ul className="mt-5">
                    <table className="min-w-full bg-gray-800 text-white p-4 rounded-lg">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Título do Livro</th>
                            <th className="py-2 px-4 text-left">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <tr key={book.id} className="border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-4">{book.title}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => removeBook(book.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </ul>

            </div>
        </div>
    );
};

export default BooksAdmin;