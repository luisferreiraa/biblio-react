// import {useState} from "react";
import {useUsers} from "../hooks/useUsers.jsx";

const UsersAdmin = () => {
    const { users, error, loading, removeUser } = useUsers();

    if (loading) return <p>A carregar...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-xl font-bold">Lista de Utilizadores</h2>

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