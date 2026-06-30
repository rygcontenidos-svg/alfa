"use client";

import { useState } from "react";
import type { Completar as CompletarType } from "@/lib/tipos";
import FiguraMatematica from "@/components/FiguraMatematica";

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

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed">
          {ej.consigna}
        </p>

        {"figura" in ej && ej.figura && (
          <FiguraMatematica def={ej.figura} />
        )}

        <div className="space-y-4">
          {ej.items.map((it) => (
            <div key={it.id}>
              <p className="text-sm text-grafito mb-1.5">{it.pregunta}</p>

              {it.subtipo === "select" && it.opciones ? (
                <div className="flex gap-2">
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
                        {opt === "Sí" ? "Sí" : opt === "No" ? "No" : opt}
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
      </div>
    </div>
  );
}
