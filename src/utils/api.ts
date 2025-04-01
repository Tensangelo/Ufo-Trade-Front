import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.warn("Sesión inválida o expirada");
            return Promise.resolve({ data: null });
        }
        return Promise.reject(error);
    }
);

export default api;