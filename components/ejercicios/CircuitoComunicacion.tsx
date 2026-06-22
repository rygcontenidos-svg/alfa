"use client";

import type { CircuitoComunicacion as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function CircuitoComunicacion({
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
      guia="Copiá el esquema en tu cuaderno (Emisor / Receptor / Mensaje / Canal / Código / Referente) y completá cada elemento. Después anotá la función del lenguaje predominante."
    >
      {(revelado) => (
        <div>
          <p className="text-base text-gris bg-azul-fondo rounded-lg px-4 py-3 mb-5 italic">
            “{ej.frase}”
          </p>

          <p className="text-sm font-semibold text-grafito mb-3">
            Completá el esquema:
          </p>

          <div className="space-y-2.5">
            {ej.nodos.map((n, idx) => (
              <div
                key={n.id}
                className="flex items-center gap-3 rounded-lg border border-borde px-4 py-2.5"
              >
                <span className="text-sm font-bold text-azul w-7 shrink-0">
                  {String.fromCharCode(97 + idx)})
                </span>
                <span className="text-sm font-semibold text-azul w-28 shrink-0">
                  {n.etiqueta}:
                </span>
                <span
                  className={`flex-1 text-base ${
                    revelado
                      ? "text-grafito font-medium bg-verde-claro rounded-md px-2 py-1"
                      : "text-gris italic bg-borde/30 rounded-md px-2 py-1 min-h-[28px]"
                  }`}
                >
                  {revelado ? n.respuesta : ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-grafito mb-2">
              <span className="text-sm font-bold text-azul mr-1.5">
                {String.fromCharCode(97 + ej.nodos.length)})
              </span>
              Función del lenguaje predominante:
            </p>
            {revelado ? (
              <p className="text-base text-verde font-semibold bg-verde-claro rounded-lg px-4 py-2">
                {ej.funcion_lenguaje.correcta}
              </p>
            ) : (
              <p className="text-sm text-gris">
                Opciones: {ej.funcion_lenguaje.opciones.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}
    </EjercicioShell>
  );
}
