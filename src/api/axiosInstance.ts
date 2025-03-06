// src/api/axiosInstance.ts
import axios from "axios";

const API_URL = "http://localhost:9090/api/";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Interceptor para adicionar automaticamente o token a cada request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
});

export default axiosInstance;