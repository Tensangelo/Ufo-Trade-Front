"use client"
import { createContext, useContext, ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types/types";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    Login: (email: string, password: string) => Promise<void>;
    Logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be inside AuthProvider");
    return context;
}
