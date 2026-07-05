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
  const [comprobado, setComprobado] = useState(false);
  const [selecciones, setSelecciones] = useState<Record<string, string>>({});
  const { usuario } = useAuth();
  const [sinRespuestas, setSinRespuestas] = useState(true);

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

  function handleSelect(izqId: string, derId: string) {
    setSelecciones((s) => ({ ...s, [izqId]: derId }));
    setComprobado(false);
  }

  function comprobar() {
    setComprobado(true);
  }

  function reiniciar() {
    setSelecciones({});
    setComprobado(false);
    setMostrar(false);
  }

  const todosSeleccionados = ej.izquierda.every((it) => selecciones[it.id]);

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed">{ej.consigna}</p>
        <div className="space-y-3">
          {ej.izquierda.map((izq, idx) => {
            const selId = selecciones[izq.id];
            const correcto = comprobado && selId === ej.pares.find((p) => p.izquierda_id === izq.id)?.derecha_id;
            const incorrecto = comprobado && selId && selId !== ej.pares.find((p) => p.izquierda_id === izq.id)?.derecha_id;

            return (
              <div
                key={izq.id}
                className={`rounded-lg border px-3 py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${
                  mostrar || correcto
                    ? "border-verde bg-verde-claro"
                    : incorrecto
                      ? "border-red-300 bg-red-50"
                      : "border-borde bg-gray-50"
                }`}
              >
                <span className="text-sm text-grafito flex-1 min-w-0">
                  <span className="font-semibold text-azul mr-1.5">{idx + 1}.</span>
                  {izq.texto}
                </span>
                <span className="text-verde font-bold shrink-0 hidden sm:inline">↔</span>
                {mostrar ? (
                  <span className="text-sm text-grafito flex-1 min-w-0">
                    {ej.derecha.find((d) => d.id === ej.pares.find((p) => p.izquierda_id === izq.id)?.derecha_id)?.texto}
                  </span>
                ) : (
                  <select
                    value={selId ?? ""}
                    onChange={(e) => handleSelect(izq.id, e.target.value)}
                    className={`rounded-lg border px-2.5 py-1.5 text-sm min-w-0 w-full sm:w-auto ${
                      comprobado
                        ? correcto
                          ? "border-verde bg-white text-verde"
                          : selId
                            ? "border-red-300 bg-white text-red-600"
                            : "border-borde bg-white text-grafito"
                        : "border-borde bg-white text-grafito"
                    }`}
                  >
                    <option value="">Seleccioná...</option>
                    {derechaShuffle.map((der) => (
                      <option key={der.id} value={der.id}>
                        {der.texto.length > 70 ? der.texto.slice(0, 70) + "…" : der.texto}
                      </option>
                    ))}
                  </select>
                )}
                {comprobado && correcto && (
                  <i className="fa-solid fa-circle-check text-verde shrink-0 text-sm" />
                )}
                {comprobado && incorrecto && (
                  <i className="fa-solid fa-circle-xmark text-red-500 shrink-0 text-sm" />
                )}
              </div>
            );
          })}
        </div>

        {comprobado && (
          <div className="mt-3 rounded-lg bg-azul-fondo border border-azul-claro px-3 py-2 text-xs text-azul">
            {ej.izquierda.every((izq) => selecciones[izq.id] === ej.pares.find((p) => p.izquierda_id === izq.id)?.derecha_id)
              ? "¡Todas las correspondencias son correctas!"
              : "Algunas correspondencias no son correctas. Las incorrectas están marcadas en rojo."}
          </div>
        )}
      </div>
      <div className="border-t border-borde px-4 py-3 flex justify-between items-center gap-3 flex-wrap">
        <span className="text-[10px] text-gris uppercase tracking-wide">{moduloId}</span>
        <div className="flex items-center gap-2">
          {!sinRespuestas && (
            <button
              type="button"
              onClick={() => setMostrar((v) => !v)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                mostrar ? "bg-gray-100 text-grafito" : "bg-azul text-white hover:bg-azul-claro"
              }`}
            >
              {mostrar ? "Ocultar respuestas" : "Ver respuestas"}
            </button>
          )}
          {!mostrar && (
            <>
              <button
                type="button"
                onClick={comprobar}
                disabled={!todosSeleccionados || comprobado}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-verde text-white hover:bg-verde/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Comprobar
              </button>
              {comprobado && (
                <button
                  type="button"
                  onClick={reiniciar}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-borde text-grafito hover:bg-gray-50 transition-colors"
                >
                  Reiniciar
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
