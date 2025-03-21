import axios from "axios";
import { JobPositions } from "@/types/types";

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

export const getJobPositions = async(): Promise<JobPositions[]> => {
    try {
        const response = await axios.get<JobPositions[]>(`${UrlApi}/jobPositions`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los roles de trabajo', error);
        throw error;
    }
}