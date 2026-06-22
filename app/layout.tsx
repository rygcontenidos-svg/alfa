import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import AuthGuard from "./AuthGuard";

export const metadata: Metadata = {
  title: "Alfa — Entrená hoy. Llegá preparado.",
  description:
    "Método de estudio de 5 pasos para ingreso UBA / CNBA. Curso de Lengua.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
