"use client";

import { useAuthContext  } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertLoading } from "@/components/loading/verifySession";
import { toast } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user, loading, checkSession } = useAuthContext();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!user) {
            checkSession(); // ✅ Llama `auth/me` solo si no hay usuario en memoria.
        }
    }, [user, checkSession]);

    useEffect(() => {
        setIsClient(true);

        if (!loading && user) {
            router.replace("/");  // Si ya está logueado, redirige a home
            toast.warn("Ya estas logueado.");
        }
    }, [user, loading, router]);

    if (!isClient || loading) return <AlertLoading textInformation="Verificando sesión..." />

    return <>{children}</>;
}