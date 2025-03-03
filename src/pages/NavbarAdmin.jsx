import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
    const { user } = useAuth();     // Obtém o utilizador do contexto

    if (!user || user.role !== "ADMIN") return null;        // Só exibe se for ADMIN

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Painel Admin</h1>
            <ul className="flex gap-4">
                <li>
                    <Link to="/admin" className="hover:text-gray-400">Dashboard</Link>
                </li>
                <li>
                    <Link to="/authors" className="hover:text-gray-400">Autores</Link>
                </li>
                <li>
                    <Link to="/publishers" className="hover:text-gray-400">Editoras</Link>
                </li>
                <li>
                    <Link to="/categories" className="hover:text-gray-400">Categorias</Link>
                </li>
                <li>
                    <Link to="/users" className="hover:text-gray-400">Utilizadores</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;