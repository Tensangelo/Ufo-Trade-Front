"use client";

import { useAuthContext  } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertLoading } from "@/components/loading/verifySession";
import { toast } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
const { user, loading, checkSession } = useAuthContext();  // Estado de autenticación
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!user) {
            checkSession(); // ✅ Llama `auth/me` solo si `user` es `null`.
        }
    }, [user, checkSession]);

    useEffect(() => {
        setIsClient(true);

        if (!loading && !user) {
            router.replace("/login");  // Redirige si no hay sesión
            toast.warn("Debes estar autenticado para acceder a este sitio...");
        }
    }, [user, loading, router]);

    if (!isClient || loading) return <AlertLoading textInformation="Verificando sesión..." />

    return <>{children}</>;
}