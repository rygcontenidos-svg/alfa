"use client";

import type { VerdaderoFalso as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function VerdaderoFalso({
  ej,
  moduloId,
}: {
  ej: T;
  moduloId: string;
}) {
  const labels = ej.labels ?? { verdadero: "V", falso: "F" };
  return (
    <EjercicioShell
      consigna={ej.consigna}
      moduloId={moduloId}
      ejercicioId={ej.id}
    >
      {(revelado) => (
        <ul className="space-y-2.5">
          {ej.items.map((it, idx) => (
            <li
              key={it.id}
              className="rounded-lg border border-borde px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-base text-grafito flex-1">
                  <span className="font-semibold text-azul mr-1.5">
                    {idx + 1}.
                  </span>
                  {it.afirmacion}
                </p>
                {revelado && (
                  <span
                    className={`shrink-0 px-3 py-1 rounded-md text-sm font-bold ${
                      it.respuesta
                        ? "bg-verde-claro text-verde"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {it.respuesta ? labels.verdadero : labels.falso}
                  </span>
                )}
              </div>
              {revelado && !it.respuesta && it.correccion && (
                <p className="text-sm text-verde mt-2 bg-verde-claro rounded-md px-3 py-1.5">
                  Lo correcto: {it.correccion}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </EjercicioShell>
  );
}
