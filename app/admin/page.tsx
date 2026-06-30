"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthProvider";
import { esAdmin } from "@/lib/permisos";

type ProgresoUsuario = {
  username: string;
  email: string;
  lastSignIn: string | null;
  progress: {
    modulo_id: string;
    estado: {
      completados: string[];
      actual: string;
      checks: Record<string, string>;
    };
  }[];
};

export default function AdminPage() {
  const { usuario, cargando } = useAuth();
  const router = useRouter();
  const [permisos, setPermisos] = useState<{ admins: string[]; sinRespuestas: string[] } | null>(null);
  const [usuarios, setUsuarios] = useState<ProgresoUsuario[]>([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [expandido, setExpandido] = useState<string | null>(null);

  useEffect(() => {
    if (!cargando && !esAdmin(usuario)) {
      router.push("/");
    }
  }, [usuario, cargando, router]);

  useEffect(() => {
    fetch("/api/permisos")
      .then((r) => r.json())
      .then(setPermisos);
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    setCargandoUsuarios(true);
    try {
      const res = await fetch("/api/admin/usuarios");
      const data = await res.json();
      if (data.usuarios) setUsuarios(data.usuarios);
    } catch (e) {
      console.error(e);
    }
    setCargandoUsuarios(false);
  }

  async function toggle(usuario: string) {
    const res = await fetch("/api/permisos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toggle: usuario }),
    });
    const data = await res.json();
    setPermisos(data);
  }

  function contarChecks(progress: ProgresoUsuario["progress"], tipo: string) {
    let total = 0;
    progress.forEach((p) => {
      if (p.estado?.checks) {
        Object.values(p.estado.checks).forEach((v) => {
          if (v === tipo) total++;
        });
      }
    });
    return total;
  }

  function moduloIds(progress: ProgresoUsuario["progress"]) {
    return progress.map((p) => p.modulo_id);
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
    <div className="max-w-[800px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-grafito mb-1">Panel de Administrador</h1>
          <p className="text-sm text-gris">Usuario: {usuario}</p>
        </div>
        <button
          onClick={cargarUsuarios}
          disabled={cargandoUsuarios}
          className="text-xs text-azul font-semibold hover:underline"
        >
          {cargandoUsuarios ? "Cargando..." : "⟳ Actualizar"}
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-grafito mb-3 uppercase tracking-wide">
          Alumnos
        </h2>
        <div className="space-y-3">
          {usuarios.map((u) => {
            const bloqueado = permisos.sinRespuestas.includes(u.username);
            const bien = contarChecks(u.progress, "bien");
            const repasar = contarChecks(u.progress, "repasar");
            const mods = moduloIds(u.progress);
            return (
              <div
                key={u.username}
                className={`rounded-lg border px-4 py-3 ${
                  bloqueado ? "border-rojo bg-rojo-claro/20" : "border-borde bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-grafito">
                      {bloqueado ? "🚫 " : "👤 "}{u.username}
                    </p>
                    <p className="text-xs text-gris">{u.email}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-verde font-medium">✓ {bien} bien</span>
                      <span className="text-xs text-amarillo font-medium">✎ {repasar} repasar</span>
                      <span className="text-xs text-gris">{mods.length} módulos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandido(expandido === u.username ? null : u.username)}
                      className="text-xs text-azul font-semibold hover:underline"
                    >
                      {expandido === u.username ? "Ocultar" : "Detalle"}
                    </button>
                    <button
                      onClick={() => toggle(u.username)}
                      className={`text-xs font-semibold px-3 py-1 rounded-md border transition-colors ${
                        bloqueado
                          ? "border-verde text-verde hover:bg-verde-claro"
                          : "border-rojo text-rojo hover:bg-rojo-claro"
                      }`}
                    >
                      {bloqueado ? "Habilitar" : "Bloquear"}
                    </button>
                  </div>
                </div>
                {expandido === u.username && u.progress.length > 0 && (
                  <div className="mt-3 border-t border-borde pt-3 space-y-2">
                    {u.progress.map((p) => (
                      <div key={p.modulo_id} className="text-xs">
                        <p className="font-semibold text-grafito">{p.modulo_id}</p>
                        <p className="text-gris">
                          Completados: {p.estado?.completados?.length ?? 0} pasos · Actual: {p.estado?.actual ?? "-"}
                        </p>
                        {p.estado?.checks && Object.keys(p.estado.checks).length > 0 && (
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {Object.entries(p.estado.checks).map(([ejId, val]) => (
                              <span
                                key={ejId}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                                  val === "bien"
                                    ? "bg-verde-claro text-verde"
                                    : "bg-amarillo-claro text-amarillo"
                                }`}
                              >
                                {ejId}: {val === "bien" ? "✓" : "✎"}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {usuarios.length === 0 && !cargandoUsuarios && (
            <p className="text-sm text-gris">No se pudieron cargar los usuarios. Verificá SUPABASE_SERVICE_KEY.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-grafito mb-3 uppercase tracking-wide">
          Bloquear respuestas
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
