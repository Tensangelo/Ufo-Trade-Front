import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const authToken = req.cookies.get("auth_token")?.value;

    const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);
    const isProtectedRoute = !isAuthPage;

    if (!authToken && isProtectedRoute) {
        // Si no hay token y quiere acceder a una página protegida, redirige a login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (authToken && isAuthPage) {
        // Si está autenticado y trata de ir a /login, lo manda a la página principal
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next(); // Permite continuar si está autenticado o en login
}

export const config = {
    matcher: ["/", "/login", '/register'],
};