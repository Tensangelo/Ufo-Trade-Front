import { Gender } from "@/types/types";
import axios from "axios";

const UrlApi = process.env.NEXT_PUBLIC_API_URL;

export const getGenders = async(): Promise<Gender[]> => {
    try {
        const response = await axios.get<Gender[]>(`${UrlApi}/genders`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los generos', error);
        throw error;
    }
}