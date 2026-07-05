"use client";

import { useEffect, useState, useCallback } from "react";
import type { Completar as CompletarType } from "@/lib/tipos";
import FiguraMatematica from "@/components/FiguraMatematica";
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

type ItemConExplicacion = {
  id: string;
  subtipo: "texto" | "select";
  pregunta: string;
  respuesta?: string;
  opciones?: string[];
  explicacion?: string;
};

export default function Completar({
  ej,
  moduloId,
}: {
  ej: CompletarType & { items?: ItemConExplicacion[] };
  moduloId: string;
}) {
  const [mostrar, setMostrar] = useState(false);
  const [selecciones, setSelecciones] = useState<Record<string, string>>({});
  const [comprobado, setComprobado] = useState(false);
  const { usuario } = useAuth();
  const [sinRespuestas, setSinRespuestas] = useState(true);

  const verificar = useCallback(async () => {
    if (!usuario) return;
    const b = await fetchSinRespuestas();
    if (b.length === 0) { setSinRespuestas(false); return; }
    setSinRespuestas(b.some(x => usuario === x || usuario.startsWith(x + "@")));
  }, [usuario]);

  useEffect(() => { verificar(); }, [verificar]);

  function handleInput(id: string, valor: string) {
    setSelecciones((s) => ({ ...s, [id]: valor }));
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

  const itemsConTexto = ej.items.filter((it) => it.subtipo === "texto");
  const todosRespondidos = itemsConTexto.every((it) => selecciones[it.id]?.trim());

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed">{ej.consigna}</p>

        {"figura" in ej && ej.figura && (
          <FiguraMatematica def={ej.figura} />
        )}

        <div className="space-y-4">
          {ej.items.map((it, i) => (
            <div key={it.id}>
              <p className="text-sm text-grafito mb-1.5">{it.pregunta}</p>

              {"figura2" in ej && ej.figura2 && i === 0 && (
                <div className="mb-3">
                  <FiguraMatematica def={ej.figura2!} />
                </div>
              )}

              {it.subtipo === "select" && it.opciones ? (
                <div className="flex gap-2">
                  {it.opciones.map((opt) => {
                    const sel = selecciones[it.id] === opt;
                    const esCorrecto = (mostrar || comprobado) && opt === it.respuesta;
                    const esError = (mostrar || comprobado) && sel && opt !== it.respuesta;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={mostrar || comprobado}
                        onClick={() => handleInput(it.id, opt)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          (mostrar || comprobado) && esCorrecto
                            ? "bg-verde-claro text-verde border border-verde"
                            : (mostrar || comprobado) && esError
                            ? "bg-red-50 text-red-500 border border-red-300"
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
                <div>
                  <textarea
                    value={selecciones[it.id] ?? ""}
                    onChange={(e) => handleInput(it.id, e.target.value)}
                    disabled={mostrar}
                    placeholder="Escribí tu respuesta acá..."
                    rows={3}
                    className={`w-full rounded-lg border px-3 py-2 text-sm placeholder:text-gris/50 focus:outline-none focus:border-azul resize-y ${
                      mostrar
                        ? "border-verde bg-verde-claro text-verde"
                        : comprobado
                          ? "border-verde bg-verde-claro text-grafito"
                          : "border-borde"
                    }`}
                  />
                  {(mostrar || comprobado) && it.respuesta && (
                    <div className="mt-1.5 rounded-lg bg-verde-claro border border-verde px-3 py-1.5">
                      <p className="text-xs font-semibold text-verde mb-0.5">Respuesta modelo:</p>
                      <p className="text-sm text-grafito whitespace-pre-wrap">{it.respuesta}</p>
                    </div>
                  )}
                </div>
              )}

              {mostrar && "explicacion" in it && it.explicacion && (
                <p className="mt-1 text-xs text-gris italic leading-relaxed">{it.explicacion}</p>
              )}
            </div>
          ))}
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
          <button type="button" onClick={() => setMostrar((v) => !v)} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${mostrar ? "bg-gray-100 text-grafito" : "bg-azul text-white hover:bg-azul-claro"}`}>
            {mostrar ? "Ocultar respuestas" : "Ver respuestas"}
          </button>
        )}
      </div>
    </div>
  );
}
