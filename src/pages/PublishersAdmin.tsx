import {FormEvent, useState} from "react";
import {usePublishers} from "../hooks/usePublishers.ts";
import LoadingSpinner from "./LoadingSpinner.jsx";
import {Publisher} from "../interfaces/publisher.ts";

const PublishersAdmin = () => {
    const {publishers, error, loading, removePublisher, createPublisher, addingPublisher} = usePublishers();
    const [newPublisherName, setNewPublisherName] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleAddPublisher = async (e: FormEvent) => {
        e.preventDefault();
        await createPublisher(newPublisherName);
        setNewPublisherName("");
        setIsModalOpen(false);
    };

    if (loading) {
        return <LoadingSpinner />; // 👈 Usa o componente reutilizável
    }

    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-xl font-bold">Lista de Editoras</h2>

                {/* Botão para abrir o modal */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Adicionar Editora
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

                            <h3 className="text-lg font-semibold mb-4 text-white">Nova Editora</h3>
                            <form onSubmit={handleAddPublisher} className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Nome da editora"
                                    value={newPublisherName}
                                    onChange={(e) => setNewPublisherName(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 mb-3 w-full"
                                    required
                                />
                                {/* Botão Salvar com largura total do input */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full"
                                    disabled={addingPublisher}
                                >
                                    {addingPublisher ? "Adicionando..." : "Salvar"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}


                {/*<form onSubmit={handleAddPublisher}>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Nome da editora"*/}
                {/*        value={newPublisherName}*/}
                {/*        onChange={(e) => setNewPublisherName(e.target.value)}*/}
                {/*        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                {/*    />*/}
                {/*    <button*/}
                {/*        type="submit"*/}
                {/*        className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"*/}
                {/*        disabled={addingPublisher}*/}
                {/*    >*/}
                {/*        {addingPublisher ? "Adicionando..." : "Adicionar Editora"}*/}
                {/*    </button>*/}
                {/*</form>*/}

                {/* Lista de Editoras */}

                <ul className="mt-5">
                    <table className="min-w-full bg-gray-800 text-white p-4 rounded-lg">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Nome da Editora</th>
                            <th className="py-2 px-4 text-left">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {publishers.map((publisher: Publisher) => (
                            <tr key={publisher.id} className="border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-4">{publisher.name}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => removePublisher(publisher.id)}
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

export default PublishersAdmin;