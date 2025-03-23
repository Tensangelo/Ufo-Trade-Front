import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        // Hacer una petición a /auth/me para verificar autenticación con Axios
        await axios.get(`${apiUrl}/auth/me`, {
            withCredentials: true, // Asegura que las cookies se envíen
            headers: {
                Cookie: req.headers.get("cookie") || "", // Pasar cookies al backend
            },
        });

        // Si la petición es exitosa, el usuario está autenticado
        const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);

        if (isAuthPage) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } catch (error) {
        console.error("Error verificando autenticación:", error);

        // Si el usuario no está autenticado y trata de acceder a una página protegida, redirige a login
        const isProtectedRoute = !["/login", "/register"].includes(req.nextUrl.pathname);
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next(); // Permite continuar si la autenticación es válida
}

export const config = {
    matcher: ["/", "/login", '/register'],
};