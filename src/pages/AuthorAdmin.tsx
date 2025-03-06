import {useParams} from "react-router-dom";
import {useAuthors} from "../hooks/useAuthors.ts";
import {useEffect} from "react";

const AuthorAdmin = () => {
    const {id} = useParams();
    const {author, error, loading, loadAuthor} = useAuthors();

    // Carrega o author quando o ID muda
    useEffect(() => {
        if (id) {
            loadAuthor(Number(id));
        }
    }, [id]);

    if (loading) return <p className="text-center text-gray-300">Carregando...</p>;
    if (error) return <p className="text-center text-red-500">Erro ao carregar o autor.</p>;
    if (!author || !author.name) return <p className="text-center text-gray-400">Autor não encontrado.</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
                {/* Nome do autor */}
                <h1 className="text-3xl font-bold text-white mb-4">{author.name}</h1>
            </div>
        </div>

    );
};

export default AuthorAdmin;