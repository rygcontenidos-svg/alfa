"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import type { UnirFlechas as UnirFlechasType } from "@/lib/tipos";
import { useAuth } from "@/app/AuthProvider";

async function fetchSinRespuestas(): Promise<string[]> {
  try { const res = await fetch("/api/permisos"); const data = await res.json(); return data.sinRespuestas ?? []; }
  catch { return []; }
}

export default function UnirFlechas({ ej, moduloId }: { ej: UnirFlechasType; moduloId: string }) {
  const [mostrar, setMostrar] = useState(false);
  const { usuario } = useAuth();
  const [sinRespuestas, setSinRespuestas] = useState(true);
  const paresMap = new Map(ej.pares.map((p) => [p.izquierda_id, p.derecha_id]));

  const derechaShuffle = useMemo(() => {
    const arr = [...ej.derecha];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [ej.id]);

  const verificar = useCallback(async () => {
    if (!usuario) return;
    const b = await fetchSinRespuestas();
    if (b.length === 0) { setSinRespuestas(false); return; }
    setSinRespuestas(b.some(x => usuario === x || usuario.startsWith(x + "@")));
  }, [usuario]);

  useEffect(() => { verificar(); }, [verificar]);

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed">{ej.consigna}</p>
        {!mostrar ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              {ej.izquierda.map((it, idx) => (
                <div key={it.id} className="rounded-lg border border-borde bg-gray-50 px-3 py-2 text-sm text-grafito">
                  <span className="font-semibold text-azul mr-1.5">{idx + 1}.</span>{it.texto}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {derechaShuffle.map((it, idx) => (
                <div key={it.id} className="rounded-lg border border-borde bg-gray-50 px-3 py-2 text-sm text-grafito">
                  <span className="font-semibold text-gris mr-1.5">{String.fromCharCode(65 + idx)}.</span>{it.texto}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {ej.pares.map((p) => {
              const izq = ej.izquierda.find((i) => i.id === p.izquierda_id);
              const der = ej.derecha.find((d) => d.id === p.derecha_id);
              return (
                <div key={p.izquierda_id} className="rounded-lg border border-verde bg-verde-claro px-3 py-2 flex items-start gap-2 text-sm">
                  <span className="shrink-0 text-verde font-bold">↔</span>
                  <span className="text-grafito flex-1">{izq?.texto}</span>
                  <span className="shrink-0 text-verde font-bold">↔</span>
                  <span className="text-grafito flex-1">{der?.texto}</span>
                </div>
              );
            })}
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
