import { RegisterUserData, User } from '@/types/types';
import axios from 'axios';

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse {
    message: string;
    client?: RegisterUserData;
    user?: User;
    error?: string;
    success?: boolean;
}

export const registerUser = async (userData: RegisterUserData): Promise<ApiResponse> => {
    try {
        const response = await axios.post(`${UrlApi}/auth/register`, userData);
        return {
            ...response.data,
            success: true,
        }
    } catch (error) {
        console.error("Error en registerUser:", error);

        return {
            error: axios.isAxiosError(error) && error.response
                ? error.response.data?.error || "Error en la solicitud"
                : "Ocurrió un error inesperado",
            message: "No se pudo registrar el usuario",
            success: false,
        };
    }
};