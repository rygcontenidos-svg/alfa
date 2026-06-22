"use client";

import type { ReescrituraNormativa as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function ReescrituraNormativa({
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
        <div className="space-y-3">
          {ej.versiones.map((v) => {
            const esCorrecta = revelado && v.id === ej.correcta;
            return (
              <div
                key={v.id}
                className={`rounded-lg border px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  esCorrecta
                    ? "border-verde bg-verde-claro text-verde font-semibold"
                    : "border-borde"
                }`}
              >
                <span className="block text-xs font-semibold text-gris mb-1">
                  Versión {v.id.toUpperCase()}
                </span>
                {v.texto}
                {esCorrecta && <span className="block mt-1">✓ Correcta</span>}
              </div>
            );
          })}
        </div>
      )}
    </EjercicioShell>
  );
}
