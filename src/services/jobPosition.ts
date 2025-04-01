import { JobPositions } from "@/types/types";
import api from "@/utils/api";

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

export const getJobPositions = async(): Promise<JobPositions[]> => {
    try {
        const response = await api.get<JobPositions[]>(`${UrlApi}/jobPositions`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los roles de trabajo', error);
        throw error;
    }
}