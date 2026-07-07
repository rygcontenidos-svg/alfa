"use client";

import { useEffect, useState, useCallback } from "react";
import type { CompletarCuadro as CompletarCuadroType } from "@/lib/tipos";
import { useAuth } from "@/app/AuthProvider";

async function fetchSinRespuestas(): Promise<string[]> {
  try { const res = await fetch("/api/permisos"); const data = await res.json(); return data.sinRespuestas ?? []; }
  catch { return []; }
}

export default function CompletarCuadro({ ej, moduloId }: { ej: CompletarCuadroType; moduloId: string }) {
  const [mostrar, setMostrar] = useState(false);
  const [comprobado, setComprobado] = useState(false);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const { usuario } = useAuth();
  const [sinRespuestas, setSinRespuestas] = useState(true);

  const verificar = useCallback(async () => {
    if (!usuario) return;
    const b = await fetchSinRespuestas();
    if (b.length === 0) { setSinRespuestas(false); return; }
    setSinRespuestas(b.some(x => usuario === x || usuario.startsWith(x + "@")));
  }, [usuario]);

  useEffect(() => { verificar(); }, [verificar]);

  function handleInput(filaId: string, colIdx: number, valor: string) {
    setRespuestas(s => ({ ...s, [`${filaId}_${colIdx}`]: valor }));
    setComprobado(false);
  }

  function comprobar() { setComprobado(true); }
  function reiniciar() { setRespuestas({}); setComprobado(false); setMostrar(false); }

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed whitespace-pre-line">{ej.consigna}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr>{ej.columnas.map((col, i) => <th key={i} className="border border-borde bg-gray-50 px-3 py-2 text-left font-semibold text-grafito">{col}</th>)}</tr></thead>
            <tbody>
              {ej.filas.map((fila) => (
                <tr key={fila.id}>
                  {fila.celdas.map((celda, j) => {
                    const esDato = j === 0;
                    const clave = `${fila.id}_${j}`;
                    const valor = respuestas[clave] ?? "";
                    const correcta = celda.trim();
                    const esCorrecto = comprobado && valor.trim().toLowerCase() === correcta.toLowerCase();
                    const esError = comprobado && valor.trim() && !esCorrecto;

                    if (esDato || mostrar) {
                      return (
                        <td key={j} className="border border-borde px-3 py-2 text-verde font-medium whitespace-pre-wrap">
                          {celda || "______"}
                        </td>
                      );
                    }

                    return (
                      <td key={j} className="border border-borde px-3 py-1.5 align-top">
                        <textarea
                          value={valor}
                          onChange={(e) => handleInput(fila.id, j, e.target.value)}
                          disabled={mostrar}
                          placeholder="Escribí tu respuesta..."
                          rows={Math.max(2, celda.split(". ").length, celda.split("\n").length)}
                          className={`w-full rounded border px-2 py-1 text-xs placeholder:text-gris/40 focus:outline-none focus:border-azul resize-y ${
                            esCorrecto
                              ? "border-verde bg-verde-claro text-verde"
                              : esError
                              ? "border-red-300 bg-red-50 text-red-500"
                              : "border-borde"
                          }`}
                        />
                        {comprobado && (
                          <p className={`mt-0.5 text-[10px] font-medium ${esCorrecto ? "text-verde" : "text-verde"}`}>
                            {esCorrecto ? "¡Correcto!" : `Correcta: ${celda}`}
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!mostrar && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <button type="button" onClick={comprobar} disabled={comprobado} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-verde text-white hover:bg-verde/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Comprobar
            </button>
            {comprobado && (
              <button type="button" onClick={reiniciar} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-borde text-grafito hover:bg-gray-50 transition-colors">
                Reiniciar
              </button>
            )}
          </div>
        )}
      </div>
      <div className="border-t border-borde px-4 py-3 flex justify-between items-center gap-3">
        <span className="text-[10px] text-gris uppercase tracking-wide">{moduloId}</span>
        {!sinRespuestas && (
          <button type="button" onClick={() => setMostrar((v) => !v)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${mostrar ? "bg-gray-100 text-grafito" : "bg-azul text-white hover:bg-azul-claro"}`}>{mostrar ? "Ocultar respuestas" : "Ver respuestas"}</button>
        )}
      </div>
    </div>
  );
}
