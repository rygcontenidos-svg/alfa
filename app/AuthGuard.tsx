"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario, cargando } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (cargando) return;
    if (usuario) return;
    if (pathname === "/login") return;
    if (!usuario && pathname !== "/admin") { router.push("/login"); return; }
  }, [usuario, cargando, pathname, router]);

  if (pathname === "/login" || pathname.startsWith("/api/")) {
    return <>{children}</>;
  }

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gris">Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gris">Redirigiendo...</p>
      </div>
    );
  }

  return <>{children}</>;
}
