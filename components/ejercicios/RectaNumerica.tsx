"use client";

import { useEffect, useState, useCallback } from "react";
import type { RectaNumerica as RectaNumericaType } from "@/lib/tipos";
import { useAuth } from "@/app/AuthProvider";

async function fetchSR(): Promise<string[]> {
  try { const r = await fetch("/api/permisos"); const d = await r.json(); return d.sinRespuestas ?? ["mikuuchan00"]; }
  catch { return ["mikuuchan00"]; }
}

function rectaSVG(marcas: NonNullable<RectaNumericaType["marcas"]>) {
  const W = 600;
  const H = 100;
  const padL = 30;
  const padR = 30;
  const n = marcas.length - 1;
  const sep = (W - padL - padR) / n;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] h-auto mx-auto">
      <line x1={padL} y1={60} x2={W - padR} y2={60} stroke="#333" strokeWidth={2} />
      <polygon points={`${W - padR + 8},60 ${W - padR - 2},54 ${W - padR - 2},66`} fill="#333" />
      {marcas.map((m, i) => {
        const x = padL + i * sep;
        return (
          <g key={i}>
            <line x1={x} y1={52} x2={x} y2={68} stroke="#333" strokeWidth={2} />
            {m.etiqueta_superior && (
              <text x={x} y={38} textAnchor="middle" fontSize={14} fill="#2563eb" fontWeight={600}>
                {m.etiqueta_superior}
              </text>
            )}
            <text x={x} y={84} textAnchor="middle" fontSize={14} fill="#1e293b" fontWeight={500}>
              {m.etiqueta_inferior}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RectaNumerica({
  ej,
  moduloId,
}: {
  ej: RectaNumericaType;
  moduloId: string;
}) {
  const [mostrar, setMostrar] = useState(false);
  const [selecciones, setSelecciones] = useState<Record<string, string>>({});
  const { usuario } = useAuth();
  const [sinRespuestas, setSinRespuestas] = useState(true);
  const verificar = useCallback(async () => {
    if (!usuario) return; const b = await fetchSR();
    if (b.length === 0) return; setSinRespuestas(b.some(x => usuario === x || usuario.startsWith(x + "@")));
  }, [usuario]);
  useEffect(() => { verificar(); }, [verificar]);

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-4 leading-relaxed">
          {ej.consigna}
        </p>

        {ej.marcas && <div className="mb-5">{rectaSVG(ej.marcas)}</div>}

        <div className="space-y-6">
          {ej.items.map((it) => (
            <div key={it.id}>
              {"marcas" in it && it.marcas && (
                <div className="mb-3">{rectaSVG(it.marcas)}</div>
              )}
              <p className="text-sm text-grafito mb-1.5">{it.pregunta}</p>

              {it.subtipo === "select" && it.opciones ? (
                <div className="flex gap-2 flex-wrap">
                  {it.opciones.map((opt) => {
                    const sel = selecciones[it.id] === opt;
                    const esCorrecto = mostrar && opt === it.respuesta;
                    const esError = mostrar && sel && opt !== it.respuesta;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={mostrar}
                        onClick={() =>
                          setSelecciones((s) => ({ ...s, [it.id]: opt }))
                        }
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          mostrar && esCorrecto
                            ? "bg-verde-claro text-verde border border-verde"
                            : mostrar && esError
                            ? "bg-rojo-claro text-rojo border border-rojo"
                            : sel
                            ? "bg-azul text-white"
                            : "bg-gray-100 text-grafito hover:bg-gray-200"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="border-b border-dashed border-gris/40 pb-1 text-sm text-grafito min-h-[24px]">
                  {mostrar && it.respuesta ? (
                    <span className="text-verde font-medium">{it.respuesta}</span>
                  ) : (
                    <span className="text-gris/50">______</span>
                  )}
                </div>
              )}

              {mostrar && "explicacion" in it && it.explicacion && (
                <p className="mt-1 text-xs text-gris italic leading-relaxed">
                  {it.explicacion}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-borde px-4 py-3 flex justify-between items-center gap-3">
        <span className="text-[10px] text-gris uppercase tracking-wide">
          {moduloId}
        </span>
        {!sinRespuestas && (
          <button
            type="button"
            onClick={() => setMostrar((v) => !v)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              mostrar
                ? "bg-gray-100 text-grafito"
                : "bg-azul text-white hover:bg-azul-claro"
            }`}
          >
            {mostrar ? "Ocultar respuestas" : "Ver respuestas"}
          </button>
        )}
      </div>
    </div>
  );
}
