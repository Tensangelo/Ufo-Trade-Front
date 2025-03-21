import axios from "axios";

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

export interface BaseProfile {
    id: number;
    email: string;
    birthDate?: string;
    phone?: string;
    genderId: number;
    rolId: number;
}

// Perfil del Cliente
export interface ClientProfile extends BaseProfile {
    role: "client";
    name: string;
    address?: string;
}

  // Perfil del Empleado
export interface EmployerProfile extends BaseProfile {
    role: "employer";
    firstName: string;
    lastName: string;
    salary?: number;
    hiredAt?: string;
    jobPositionId: number;
}

// Unión de tipos para el perfil del usuario
export type UserProfile = ClientProfile | EmployerProfile;

export const getUserProfile = async (): Promise<UserProfile | null> => {
    try {
        const response = await axios.get<UserProfile>(`${UrlApi}/users/profile`, {
            withCredentials: true,
        });

        const userData = response.data;

        if (userData.rolId === 5) {
            return { ...userData, role: "client" } as ClientProfile;
        } else {
            return { ...userData, role: "employer" } as EmployerProfile;
        }
    } catch (error) {
        console.error("Error obteniendo el perfil:", error);
        throw error;
    }
};