"use client";

import type { NormativaGrafica as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function NormativaGrafica({
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
      guia="Completá los huecos con la letra correcta y escribí las reglas con tus palabras. Anotá cada item con su letra (a), b), c)…)."
    >
      {(revelado) => (
        <ul className="space-y-3">
          {ej.items.map((it) => {
            if (it.modo === "completar") {
              return (
                <li key={it.id} className="space-y-1">
                  <p className="text-sm text-grafito font-mono">
                    {revelado ? (
                      <>
                        {it.texto.split("__")[0]}
                        <span className="bg-verde-claro text-verde font-bold px-1 rounded">
                          {it.correcta}
                        </span>
                        {it.texto.split("__")[1]}
                      </>
                    ) : (
                      <>
                        {it.texto.split("__")[0]}
                        <span className="text-azul-claro">{it.correcta.length === 1 ? "_" : "___"}</span>
                        {it.texto.split("__")[1]}
                        <span className="text-xs text-gris ml-2">
                          ({it.opciones.join(" / ")})
                        </span>
                      </>
                    )}
                  </p>
                </li>
              );
            }
            return (
              <li key={it.id} className="space-y-1">
                {revelado ? (
                  <p className="text-sm text-grafito bg-verde-claro rounded px-2 py-1">
                    {it.regla}
                  </p>
                ) : (
                  <p className="text-sm text-gris italic">
                    Escribí la regla con tus palabras…
                  </p>
                )}
                {revelado && (
                  <p className="text-xs text-verde bg-verde-claro rounded px-2 py-1 italic">
                    Ejemplo: {it.ejemplo_correcto}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </EjercicioShell>
  );
}
