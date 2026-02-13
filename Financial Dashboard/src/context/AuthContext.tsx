import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api, { setApiAccessToken, onAccessTokenRefreshed } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Update API service when token changes in state
    const setAccessToken = (token: string | null) => {
        setAccessTokenState(token);
        setApiAccessToken(token);
    };

    const login = (token: string, userData: User) => {
        setAccessToken(token);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            console.error('Logout failed');
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    };

    useEffect(() => {
        // Listen for auto-refreshes from axios
        onAccessTokenRefreshed((newToken) => {
            setAccessTokenState(newToken);
            // Optionally decode user?
        });

        const initAuth = async () => {
            try {
                // Try to refresh token on startup to see if we have a valid session
                const response = await api.post('/auth/refresh');
                const { accessToken } = response.data;
                if (accessToken) {
                    setAccessToken(accessToken);
                    const decoded = jwtDecode<User & { id: number, role: string }>(accessToken);
                    setUser({ id: decoded.id, role: decoded.role, username: 'User', email: '' });
                }
            } catch {
                // Not authenticated
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            accessToken,
            login,
            logout,
            setAccessToken,
            isAuthenticated: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
