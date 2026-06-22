"use client";

import { useMemo, useState } from "react";
import type { OrdenarSecuencia as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OrdenarSecuencia({
  ej,
  moduloId,
}: {
  ej: T;
  moduloId: string;
}) {
  const ordenMezclado = useMemo(
    () => shuffle(ej.eventos.map((e) => e.id)),
    [ej]
  );
  const [orden] = useState(ordenMezclado);
  const ordenCorrecto = [...ej.eventos].sort((a, b) => a.orden - b.orden);

  return (
    <EjercicioShell
      consigna={ej.consigna}
      moduloId={moduloId}
      ejercicioId={ej.id}
      guia={`Numerá los eventos del 1 al ${ej.eventos.length} en el orden correcto. Anotá solo el número y la primera palabra de cada evento para identificarlo.`}
    >
      {(revelado) => (
        <ol className="space-y-2">
          {(revelado ? ordenCorrecto.map((e) => e.id) : orden).map((id, i) => {
            const ev = ej.eventos.find((e) => e.id === id)!;
            return (
              <li
                key={id}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
                  revelado
                    ? "border-verde bg-verde-claro/50"
                    : "border-borde"
                }`}
              >
                <span
                  className={`w-7 h-7 shrink-0 rounded-full text-xs font-bold flex items-center justify-center ${
                    revelado
                      ? "bg-verde text-white"
                      : "bg-azul-fondo text-azul"
                  }`}
                >
                  {revelado ? ev.orden : i + 1}
                </span>
                <span className="flex-1 text-sm text-grafito">{ev.texto}</span>
              </li>
            );
          })}
        </ol>
      )}
    </EjercicioShell>
  );
}
