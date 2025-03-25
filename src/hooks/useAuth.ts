import { useState, useCallback } from "react";
import api from "@/utils/api";
import { User } from "@/types/types";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const UrlApi = process.env.NEXT_PUBLIC_API_URL;

    const checkSession = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`${UrlApi}/auth/me`, { withCredentials: true });
            if (res.data) {
                setUser(res.data);
            } else {
                setUser(null); // 👈 Asegura que si no hay datos, el usuario sea null
            }
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error("Error al verificar sesión:", error);
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [UrlApi]);

    const Login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await api.post(`${UrlApi}/auth/login`, { email, password }, { withCredentials: true });
            await checkSession();
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error("Error al iniciar sesión:", error);
            }
            throw new Error("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    const Logout = async () => {
        try {
            await api.post(`${UrlApi}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error("Error al cerrar sesión:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, Login, Logout, checkSession };
};

export default useAuth;