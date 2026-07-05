"use client";

import { useEffect, useState, useCallback } from "react";
import Card from "../Card";
import { leerCheck, setCheck } from "@/lib/progreso";
import { useAuth } from "@/app/AuthProvider";

async function fetchSinRespuestas(): Promise<string[]> {
  try {
    const res = await fetch("/api/permisos");
    const data = await res.json();
    return data.sinRespuestas ?? [];
  } catch {
    return [];
  }
}

export function EjercicioShell({
  consigna,
  moduloId,
  ejercicioId,
  guia,
  children,
}: {
  consigna: string;
  moduloId: string;
  ejercicioId: string;
  guia?: string;
  children: (revelado: boolean) => React.ReactNode;
}) {
  const { usuario } = useAuth();
  const [revelado, setRevelado] = useState(false);
  const [check, setCheckState] = useState<"bien" | "repasar" | null>(null);
  const [sinRespuestas, setSinRespuestas] = useState(true);
  const [cargandoPermisos, setCargandoPermisos] = useState(true);

  const verificarPermisos = useCallback(async () => {
    if (!usuario) { setSinRespuestas(true); setCargandoPermisos(false); return; }
    const bloqueados = await fetchSinRespuestas();
    if (bloqueados.length === 0) { setSinRespuestas(false); setCargandoPermisos(false); return; }
    const bloqueado = bloqueados.some(b => usuario === b || usuario.startsWith(b + "@"));
    setSinRespuestas(bloqueado);
    setCargandoPermisos(false);
  }, [usuario]);

  useEffect(() => {
    verificarPermisos();
  }, [verificarPermisos]);

  useEffect(() => {
    setCheckState(leerCheck(moduloId, ejercicioId, usuario));
  }, [moduloId, ejercicioId, usuario]);

  function autocheck(v: "bien" | "repasar") {
    const nuevo = check === v ? null : v;
    setCheckState(nuevo);
    setCheck(moduloId, ejercicioId, nuevo, usuario);
  }

  return (
    <Card titulo={consigna}>
      {children(revelado)}

      <div className="mt-4 border-t border-borde pt-3 flex items-center justify-between gap-3 flex-wrap">
        {revelado ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gris">¿Cómo te fue?</span>
            <button type="button" onClick={() => autocheck("bien")} className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${check === "bien" ? "bg-verde text-white border-verde" : "border-verde text-verde hover:bg-verde-claro"}`}>
              <i className="fa-solid fa-circle-check mr-1" />Bien
            </button>
            <button type="button" onClick={() => autocheck("repasar")} className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${check === "repasar" ? "bg-amarillo text-white border-amarillo" : "border-amarillo text-amarillo hover:bg-amarillo-claro"}`}>
              <i className="fa-solid fa-pen-to-square mr-1" />A repasar
            </button>
          </div>
        ) : (
          <span className="text-xs text-grafito">Respondé directamente en pantalla.</span>
        )}
        <div className="flex items-center gap-2">
          {!sinRespuestas && !cargandoPermisos && (
            <button type="button" onClick={() => setRevelado((v) => !v)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${revelado ? "bg-gray-100 text-grafito" : "bg-azul text-white hover:bg-azul-claro"}`}>
              {revelado ? "Ocultar respuestas" : "Ver respuestas"}
            </button>
          )}
        </div>
      </div>

      {check === "bien" && (
        <p className="text-xs text-verde mt-2"><i className="fa-solid fa-circle-check mr-1" />Marcado como logrado.</p>
      )}
      {check === "repasar" && (
        <p className="text-xs text-amarillo mt-2"><i className="fa-solid fa-pen-to-square mr-1" />Anotado para repasar en el paso Mejorá.</p>
      )}
    </Card>
  );
}
