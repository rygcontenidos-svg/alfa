"use client";

import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, logout } = useAuth();

  return (
    <div className="min-h-screen w-full">
      <nav
        className="flex items-center justify-between h-[72px] px-6 sm:px-10 lg:px-[120px] text-white"
        style={{ backgroundColor: "#5657FF" }}
      >
        <Link href="/" className="h-full flex items-center justify-center tracking-wide" style={{ fontFamily: "Etna", color: "#cafe03", fontSize: "3rem", lineHeight: 1 }}>
          <span style={{ transform: "translateY(-12px)" }}>Alfa</span>
        </Link>
        <div className="flex items-center gap-6 text-[17px] font-medium">
          <Link href="/materia/lengua" className="text-white/80 hover:text-white transition-colors"><i className="fa-solid fa-book text-[15px] mr-1.5" />Lengua</Link>
          <Link href="/materia/matematica" className="text-white/80 hover:text-white transition-colors"><i className="fa-solid fa-calculator text-[15px] mr-1.5" />Matemática</Link>
          <Link href="/materia/historia" className="text-white/80 hover:text-white transition-colors"><i className="fa-solid fa-landmark text-[15px] mr-1.5" />Historia</Link>
          <Link href="/materia/geografia" className="text-white/80 hover:text-white transition-colors"><i className="fa-solid fa-earth-americas text-[15px] mr-1.5" />Geografía</Link>
        </div>
        <div className="flex items-center gap-4 text-[17px]">
          {usuario ? (
            <>
              <Link
                href="/progreso"
                className="text-white/80 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-chart-line mr-1.5" />
                Mi progreso
              </Link>
              <span className="text-white/50">
                <i className="fa-solid fa-circle-user mr-1.5" />
                {usuario}
              </span>
              <button
                type="button"
                onClick={logout}
                className="text-white/50 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-arrow-right-from-bracket mr-1.5" />
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-arrow-right-to-bracket mr-1.5" />
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
      <main className="w-full">{children}</main>
    </div>
  );
}
