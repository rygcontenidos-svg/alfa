"use client";

import type { TildacionGeneral as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function TildacionGeneral({
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
      guia="Copiá la tabla en tu cuaderno, marcá con una X la columna correcta para cada palabra y escribí la justificación."
    >
      {(revelado) => (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-azul-fondo text-azul">
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Palabra
                </th>
                {ej.columnas.map((c) => (
                  <th
                    key={c}
                    className="text-left font-semibold px-3 py-2 border border-borde"
                  >
                    {c}
                  </th>
                ))}
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Justificación
                </th>
              </tr>
            </thead>
            <tbody>
              {ej.palabras.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2 border border-borde font-medium whitespace-nowrap">
                    {p.palabra}
                  </td>
                  {ej.columnas.map((c) => (
                    <td
                      key={c}
                      className={`px-3 py-2 border border-borde text-center ${
                        revelado && c === p.columna_correcta
                          ? "bg-verde-claro text-verde font-bold"
                          : ""
                      }`}
                    >
                      {revelado && c === p.columna_correcta ? "✓" : ""}
                    </td>
                  ))}
                  <td className="px-3 py-2 border border-borde text-gris">
                    {revelado ? p.justificacion : ""}
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
