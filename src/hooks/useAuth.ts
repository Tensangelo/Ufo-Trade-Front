import { useState, useEffect, useCallback } from "react";
import api from "@/utils/api";
import { User } from "@/types/types";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [shouldCheckSession, setShouldCheckSession] = useState(false);

    const UrlApi = process.env.NEXT_PUBLIC_API_URL;

    const checkSession = useCallback(async () => {
        if (!shouldCheckSession) return;
        setLoading(true);
        try {
            const res = await api.get(`${UrlApi}/auth/me`, { withCredentials: true });
            setUser(res.data);
        } catch (error) {
            console.error("Error al verificar sesión", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [UrlApi, shouldCheckSession]);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const Login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await api.post(`${UrlApi}/auth/login`, { email, password }, { withCredentials: true });
            setShouldCheckSession(true);
            await checkSession();
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            throw new Error("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    const Logout = async () => {
        try {
            await api.post(`${UrlApi}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            setShouldCheckSession(false);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, Login, Logout };
};

export default useAuth;