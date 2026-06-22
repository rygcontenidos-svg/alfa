"use client";

import type { TildacionDiacritica as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function TildacionDiacritica({
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
      guia="Copiá la tabla en tu cuaderno y completá la clase de palabra y un ejemplo del texto para cada caso."
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
                  Clase de palabra
                </th>
                <th className="text-left font-semibold px-3 py-2 border border-borde">
                  Ejemplo del texto
                </th>
              </tr>
            </thead>
            <tbody>
              {ej.filas.map((f, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 border border-borde font-medium whitespace-nowrap">
                    {f.palabra}
                  </td>
                  <td
                    className={`px-3 py-2 border border-borde ${
                      revelado ? "bg-verde-claro text-verde font-medium" : ""
                    }`}
                  >
                    {revelado ? f.clase : ""}
                  </td>
                  <td
                    className={`px-3 py-2 border border-borde italic ${
                      revelado ? "text-grafito" : "text-gris"
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
