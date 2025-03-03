// import {useState} from "react";
import {useUsers} from "../hooks/useUsers.jsx";
import {useState} from "react";
import {ClipLoader} from "react-spinners";

const UsersAdmin = () => {
    const {users, error, loading, removeUser, createUser, addingUser} = useUsers();
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("USER");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const roles = [
        {value: "ADMIN", label: "Administrador"},
        {value: "USER", label: "Utilizador"},
    ];

    const handleAddUser = async (e) => {
        e.preventDefault();
        await createUser(newUsername, newPassword, newRole);
        setNewUsername("");
        setNewPassword("");
        setNewRole("USER");
        setIsModalOpen(false);
    }

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#3498db" size={50} />
            </div>
        );

    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-xl font-bold">Lista de Utilizadores</h2>

                {/* Botão para abrir o modal */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-5 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Adicionar Utilizador
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-black/60">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
                            {/* Botão de Fechar (X) */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-3 right-3 text-white text-xl hover:text-gray-400"
                            >
                                &times;
                            </button>

                            <h3 className="text-lg font-semibold mb-4 text-white">Novo Utilizador</h3>
                            <form onSubmit={handleAddUser} className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Nome de Utilizador"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white rounded-lg p-2 mb-3 w-full"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="*********"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full mb-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="mb-3 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    {roles.map((r) => (
                                        <option key={r.value} value={r.value}>
                                            {r.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Botão Salvar com largura total do input */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full"
                                    disabled={addingUser}
                                >
                                    {addingUser ? "Adicionando..." : "Salvar"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <ul className="mt-5">
                    <table className="min-w-full bg-gray-800 text-white p-4 rounded-lg">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Nome do Utilizador</th>
                            <th className="py-2 px-4 text-left">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-4">{user.username}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => removeUser(user.id)}
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

export default UsersAdmin;