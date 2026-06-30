"use client";

import { useEffect, useState, useCallback } from "react";
import type { UnirFlechas as UnirFlechasType } from "@/lib/tipos";
import { useAuth } from "@/app/AuthProvider";

async function fetchSinRespuestas(): Promise<string[]> {
  try { const res = await fetch("/api/permisos"); const data = await res.json(); return data.sinRespuestas ?? ["mikuuchan00"]; }
  catch { return ["mikuuchan00"]; }
}

export default function UnirFlechas({ ej, moduloId }: { ej: UnirFlechasType; moduloId: string }) {
  const [mostrar, setMostrar] = useState(false);
  const { usuario } = useAuth();
  const [sinRespuestas, setSinRespuestas] = useState(true);
  const paresMap = new Map(ej.pares.map((p) => [p.izquierda_id, p.derecha_id]));

  const verificar = useCallback(async () => {
    if (!usuario) return;
    const b = await fetchSinRespuestas();
    if (b.length === 0) return;
    setSinRespuestas(b.includes(usuario));
  }, [usuario]);

  useEffect(() => { verificar(); }, [verificar]);

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed">{ej.consigna}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {ej.izquierda.map((it) => (
              <div key={it.id} className="rounded-lg border border-borde bg-gray-50 px-3 py-2 text-sm text-grafito">{it.texto}</div>
            ))}
          </div>
          <div className="space-y-2">
            {ej.derecha.map((it) => (
              <div key={it.id} className="rounded-lg border border-borde bg-gray-50 px-3 py-2 text-sm text-grafito">
                {mostrar && <span className="text-verde font-medium mr-1">⇢ </span>}{it.texto}
              </div>
            ))}
          </div>
        </div>
        {mostrar && (
          <div className="mt-3 rounded-lg bg-verde-claro border border-verde px-3 py-2">
            <p className="text-xs font-semibold text-verde mb-1">Correspondencia correcta:</p>
            <div className="space-y-0.5">
              {ej.pares.map((p) => {
                const izq = ej.izquierda.find((i) => i.id === p.izquierda_id);
                const der = ej.derecha.find((d) => d.id === p.derecha_id);
                return <p key={p.izquierda_id} className="text-xs text-grafito">{izq?.texto} ↔ {der?.texto}</p>;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-borde px-4 py-3 flex justify-between items-center gap-3">
        <span className="text-[10px] text-gris uppercase tracking-wide">{moduloId}</span>
        {!sinRespuestas && (
          <button type="button" onClick={() => setMostrar((v) => !v)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${mostrar ? "bg-gray-100 text-grafito" : "bg-azul text-white hover:bg-azul-claro"}`}>
            {mostrar ? "Ocultar respuestas" : "Ver respuestas"}
          </button>
        )}
      </div>
    </div>
  );
}
