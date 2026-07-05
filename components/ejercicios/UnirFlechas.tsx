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

  const opcionesDisponibles = useMemo(() => {
    const usadas = new Set(Object.values(selecciones).filter(Boolean));
    return derechaShuffle.map((d) => ({ ...d, usado: usadas.has(d.id) }));
  }, [derechaShuffle, selecciones]);

  const verificar = useCallback(async () => {
    if (!usuario) return;
    const b = await fetchSinRespuestas();
    if (b.length === 0) { setSinRespuestas(false); return; }
    setSinRespuestas(b.some(x => usuario === x || usuario.startsWith(x + "@")));
  }, [usuario]);

  useEffect(() => { verificar(); }, [verificar]);

  function handleSelect(izqId: string, derId: string) {
    setSelecciones((s) => ({ ...s, [izqId]: derId === s[izqId] ? "" : derId }));
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
        <p className="text-sm font-semibold text-grafito mb-4 leading-relaxed">{ej.consigna}</p>
        <div className="space-y-5">
          {ej.izquierda.map((izq, idx) => {
            const selId = selecciones[izq.id];
            const correctaId = ej.pares.find((p) => p.izquierda_id === izq.id)?.derecha_id;
            const correcto = comprobado && selId === correctaId;
            const incorrecto = comprobado && selId && selId !== correctaId;
            const defSeleccionada = ej.derecha.find((d) => d.id === selId);
            const opcionesParaEste = opcionesDisponibles.filter((o) => !o.usado || o.id === selId);

            return (
              <div key={izq.id} className="rounded-lg border border-borde bg-gray-50 p-3 sm:p-4">
                <p className="text-sm text-grafito font-semibold mb-2">{izq.texto}</p>
                {mostrar ? (
                  <div className="rounded-lg border border-verde bg-verde-claro px-3 py-2 text-sm text-grafito">
                    {ej.derecha.find((d) => d.id === correctaId)?.texto}
                  </div>
                ) : (
                  <>
                    <select
                      value={selId ?? ""}
                      onChange={(e) => {
                        if (e.target.value) handleSelect(izq.id, e.target.value);
                      }}
                      disabled={comprobado}
                      className={`w-full rounded-lg border px-3 py-2 text-sm ${
                        comprobado
                          ? correcto
                            ? "border-verde bg-verde-claro text-verde"
                            : selId
                              ? "border-red-300 bg-red-50 text-red-600"
                              : "border-borde bg-white text-grafito"
                          : "border-borde bg-white text-grafito"
                      }`}
                    >
                      <option value="">Seleccioná la definición correcta...</option>
                      {opcionesParaEste.map((der) => (
                        <option key={der.id} value={der.id}>{der.texto}</option>
                      ))}
                    </select>
                    {defSeleccionada && !comprobado && (
                      <div className="mt-2 rounded-lg border border-azul bg-azul-fondo px-3 py-2 text-sm text-grafito">
                        {defSeleccionada.texto}
                      </div>
                    )}
                  </>
                )}
                {comprobado && correcto && (
                  <p className="text-xs text-verde mt-1"><i className="fa-solid fa-circle-check mr-1" />Correcto</p>
                )}
                {comprobado && incorrecto && (
                  <p className="text-xs text-red-500 mt-1"><i className="fa-solid fa-circle-xmark mr-1" />Incorrecto</p>
                )}
              </div>
            );
          })}
        </div>

        {comprobado && (
          <div className="mt-4 rounded-lg bg-azul-fondo border border-azul-claro px-3 py-2 text-xs text-azul">
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
            <button type="button" onClick={() => setMostrar((v) => !v)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${mostrar ? "bg-gray-100 text-grafito" : "bg-azul text-white hover:bg-azul-claro"}`}>
              {mostrar ? "Ocultar respuestas" : "Ver respuestas"}
            </button>
          )}
          {!mostrar && (
            <>
              <button type="button" onClick={comprobar} disabled={!todosSeleccionados || comprobado} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-verde text-white hover:bg-verde/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Comprobar
              </button>
              {comprobado && (
                <button type="button" onClick={reiniciar} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-borde text-grafito hover:bg-gray-50 transition-colors">
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
