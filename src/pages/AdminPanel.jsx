import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const AdminPanel = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleLinkToAuthors = () => {
        navigate("/authors");
    };

    const handleLinkToPublishers = () => {
        navigate("/publishers");
    }

    const handleLinkToCategories = () => {
        navigate("/categories");
    }

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="text-xl font-bold">Painel de Administração</h1>
                <p>Olá, {user?.username}</p>
                <button onClick={handleLogout}
                        className="mt-5 text-white bg-red-700 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Logout
                </button>
                <button onClick={handleLinkToAuthors}
                        className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Autores
                </button>
                <button onClick={handleLinkToPublishers}
                        className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Editoras
                </button>
                <button onClick={handleLinkToCategories}
                        className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Categorias
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;