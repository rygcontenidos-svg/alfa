"use client";

import { use, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { listarModulos } from "@/lib/modulos";
import { estadoDe, progresoPct } from "@/lib/progreso";
import { useAuth } from "@/app/AuthProvider";

const MATERIA_INFO: Record<string, { label: string; icono: string; color: string }> = {
  lengua: { label: "Lengua", icono: "fa-solid fa-book", color: "#FF2070" },
  matematica: { label: "Matemática", icono: "fa-solid fa-calculator", color: "#0e1cc3" },
  historia: { label: "Historia", icono: "fa-solid fa-landmark", color: "#FFAE00" },
  geografia: { label: "Geografía", icono: "fa-solid fa-earth-americas", color: "#ACEC00" },
};

function CardPill({
  id,
  label,
  color,
  seleccionado,
  completado,
  onClick,
}: {
  id: string;
  label: React.ReactNode;
  color: string;
  seleccionado: boolean;
  completado: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[13px] font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5"
      style={{
        backgroundColor: seleccionado ? color : "#F8F9FC",
        color: seleccionado ? "#FFFFFF" : "#6B7280",
        border: seleccionado ? `2px solid ${color}` : "2px solid #ECEEF7",
      }}
    >
      {label}
      {completado && (
        <i
          className="fa-solid fa-circle-check"
          style={{ fontSize: "10px", color: seleccionado ? "rgba(255,255,255,0.7)" : "#16a34a" }}
        />
      )}
    </button>
  );
}

export default function MateriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { usuario } = useAuth();
  const info = MATERIA_INFO[slug] ?? { label: slug, icono: "fa-solid fa-book", color: "#FF2070" };
  const todos = useMemo(() => listarModulos(), []);
  const modulos = useMemo(() => todos.filter((m) => m.materia === slug), [todos, slug]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [activo, setActivo] = useState<string | null>(null);

  const clases = useMemo(() => modulos.filter((m) => m.tipo !== "simulacro"), [modulos]);
  const simulacros = useMemo(() => modulos.filter((m) => m.tipo === "simulacro"), [modulos]);

  useEffect(() => {
    if (clases.length > 0 && !activo) {
      setActivo(clases[0].id);
    }
  }, [clases, activo]);

  useEffect(() => {
    const s: Record<string, number> = {};
    for (const m of modulos) {
      s[m.id] = progresoPct(estadoDe(m.id, usuario));
    }
    setStats(s);
  }, [usuario, modulos]);

  const moduloActivo = activo ? modulos.find((m) => m.id === activo) : null;
  const pctActivo = activo ? (stats[activo] ?? 0) : 0;

  return (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[120px]" style={{ paddingTop: "80px", paddingBottom: "120px" }}>
        <Link href="/" className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: "#6B7280" }}>
          ← Inicio
        </Link>
        <div className="flex items-center gap-4 mt-6 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{ backgroundColor: info.color, color: "#FFFFFF" }}
          >
            <i className={info.icono} />
          </div>
          <div>
            <h1 className="text-[28px] font-semibold" style={{ color: "#16181D" }}>
              {info.label}
            </h1>
            <p className="text-[14px]" style={{ color: "#6B7280" }}>
              {clases.length} clases · {simulacros.length} simulacros
            </p>
          </div>
        </div>

        {/* Clases */}
        <p className="text-[15px] font-bold uppercase tracking-wide mb-1" style={{ color: "#16181D" }}>
          Período Pre Vacaciones de Invierno
        </p>
        <p className="text-[13px] font-semibold mb-3" style={{ color: "#6B7280" }}>
          Clases
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {clases.map((m, i) => (
            <CardPill
              key={m.id}
              id={m.id}
              label={`Clase ${i + 1}`}
              color={info.color}
              seleccionado={activo === m.id}
              completado={(stats[m.id] ?? 0) === 100}
              onClick={() => setActivo(activo === m.id ? null : m.id)}
            />
          ))}
        </div>

        {/* Detalle del activo */}
        {moduloActivo && (
          <div className="max-w-[800px] mb-10">
            <Link
              href={`/modulo/${moduloActivo.id}`}
              className="block rounded-[16px] p-5 hover:bg-[#F8F9FC] transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: `1.5px solid ${info.color}`, backgroundColor: "#FFFFFF" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold" style={{ color: "#16181D" }}>
                    {moduloActivo.titulo}
                  </p>
                  <p className="text-[13px] mt-1 line-clamp-3" style={{ color: "#6B7280" }}>
                    {moduloActivo.descripcion}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[12px]" style={{ color: "#6B7280" }}>
                      {moduloActivo.ejercicios?.length ?? 0} ejercicios
                    </span>
                    {moduloActivo.tipo === "simulacro" && (
                      <span className="text-[12px]" style={{ color: "#6B7280" }}>
                        · {moduloActivo.duracion_min ?? 90} minutos
                      </span>
                    )}
                    {usuario && pctActivo > 0 && (
                      <>
                        <span className="text-[12px]" style={{ color: "#6B7280" }}>·</span>
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-16 rounded-full overflow-hidden" style={{ backgroundColor: "#ECEEF7" }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${pctActivo}%`, backgroundColor: pctActivo === 100 ? "#16a34a" : info.color }}
                            />
                          </div>
                          <span className="text-[12px] font-medium" style={{ color: pctActivo === 100 ? "#16a34a" : info.color }}>
                            {pctActivo}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <span className="text-[20px] shrink-0 mt-1" style={{ color: info.color }}>→</span>
              </div>
            </Link>
          </div>
        )}
        {/* Simulacros */}
        {simulacros.length > 0 && (
          <>
            <p className="text-[13px] font-semibold mb-3 mt-10" style={{ color: "#6B7280" }}>
              Simulacros
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {simulacros.map((m) => (
                <CardPill
                  key={m.id}
                  id={m.id}
                  label={<><i className="fa-solid fa-stopwatch mr-1" />{m.titulo} · {m.duracion_min ?? 90} min</>}
                  color={info.color}
                  seleccionado={activo === m.id}
                  completado={(stats[m.id] ?? 0) === 100}
                  onClick={() => setActivo(activo === m.id ? null : m.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </SiteLayout>
  );
}
