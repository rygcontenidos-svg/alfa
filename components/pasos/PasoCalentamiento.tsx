"use client";

import { useState } from "react";
import type { Modulo, TextoLectura } from "@/lib/tipos";
import TextoBaseView from "../TextoBaseView";

export default function PasoCalentamiento({
  modulo,
  textos,
  onCompletar,
}: {
  modulo: Modulo;
  textos: TextoLectura[];
  onCompletar: () => void;
}) {
  const esMate = modulo.materia === "matematica";
  const [verSolucion, setVerSolucion] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-2 border-azul-claro bg-azul-fondo p-4">
        <div className="flex items-center gap-2 mb-1">
          <i className="fa-solid fa-fire text-lg text-azul" />
          <h2 className="text-sm font-bold text-azul uppercase tracking-wide">
            Calentamiento
          </h2>
        </div>
        <p className="text-xs text-grafito leading-relaxed">
          {esMate
            ? "Antes de arrancar con la teoría, intentá resolver este problema. No importa si te sale o no: activá tu cabeza para lo que viene. Cuando termines, verificá la solución y marcá que está listo."
            : "Antes de arrancar con la teoría, leé el texto con atención. Como el calentamiento en el gimnasio: prepara tu cabeza para lo que viene. Cuando termines de leer, marcá que está listo y desbloqueás el paso siguiente."}
        </p>
      </div>

      {textos.map((t) => (
        <div key={t.id}>
          <TextoBaseView key={t.id} texto={t} />
          {esMate && t.solucion && !verSolucion && (
            <button
              type="button"
              onClick={() => setVerSolucion(true)}
              className="w-full rounded-lg bg-amarillo text-white font-semibold py-2.5 hover:bg-amarillo/90 transition-colors mt-3"
            >
              <i className="fa-solid fa-lightbulb mr-2" />
              Ver solución
            </button>
          )}
          {esMate && t.solucion && verSolucion && (
            <div className="mt-3 rounded-lg border-2 border-verde bg-verde-claro p-4">
              <p className="text-xs font-semibold text-verde uppercase tracking-wide mb-2">
                <i className="fa-solid fa-circle-check mr-1" />
                Solución
              </p>
              <p className="text-sm text-grafito whitespace-pre-line leading-relaxed">
                {t.solucion}
              </p>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={onCompletar}
        className="w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors"
      >
        <i className="fa-solid fa-circle-check mr-2" />
        {esMate ? "Terminé el problema — desbloquear Entendé" : "Terminé de leer — desbloquear Entendé"}
      </button>
    </div>
  );
}
