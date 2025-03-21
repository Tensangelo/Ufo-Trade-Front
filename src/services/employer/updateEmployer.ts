import axios from "axios";
import { UserProfile } from "@/services/profile";

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

interface UpdateResponse {
    success: boolean;
    message: string;
    error?: string;
    updatedProfile: UserProfile;
}

export const updateEmployer = async (profile: UserProfile, id: number): Promise<UpdateResponse> => {
    try {
        const response = await axios.put(`${UrlApi}/employers/update/${id}`, profile, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        throw error;
    }
};