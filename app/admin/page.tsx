"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthProvider";
import { esAdmin } from "@/lib/permisos";

export default function AdminPage() {
  const { usuario, cargando } = useAuth();
  const router = useRouter();
  const [permisos, setPermisos] = useState<{ admins: string[]; sinRespuestas: string[] } | null>(null);
  const [nuevoUsuario, setNuevoUsuario] = useState("");

  useEffect(() => {
    if (!cargando && !esAdmin(usuario)) {
      router.push("/");
    }
  }, [usuario, cargando, router]);

  useEffect(() => {
    fetch("/api/permisos")
      .then((r) => r.json())
      .then(setPermisos);
  }, []);

  async function toggle(usuario: string) {
    const res = await fetch("/api/permisos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toggle: usuario }),
    });
    const data = await res.json();
    setPermisos(data);
  }

  if (cargando || !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gris">Cargando...</p>
      </div>
    );
  }

  if (!permisos) return null;

  return (
    <div className="max-w-[600px] mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-grafito mb-2">Panel de Administrador</h1>
      <p className="text-sm text-gris mb-8">Usuario: {usuario}</p>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-grafito mb-3 uppercase tracking-wide">
          Control de respuestas
        </h2>
        <p className="text-xs text-gris mb-4">
          Los usuarios marcados <strong>NO</strong> pueden ver el botón &quot;Ver respuestas&quot; en los ejercicios.
        </p>
        <div className="space-y-2">
          {permisos.sinRespuestas.map((u) => (
            <div
              key={u}
              className="flex items-center justify-between rounded-lg border border-rojo bg-rojo-claro/30 px-4 py-2"
            >
              <span className="text-sm text-grafito font-medium">🚫 {u}</span>
              <button
                onClick={() => toggle(u)}
                className="text-xs text-verde font-semibold hover:underline"
              >
                Habilitar respuestas
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-grafito mb-3 uppercase tracking-wide">
          Bloquear respuestas a un usuario
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={nuevoUsuario}
            onChange={(e) => setNuevoUsuario(e.target.value)}
            placeholder="Nombre de usuario..."
            className="flex-1 rounded-lg border border-borde px-3 py-2 text-sm"
          />
          <button
            onClick={() => {
              if (nuevoUsuario.trim()) {
                toggle(nuevoUsuario.trim());
                setNuevoUsuario("");
              }
            }}
            className="rounded-lg bg-rojo text-white text-sm font-semibold px-4 py-2 hover:bg-rojo/80"
          >
            Bloquear
          </button>
        </div>
      </section>
    </div>
  );
}
