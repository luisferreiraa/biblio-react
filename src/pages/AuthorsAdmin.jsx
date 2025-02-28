import {useAuth} from '../context/AuthContext.jsx';
import {useEffect, useState} from "react";

const AuthorsAdmin = () => {
    const {user} = useAuth(); // Acessa o estado do usuário
    const [authors, setAuthors] = useState([]); // Inicializa como array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAuthorName, setNewAuthorName] = useState("");
    const [addingAuthor, setAddingAuthor] = useState(false);

    useEffect(() => {
        const fetchAuthors = async () => {
            const token = localStorage.getItem("token"); // Obtém o token do localStorage

            if (!token) {
                setError("Token não encontrado. Faça login novamente.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:9090/api/authors/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Inclui o token JWT
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data); // Verifique a resposta da API

                if (Array.isArray(data.content)) {
                    setAuthors(data.content); // Acessa o array dentro de 'content'
                } else {
                    throw new Error("Dados inválidos recebidos da API");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, [user]); // Use `user` para monitorar mudanças

    const handleAddAuthor = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!newAuthorName.trim()) {
            setError("O nome do autor não pode estar vazio.");
            return;
        }

        if (!token) {
            setError("Token não encontrado. Faça login novamente.");
            return;
        }

        setAddingAuthor(true);

        try {
            const response = await fetch("http://localhost:9090/api/authors/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({name: newAuthorName}),
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            const newAuthor = await response.json();

            setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);

            setNewAuthorName("");
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setAddingAuthor(false);
        }
    }

    const handleDeleteAuthor = async (authorId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Token não encontrado. Faça login novamente.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:9090/api/authors/${authorId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }

            // Remove o autor da lista após a exclusão
            setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    }

    if (loading) return <p>A carregar...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-xl font-bold">Lista de Autores</h2>

                <form onSubmit={handleAddAuthor}>
                    <input
                        type="text"
                        placeholder="Nome do autor"
                        value={newAuthorName}
                        onChange={(e) => setNewAuthorName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={addingAuthor}
                    >
                        {addingAuthor ? "Adicionando..." : "Adicionar Autor"}
                    </button>
                </form>

                <ul className="mt-5">
                    <table className="min-w-full bg-gray-800 text-white p-4 rounded-lg">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Nome do Autor</th>
                            <th className="py-2 px-4 text-left">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {authors.map((author) => (
                            <tr key={author.id} className="border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-4">{author.name}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleDeleteAuthor(author.id)}
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

export default AuthorsAdmin;