// Definição do tipo do contexto de autenticação
import {User} from "./user.ts";

export interface AuthContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}