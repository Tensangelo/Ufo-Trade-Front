import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@mui/material";
// Components
import Sidebar from "@/components/sidebar";
// Styles theme personalizate
import theme from "@/styles/theme";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "🛸 Ufo-Trade 🛸",
  description: "Intercambios intergalácticos ✨✨✨🛸",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Sidebar />
            <main className="Body">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
