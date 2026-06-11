// import axios from 'axios';
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});


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

            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;