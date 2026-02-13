import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// Use environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let accessToken: string | null = null;
const refreshSubscribers: ((token: string) => void)[] = [];

export const setApiAccessToken = (token: string | null) => {
    accessToken = token;
};

// Allow AuthContext to subscribe to token updates from auto-refresh
export const onAccessTokenRefreshed = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for cookies
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 and retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt refresh
                const response = await api.post('/auth/refresh');
                const newAccessToken = response.data.accessToken;

                setApiAccessToken(newAccessToken);

                // Notify subscribers (AuthContext)
                refreshSubscribers.forEach(cb => cb(newAccessToken));

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - clean up
                setApiAccessToken(null);
                // We might want to trigger a logout here via subscriber too, 
                // but usually the UI will react to the failed requests eventually or we can redirect
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
