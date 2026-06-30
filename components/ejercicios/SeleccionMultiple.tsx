"use client";

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
  return (
    <EjercicioShell
      consigna={ej.consigna}
      moduloId={moduloId}
      ejercicioId={ej.id}
    >
      {(revelado) => (
        <div className="space-y-2">
          {"figura" in ej && ej.figura && (
            <FiguraMatematica def={ej.figura} />
          )}
          {ej.opciones.map((op) => {
            const esCorrecta = revelado && op.id === ej.correcta;
            return (
              <div
                key={op.id}
                className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${
                  esCorrecta
                    ? "border-verde bg-verde-claro text-verde font-semibold"
                    : "border-borde"
                }`}
              >
                <span className="font-semibold mr-2">
                  {op.id.toUpperCase()})
                </span>
                {op.texto}
                {esCorrecta && <span className="ml-2">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </EjercicioShell>
  );
}
