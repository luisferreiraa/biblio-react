import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./routes/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import AuthorsAdmin from "./pages/AuthorsAdmin.tsx";
import PublishersAdmin from "./pages/PublishersAdmin.tsx";
import CategoriesAdmin from "./pages/CategoriesAdmin.tsx";
import UsersAdmin from "./pages/UsersAdmin.tsx";
import NavbarAdmin from "./pages/NavbarAdmin.tsx";
import BooksAdmin from "./pages/BooksAdmin.jsx";
import { useAuth } from "./context/AuthContext.tsx";
import {ClipLoader} from "react-spinners";
import BookAdmin from "./pages/BookAdmin.tsx";
import AuthorAdmin from "./pages/AuthorAdmin.tsx";

function Unauthorized() {
    return <h1>Acesso não autorizado</h1>;
}

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#3498db" size={50}/>
            </div>
        );
    }

    return (
        <>
            {/* ✅ Navbar ADMIN apenas se o user for ADMIN e não estiver na página de login */}
            {user?.role === "ADMIN" && location.pathname !== "/login" && <NavbarAdmin />}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Área de utilizadores comuns */}
                <Route element={<PrivateRoute allowedRoles={["USER", "ADMIN"]} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* Área de administração - apenas ADMIN pode acessar */}
                <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/users" element={<UsersAdmin />} />
                    <Route path="/books" element={<BooksAdmin />} />
                    <Route path="/books/:id" element={<BookAdmin />} />
                    <Route path="/authors" element={<AuthorsAdmin />} />
                    <Route path="/authors/:id" element={<AuthorAdmin />} />
                    <Route path="/publishers" element={<PublishersAdmin />} />
                    <Route path="/categories" element={<CategoriesAdmin />} />
                </Route>

                <Route path="*" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
