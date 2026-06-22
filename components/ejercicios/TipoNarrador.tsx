"use client";

import type { TipoNarrador as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function TipoNarrador({
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
      guia="Anotá la opción correcta (a, b o c) y debajo escribí una cita del texto que la justifique."
    >
      {(revelado) => (
        <div className="space-y-3">
          <div className="space-y-2">
            {ej.opciones.map((op, idx) => {
              const esCorrecta = revelado && op === ej.correcta;
              return (
                <div
                  key={op}
                  className={`rounded-lg border px-4 py-2.5 text-base ${
                    esCorrecta
                      ? "border-verde bg-verde-claro text-verde font-semibold"
                      : "border-borde"
                  }`}
                >
                  <span className="font-bold text-azul mr-2">
                    {String.fromCharCode(97 + idx)})
                  </span>
                  {op}
                  {esCorrecta && <span className="ml-2">✓</span>}
                </div>
              );
            })}
          </div>
          {revelado && (
            <div>
              <p className="text-sm font-medium text-grafito mb-1">
                <span className="font-bold text-azul mr-1.5">
                  {String.fromCharCode(97 + ej.opciones.length)})
                </span>
                Cita que justifica:
              </p>
              <p className="text-base text-gris italic bg-azul-fondo rounded-lg px-3 py-2">
                “{ej.cita_justificacion}”
              </p>
            </div>
          )}
        </div>
      )}
    </EjercicioShell>
  );
}
