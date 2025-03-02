// import {useState} from "react";
import {useUsers} from "../hooks/useUsers.jsx";
import {useState} from "react";

const UsersAdmin = () => {
    const {users, error, loading, removeUser, createUser, addingUser} = useUsers();
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState("USER");

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
    }

    if (loading) return <p>A carregar...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-gray-900 text-white">
            <div className="p-6 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h2 className="text-xl font-bold">Lista de Utilizadores</h2>

                <form onSubmit={handleAddUser}>
                    <div className="mt-3">
                        <label className="block text-sm font-medium">Nome de Utilizador</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="*********"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mt-3">
                        <label className="block text-sm font-medium">Role</label>
                        <select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="mt-2 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 me-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {roles.map((r) => (
                                <option key={r.value} value={r.value}>
                                    {r.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="mt-5 w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        disabled={addingUser}
                    >
                        {addingUser ? "Adicionando..." : "Adicionar Utilizador"}
                    </button>
                </form>

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