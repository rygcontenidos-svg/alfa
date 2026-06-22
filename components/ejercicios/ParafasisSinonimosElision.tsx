"use client";

import type { ParafasisSinonimosElision as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function ParafasisSinonimosElision({
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
        <ul className="space-y-3">
          {ej.items.map((it, idx) => (
            <li key={it.id} className="space-y-1">
              <p className="text-base text-grafito">
                <span className="font-bold text-azul mr-1.5">
                  {String.fromCharCode(97 + idx)})
                </span>
                <span className="text-[10px] uppercase tracking-wide text-azul-claro mr-2">
                  {it.subtipo}
                </span>
                {it.pregunta}
              </p>
              {revelado && (
                <p className="text-base text-verde bg-verde-claro rounded-lg px-3 py-1.5 font-medium ml-6">
                  {it.respuesta}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </EjercicioShell>
  );
}
