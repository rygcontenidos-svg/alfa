"use client";

import type { TildacionSilabas as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function TildacionSilabas({
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
      guia="Copiá la tabla en tu cuaderno y completá las columnas: separación silábica, clase de palabra, si lleva tilde y por qué."
    >
      {(revelado) => (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-azul-fondo text-azul">
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Palabra
                </th>
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Separación silábica
                </th>
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Clase
                </th>
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  ¿Lleva tilde?
                </th>
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Por qué
                </th>
              </tr>
            </thead>
            <tbody>
              {ej.filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border border-borde font-medium whitespace-nowrap">
                    {f.palabra}
                  </td>
                  <td className="px-3 py-2 border border-borde font-mono text-gris">
                    {revelado ? f.separacion : ""}
                  </td>
                  <td
                    className={`px-3 py-2 border border-borde ${
                      revelado ? "bg-verde-claro text-verde font-medium" : ""
                    }`}
                  >
                    {revelado ? f.clase : ""}
                  </td>
                  <td
                    className={`px-3 py-2 border border-borde text-center ${
                      revelado ? "bg-verde-claro text-verde font-bold" : ""
                    }`}
                  >
                    {revelado ? (f.lleva_tilde ? "Sí" : "No") : ""}
                  </td>
                  <td className="px-3 py-2 border border-borde text-gris italic">
                    {revelado ? f.porque : ""}
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
