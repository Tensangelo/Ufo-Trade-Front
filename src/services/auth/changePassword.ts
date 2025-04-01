import api from "@/utils/api";

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

export interface UpdatePasswordData {
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = async ({ userId, oldPassword, newPassword }: UpdatePasswordData): Promise<string> => {
    try {
        const response = await api.put(`${UrlApi}/users/updatePass/${userId}`, { oldPassword, newPassword}, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data.message;
    } catch (error) {
        console.error("Error actualizando la contraseña:", error);
        throw error;
    }
};