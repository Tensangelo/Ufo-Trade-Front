/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import axios from "axios";
import { User } from "@/types/types";
import { toast } from "react-toastify";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const UrlApi = process.env.NEXT_PUBLIC_API_URL;

    const checkSession = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`${UrlApi}/auth/me`, { withCredentials: true });
            if (res.data) {
                setUser(res.data);
            } else {
                setUser(null); // 👈 Asegura que si no hay datos, el usuario sea null
            }
        } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                setUser(null); // Token inválido o expirado
            } else {
                const errorMessage = err.response?.data?.message || "No se pudo verificar la sesión.";
                setError(errorMessage);
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }, [UrlApi]);

    const Login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${UrlApi}/auth/login`, { email, password }, { withCredentials: true });
            await checkSession();
            toast.success("Inicio de sesión exitoso 🎉");
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Error inesperado. Inténtalo de nuevo.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const Logout = async () => {
        setError(null);
        try {
            await axios.post(`${UrlApi}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            toast.success("Vuelve pronto...");
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Hubo un problema al cerrar sesión.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, Login, Logout, checkSession };
};

export default useAuth;