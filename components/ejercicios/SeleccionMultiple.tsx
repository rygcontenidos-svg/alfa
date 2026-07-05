"use client";

import { useState } from "react";
import type { SeleccionMultiple as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";
import FiguraMatematica from "@/components/FiguraMatematica";

export default function SeleccionMultiple({
  ej,
  moduloId,
}: {
  ej: T;
  moduloId: string;
}) {
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [comprobado, setComprobado] = useState(false);

  function seleccionar(id: string) {
    setSeleccion(id);
    setComprobado(false);
  }

  function comprobar() {
    setComprobado(true);
  }

  function reiniciar() {
    setSeleccion(null);
    setComprobado(false);
  }

  return (
    <EjercicioShell consigna={ej.consigna} moduloId={moduloId} ejercicioId={ej.id}>
      {(revelado) => (
        <div className="space-y-2">
          {"figura" in ej && ej.figura && (
            <FiguraMatematica def={ej.figura} />
          )}
          {ej.opciones.map((op) => {
            const esSeleccionada = seleccion === op.id;
            const esCorrecta = revelado ? op.id === ej.correcta : comprobado && esSeleccionada && op.id === ej.correcta;
            const esError = comprobado && esSeleccionada && op.id !== ej.correcta;

            return (
              <button
                key={op.id}
                type="button"
                disabled={comprobado || revelado}
                onClick={() => seleccionar(op.id)}
                className={`w-full text-left rounded-lg border px-4 py-3 text-sm leading-relaxed transition-colors ${
                  revelado
                    ? op.id === ej.correcta
                      ? "border-verde bg-verde-claro text-verde font-semibold"
                      : "border-borde"
                    : comprobado
                      ? esCorrecta
                        ? "border-verde bg-verde-claro text-verde font-semibold"
                        : esError
                          ? "border-red-300 bg-red-50"
                          : "border-borde"
                      : esSeleccionada
                        ? "border-azul bg-azul-fondo"
                        : "border-borde hover:border-azul-claro"
                }`}
              >
                <span className="font-semibold mr-2">{op.id.toUpperCase()})</span>
                {op.texto}
                {esCorrecta && <i className="fa-solid fa-circle-check ml-2 text-verde" />}
                {esError && <i className="fa-solid fa-circle-xmark ml-2 text-red-500" />}
              </button>
            );
          })}

          {!revelado && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <button type="button" onClick={comprobar} disabled={!seleccion || comprobado} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-verde text-white hover:bg-verde/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Comprobar
              </button>
              {comprobado && (
                <button type="button" onClick={reiniciar} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-borde text-grafito hover:bg-gray-50 transition-colors">
                  Reiniciar
                </button>
              )}
            </div>
          )}

          {revelado && "explicacion" in ej && ej.explicacion && (
            <div className="mt-3 rounded-lg border border-verde bg-verde-claro/50 p-3">
              <p className="text-xs font-semibold text-verde mb-1 uppercase tracking-wide">
                <i className="fa-solid fa-circle-info mr-1" />Explicación
              </p>
              <p className="text-sm text-grafito leading-relaxed whitespace-pre-line">{ej.explicacion}</p>
            </div>
          )}
        </div>
      )}
    </EjercicioShell>
  );
}
