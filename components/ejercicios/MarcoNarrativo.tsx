"use client";

import type { MarcoNarrativo as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function MarcoNarrativo({
  ej,
  moduloId,
}: {
  ej: T;
  moduloId: string;
}) {
  const filas = [
    { label: "Personajes", valor: ej.personajes },
    { label: "Lugar", valor: ej.lugar },
    { label: "Tiempo", valor: ej.tiempo },
  ];
  return (
    <EjercicioShell
      consigna={ej.consigna}
      moduloId={moduloId}
      ejercicioId={ej.id}
      guia="Copiá el esquema en tu cuaderno (Personajes / Lugar / Tiempo) y completá cada casillero."
    >
      {(revelado) => (
        <div className="space-y-2">
          {filas.map((f, idx) => (
            <div
              key={f.label}
              className="grid grid-cols-[28px_120px_1fr] items-center gap-3 border-b border-borde py-2 last:border-0"
            >
              <span className="text-sm font-bold text-azul">
                {String.fromCharCode(97 + idx)})
              </span>
              <span className="text-sm font-medium text-grafito">
                {f.label}
              </span>
              <span
                className={`text-base rounded-lg px-3 py-2 ${
                  revelado
                    ? "bg-verde-claro text-verde font-medium"
                    : "bg-azul-fondo text-gris italic"
                }`}
              >
                {revelado ? f.valor : "…"}
              </span>
            </div>
          ))}
        </div>
      )}
    </EjercicioShell>
  );
}
