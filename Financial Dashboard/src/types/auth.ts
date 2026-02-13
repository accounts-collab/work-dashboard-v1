export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    setAccessToken: (token: string | null) => void;
    isAuthenticated: boolean;
    loading: boolean;
}
