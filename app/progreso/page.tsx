"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthProvider";
import { listarModulos } from "@/lib/modulos";
import { estadoDe, progresoPct } from "@/lib/progreso";

const MATERIAS = [
  { id: "lengua", label: "Lengua" },
  { id: "matematica", label: "Matemática" },
  { id: "historia", label: "Historia" },
];

export default function ProgresoPage() {
  const { usuario, cargando } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Record<string, { pct: number; completados: string[] }>>({});

  useEffect(() => {
    if (cargando) return;
    if (!usuario) {
      router.push("/login");
      return;
    }
    const modulos = listarModulos();
    const s: Record<string, any> = {};
    for (const m of modulos) {
      const e = estadoDe(m.id, usuario);
      s[m.id] = { pct: progresoPct(e), completados: e.completados };
    }
    setStats(s);
  }, [usuario, cargando, router]);

  if (cargando) return <div className="p-8 text-center text-gris">Cargando...</div>;
  if (!usuario) return null;

  const modulos = listarModulos();
  const totalPasos = modulos.length * 6;
  const totalCompletados = Object.values(stats).reduce((acc, s) => acc + s.completados.length, 0);
  const globalPct = totalPasos > 0 ? Math.round((totalCompletados / totalPasos) * 100) : 0;
  const modulosCompletos = Object.values(stats).filter((s) => s.pct === 100).length;

  return (
    <div className="min-h-screen w-full mx-auto px-6 sm:px-10 lg:px-16 py-8">
      <main className="max-w-[1400px] mx-auto w-full">
        <header className="mb-6">
          <Link href="/" className="text-xs text-gris hover:text-azul">
            ← Volver al inicio
          </Link>
          <div className="mt-2">
            <h1 className="text-xl font-bold text-grafito">Mi progreso</h1>
            <p className="text-sm text-gris">{usuario}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-borde bg-white p-5 text-center">
            <p className="text-3xl font-bold text-azul">{globalPct}%</p>
            <p className="text-xs text-gris mt-1">Progreso general</p>
          </div>
          <div className="rounded-xl border border-borde bg-white p-5 text-center">
            <p className="text-3xl font-bold text-verde">{modulosCompletos}</p>
            <p className="text-xs text-gris mt-1">Clases completas</p>
          </div>
          <div className="rounded-xl border border-borde bg-white p-5 text-center">
            <p className="text-3xl font-bold text-grafito">{modulos.length}</p>
            <p className="text-xs text-gris mt-1">Clases totales</p>
          </div>
        </div>

        {MATERIAS.map((mat) => {
          const ms = modulos.filter((m) => m.materia === mat.id);
          const msConProgreso = ms.filter((m) => stats[m.id]);
          if (msConProgreso.length === 0) return null;
          return (
            <section key={mat.id} className="mb-8">
              <h2 className="text-base font-semibold text-grafito mb-3">
                {mat.label}
              </h2>
              <div className="space-y-3">
                {ms.map((m) => {
                  const s = stats[m.id];
                  if (!s) return null;
                  return (
                    <Link
                      key={m.id}
                      href={`/modulo/${m.id}`}
                      className="block rounded-xl border border-borde bg-white p-4 hover:border-azul transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-grafito">
                            {m.titulo}
                          </p>
                          <div className="mt-2 h-2 w-full rounded-full bg-borde overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${s.pct}%`,
                                backgroundColor:
                                  s.pct === 100
                                    ? "var(--color-verde, #16a34a)"
                                    : "var(--color-azul, #1e3a8a)",
                              }}
                            />
                          </div>
                        </div>
                        <span
                          className="text-sm font-bold shrink-0"
                          style={{
                            color:
                              s.pct === 100
                                ? "var(--color-verde, #16a34a)"
                                : "var(--color-azul, #1e3a8a)",
                          }}
                        >
                          {s.pct}%
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
