import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AuthorsAdmin from "./pages/AuthorsAdmin.jsx";
import PublishersAdmin from "./pages/PublishersAdmin.jsx";

function Unauthorized() {
    return <h1>Acesso não autorizado</h1>;
}

function App() {
    return (
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
            </Route>

            <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/authors" element={<AuthorsAdmin />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/publishers" element={<PublishersAdmin />} />
            </Route>

            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default App;
