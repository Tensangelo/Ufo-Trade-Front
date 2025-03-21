"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        lightGray: Palette["primary"];
    }

    interface PaletteOptions {
        lightGray?: PaletteOptions["primary"];
    }
}

// 🎨 Define tu paleta de colores global
const theme = createTheme({
    palette: {
        primary: { main: "#8A2BE2" }, // Morado
        secondary: { main: "#4B0082" }, // Índigo oscuro
        success: { main: "#4CAF50" }, // Verde
        warning: { main: "#FF9800" }, // Naranja
        lightGray: { main: "#e2d0f8" }
    },
});

export default theme;