import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
    const token = (await cookies()).get("auth_token")?.value; // Leer cookie HTTP-only

    if (!token) {
        return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        return NextResponse.json({ user: decoded });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Token inválido" }, { status: 403 });
    }
}
