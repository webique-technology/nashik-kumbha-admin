// import axios from 'axios';
import axios from "axios"

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL + "/api",
    baseURL: import.meta.env.VITE_API_URL + "/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// console.log("Base URL", api.baseURL);

// Req Interceptor: Securely attach tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // console.log("token", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Res Interceptor: Global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Logic to logout user or refresh token
            console.error('Unauthorized, redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default api;