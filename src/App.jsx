import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AuthorsAdmin from "./pages/AuthorsAdmin.jsx";
import PublishersAdmin from "./pages/PublishersAdmin.jsx";
import CategoriesAdmin from "./pages/CategoriesAdmin.jsx";
import UsersAdmin from "./pages/UsersAdmin.jsx";
import NavbarAdmin from "./pages/NavbarAdmin.jsx";
import { useAuth } from "./context/AuthContext";

function Unauthorized() {
    return <h1>Acesso não autorizado</h1>;
}

function App() {
    const { user } = useAuth();

    return (
        <>
            {/* ✅ Navbar ADMIN apenas se o user for ADMIN */}
            {user && user.role === "ADMIN" && <NavbarAdmin />}

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
                    <Route path="/authors" element={<AuthorsAdmin />} />
                    <Route path="/publishers" element={<PublishersAdmin />} />
                    <Route path="/categories" element={<CategoriesAdmin />} />
                </Route>

                <Route path="*" element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
