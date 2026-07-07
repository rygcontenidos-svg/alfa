"use client";

import { useState } from "react";
import type { VerdaderoFalso as T } from "@/lib/tipos";
import { EjercicioShell } from "./EjercicioShell";

export default function VerdaderoFalso({
  ej,
  moduloId,
}: {
  ej: T;
  moduloId: string;
}) {
  const labels = ej.labels ?? { verdadero: "V", falso: "F" };
  const [respuestas, setRespuestas] = useState<Record<string, boolean | null>>({});
  const [comprobado, setComprobado] = useState(false);

  function responder(id: string, valor: boolean) {
    setRespuestas((r) => ({ ...r, [id]: valor }));
    setComprobado(false);
  }

  function comprobar() {
    setComprobado(true);
  }

  function reiniciar() {
    setRespuestas({});
    setComprobado(false);
  }

  const todosRespondidos = ej.items.every((it) => respuestas[it.id] !== undefined && respuestas[it.id] !== null);
  const aciertos = comprobado ? ej.items.filter((it) => respuestas[it.id] === it.respuesta).length : 0;
  const total = ej.items.length;

  return (
    <EjercicioShell consigna={ej.consigna} moduloId={moduloId} ejercicioId={ej.id}>
      {(revelado) => (
        <div>
          <ul className="space-y-2.5">
            {ej.items.map((it, idx) => {
              const r = respuestas[it.id];
              const correcto = comprobado && r === it.respuesta;
              const incorrecto = comprobado && r !== null && r !== it.respuesta;

              return (
                <li key={it.id} className={`rounded-lg border px-4 py-3 ${revelado || correcto ? "border-verde bg-verde-claro" : incorrecto ? "border-red-300 bg-red-50" : "border-borde"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base text-grafito flex-1">
                      <span className="font-semibold text-azul mr-1.5">{idx + 1}.</span>
                      {it.afirmacion}
                    </p>
                    {revelado ? (
                      <span className={`shrink-0 px-3 py-1 rounded-md text-sm font-bold ${it.respuesta ? "bg-verde text-white" : "bg-red-500 text-white"}`}>
                        {it.respuesta ? labels.verdadero : labels.falso}
                      </span>
                    )                      : (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => responder(it.id, true)}
                          disabled={comprobado}
                          className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                            comprobado && it.respuesta === true
                              ? "border-verde bg-verde text-white"
                              : comprobado && r === true && it.respuesta !== true
                                ? "border-red-500 bg-red-500 text-white"
                                : r === true
                                  ? "border-azul bg-azul text-white"
                                  : "border-gray-300 text-grafito hover:bg-gray-50"
                          }`}
                        >
                          {labels.verdadero}
                        </button>
                        <button
                          type="button"
                          onClick={() => responder(it.id, false)}
                          disabled={comprobado}
                          className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                            comprobado && it.respuesta === false
                              ? "border-verde bg-verde text-white"
                              : comprobado && r === false && it.respuesta !== false
                                ? "border-red-500 bg-red-500 text-white"
                                : r === false
                                  ? "border-azul bg-azul text-white"
                                  : "border-gray-300 text-grafito hover:bg-gray-50"
                          }`}
                        >
                          {labels.falso}
                        </button>
                      </div>
                    )}
                  </div>
                  {revelado && !it.respuesta && it.correccion && (
                    <p className="text-sm text-verde mt-2 bg-white rounded-md px-3 py-1.5 border border-verde">
                      {it.correccion}
                    </p>
                  )}
                  {comprobado && incorrecto && it.correccion && (
                    <p className="text-sm text-red-600 mt-2 bg-red-50 rounded-md px-3 py-1.5 border border-red-200">
                      {it.correccion}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>

          {!revelado && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <button type="button" onClick={comprobar} disabled={comprobado} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-verde text-white hover:bg-verde/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Comprobar{todosRespondidos ? "" : ` (${ej.items.filter((it) => respuestas[it.id] !== undefined && respuestas[it.id] !== null).length}/${total})`}
              </button>
              {comprobado && (
                <>
                  <button type="button" onClick={reiniciar} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-borde text-grafito hover:bg-gray-50 transition-colors">
                    Reiniciar
                  </button>
                  <span className={`text-xs font-semibold ${aciertos === total ? "text-verde" : "text-red-500"}`}>
                    {aciertos}/{total} correctas
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
