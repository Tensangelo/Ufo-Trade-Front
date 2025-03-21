import { useState, useEffect, useCallback } from "react";
import api from "@/utils/api";
import { User } from "@/types/types";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const UrlApi = process.env.NEXT_PUBLIC_API_URL;

    const checkSession = useCallback(async () => {
        try {
            const res = await api.get(`${UrlApi}/auth/me`, { withCredentials: true });
            setUser(res.data);
        } catch (error) {
            console.error("Error al verificar sesión", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [UrlApi]);

    useEffect(() => {
        if (document.cookie.includes("session")) {
            checkSession();
        } else {
            setLoading(false);
        }
    }, [checkSession]);

    const Login = async (email: string, password: string) => {
        try {
            await api.post(`${UrlApi}/auth/login`, { email, password }, { withCredentials: true });
            await checkSession();
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            throw new Error("Error al iniciar sesión");
        }
    };

    const Logout = async () => {
        try {
            await api.post(`${UrlApi}/auth/logout`);
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return { user, loading, Login, Logout };
};

export default useAuth;