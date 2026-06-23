"use client";

import type { TiemposVerbales as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function TiemposVerbales({
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
      guia="Copiá la tabla en tu cuaderno y relacioná cada ejemplo con el uso que le corresponde."
    >
      {(revelado) => (
        <div>
          <p className="text-xs text-gris mb-2">
            Usos para relacionar: {ej.usos_para_relacionar.join(" · ")}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-azul-fondo text-azul">
                  <th className="text-left font-semibold px-3 py-2 border border-borde">
                    Ejemplo
                  </th>
                  <th className="text-left font-semibold px-3 py-2 border border-borde">
                    Tiempo verbal
                  </th>
                  <th className="text-left font-semibold px-3 py-2 border border-borde">
                    Uso
                  </th>
                </tr>
              </thead>
              <tbody>
                {ej.filas.map((f, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 border border-borde italic text-grafito">
                      {f.ejemplo}
                    </td>
                    <td className="px-3 py-2 border border-borde text-grafito">
                      {revelado ? f.tiempo : ""}
                    </td>
                    <td
                      className={`px-3 py-2 border border-borde ${
                        revelado ? "bg-verde-claro text-verde font-medium" : ""
                      }`}
                    >
                      {revelado ? f.uso : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </EjercicioShell>
  );
}
