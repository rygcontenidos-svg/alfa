"use client";

import { useState } from "react";
import type { CompletarCuadro as CompletarCuadroType } from "@/lib/tipos";

export default function CompletarCuadro({
  ej,
  moduloId,
}: {
  ej: CompletarCuadroType;
  moduloId: string;
}) {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="rounded-xl border border-borde bg-white overflow-hidden">
      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold text-grafito mb-3 leading-relaxed">
          {ej.consigna}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {ej.columnas.map((col, i) => (
                  <th
                    key={i}
                    className="border border-borde bg-gray-50 px-3 py-2 text-left font-semibold text-grafito"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ej.filas.map((fila) => (
                <tr key={fila.id}>
                   {fila.celdas.map((celda, j) => {
                     const esDato = j === 0;
                     const visible = esDato || mostrar;
                     return (
                       <td
                         key={j}
                         className={`border border-borde px-3 py-2 ${
                           !celda ? "text-gris/50 italic" : visible ? "text-verde font-medium" : "text-grafito"
                         }`}
                       >
                         {visible ? (celda || "______") : "______"}
                       </td>
                     );
                   })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-borde px-4 py-3 flex justify-between items-center gap-3">
        <span className="text-[10px] text-gris uppercase tracking-wide">
          {moduloId}
        </span>
        <button
          type="button"
          onClick={() => setMostrar((v) => !v)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
            mostrar
              ? "bg-gray-100 text-grafito"
              : "bg-azul text-white hover:bg-azul-claro"
          }`}
        >
          {mostrar ? "Ocultar respuestas" : "Ver respuestas"}
        </button>
      </div>
    </div>
  );
}
