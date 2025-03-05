import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StrictMode } from "react";

// Certificando-se que 'rootElement' é do tipo HTMLElement
const rootElement = document.getElementById('root') as HTMLElement;

// Especificando que 'createRoot' retorna um 'Root' que aceita um React.ReactNode
const root = createRoot(rootElement);

// Garantindo que o elemento passado é um 'React.ReactNode'
root.render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);

