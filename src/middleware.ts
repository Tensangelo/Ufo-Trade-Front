import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const res = await fetch(`${apiUrl}/auth/me`, {
            method: "GET",
            credentials: "include", // cookies HTTP-only
            headers: {
                Cookie: req.headers.get("cookie") || "", // cookies al backend
            },
        });
        const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);

        if (res.ok) {
            if (isAuthPage) {
                return NextResponse.redirect(new URL("/", req.url)); // Redirigir a home si ya está autenticado
            }
            return NextResponse.next();
        }
    } catch (error) {
        console.error("Error verificando autenticación:", error);
    }

    // Si la sesión no es válida y está en una página protegida, redirige a login
    const isProtectedRoute = !["/login", "/register"].includes(req.nextUrl.pathname);
    if (isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // Permitir acceso a login y register
};

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};