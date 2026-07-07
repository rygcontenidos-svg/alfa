"use client";

import { useMemo, useState } from "react";
import type { OrdenarSecuencia as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OrdenarSecuencia({
  ej,
  moduloId,
  simulacro = false,
  forzarRevelado = false,
}: {
  ej: T;
  moduloId: string;
  simulacro?: boolean;
  forzarRevelado?: boolean;
}) {
  const ordenMezclado = useMemo(
    () => shuffle(ej.eventos.map((e) => e.id)),
    [ej]
  );
  const [ordenActual, setOrdenActual] = useState<string[]>(ordenMezclado);
  const [comprobado, setComprobado] = useState(false);
  const ordenCorrecto = [...ej.eventos].sort((a, b) => a.orden - b.orden);

  function mover(id: string, dir: -1 | 1) {
    const idx = ordenActual.indexOf(id);
    const nuevo = [...ordenActual];
    [nuevo[idx], nuevo[idx + dir]] = [nuevo[idx + dir], nuevo[idx]];
    setOrdenActual(nuevo);
    setComprobado(false);
  }

  function comprobar() {
    setComprobado(true);
  }

  function reiniciar() {
    setOrdenActual(shuffle(ej.eventos.map((e) => e.id)));
    setComprobado(false);
  }

  const esCorrecto = comprobado && ordenActual.every((id, i) => id === ordenCorrecto[i].id);

  return (
    <EjercicioShell consigna={ej.consigna} moduloId={moduloId} ejercicioId={ej.id} forzarRevelado={forzarRevelado} simulacro={simulacro}>
      {(revelado) => (
        <div>
          <ol className="space-y-2">
            {(revelado ? ordenCorrecto.map((e) => e.id) : ordenActual).map((id, i) => {
              const ev = ej.eventos.find((e) => e.id === id)!;
              const estaEnPos = comprobado && ordenActual[i] === ordenCorrecto[i]?.id;
              const noEstaEnPos = comprobado && !estaEnPos;

              return (
                <li
                  key={id}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                    revelado
                      ? "border-verde bg-verde-claro"
                      : comprobado && estaEnPos
                        ? "border-verde bg-verde-claro"
                        : noEstaEnPos
                          ? "border-red-300 bg-red-50"
                          : "border-borde"
                  }`}
                >
                  <span className={`w-7 h-7 shrink-0 rounded-full text-xs font-bold flex items-center justify-center ${
                    revelado || (comprobado && estaEnPos) ? "bg-verde text-white" : noEstaEnPos ? "bg-red-500 text-white" : "bg-azul-fondo text-azul"
                  }`}>
                    {revelado ? ev.orden : (
                      <span className="text-[10px]">{i + 1}</span>
                    )}
                  </span>
                  <span className="flex-1 text-sm text-grafito">{ev.texto}</span>
                  {!revelado && !comprobado && (
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={() => mover(id, -1)}
                        className="w-6 h-5 flex items-center justify-center rounded text-xs text-gris hover:text-azul hover:bg-azul-fondo disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Subir"
                      >
                        <i className="fa-solid fa-chevron-up" />
                      </button>
                      <button
                        type="button"
                        disabled={i === ordenActual.length - 1}
                        onClick={() => mover(id, 1)}
                        className="w-6 h-5 flex items-center justify-center rounded text-xs text-gris hover:text-azul hover:bg-azul-fondo disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Bajar"
                      >
                        <i className="fa-solid fa-chevron-down" />
                      </button>
                    </div>
                  )}
                  {revelado && i < ordenCorrecto.length - 1 && (
                    <i className="fa-solid fa-arrow-down text-verde shrink-0 text-xs ml-1" />
                  )}
                </li>
              );
            })}
          </ol>

          {!simulacro && !revelado && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <button type="button" onClick={comprobar} disabled={comprobado} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-verde text-white hover:bg-verde/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Comprobar
              </button>
              {comprobado && (
                <>
                  <button type="button" onClick={reiniciar} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-borde text-grafito hover:bg-gray-50 transition-colors">
                    Reiniciar
                  </button>
                  <span className={`text-xs font-semibold ${esCorrecto ? "text-verde" : "text-red-500"}`}>
                    {esCorrecto ? "¡Orden correcto!" : "El orden no es correcto"}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </EjercicioShell>
  );
}
