"use client";

import type { CoherenciaCohesion as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function CoherenciaCohesion({
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
        <div>
          <p className="text-sm text-grafito bg-azul-fondo rounded-lg px-3 py-2 mb-4 whitespace-pre-line">
            {ej.fragmento}
          </p>
          <p className="text-xs text-gris mb-3">
            Recursos: {ej.recursos_opciones.join(" · ")}
          </p>
          <ul className="space-y-2">
            {ej.items.map((it, idx) => (
              <li key={it.id} className="space-y-1">
                <p className="text-base text-grafito">
                  <span className="font-bold text-azul mr-1.5">
                    {String.fromCharCode(97 + idx)})
                  </span>
                  <span className="font-medium text-azul-claro">
                    “{it.fragmento_destacado}”
                  </span>
                </p>
                {revelado && (
                  <p className="text-base text-verde bg-verde-claro rounded-lg px-3 py-1.5 font-medium ml-6">
                    {it.recurso_correcto}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </EjercicioShell>
  );
}
