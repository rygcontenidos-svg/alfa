"use client";

import type { TipoTextual as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function TipoTextual({
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
      guia="Copiá la tabla en tu cuaderno y completá cada característica con un ejemplo extraído del texto."
    >
      {(revelado) => (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-azul-fondo text-azul">
                <th className="text-left font-semibold px-3 py-2 border border-borde w-1/2">
                  Característica
                </th>
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Ejemplo del texto
                </th>
              </tr>
            </thead>
            <tbody>
              {ej.filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border border-borde text-grafito">
                    {f.caracteristica}
                  </td>
                  <td
                    className={`px-3 py-2 border border-borde italic ${
                      revelado ? "text-grafito bg-verde-claro/50" : "text-gris"
                    }`}
                  >
                    {revelado ? f.ejemplo : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </EjercicioShell>
  );
}
