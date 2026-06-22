"use client";

import { useCallback, useEffect, useState } from "react";
import type { Diapositiva } from "@/lib/tipos";
import BloqueRenderer from "./BloqueRenderer";
import Emoji from "../Emoji";

const colorAcento: Record<string, { barra: string; titulo: string; icono_bg: string }> = {
  azul: { barra: "bg-azul", titulo: "text-azul", icono_bg: "bg-azul-fondo" },
  verde: { barra: "bg-verde", titulo: "text-verde", icono_bg: "bg-verde-claro" },
  amarillo: { barra: "bg-amarillo", titulo: "text-amarillo", icono_bg: "bg-amarillo-claro" },
  naranja: { barra: "bg-naranja", titulo: "text-naranja", icono_bg: "bg-naranja-claro" },
  rojo: { barra: "bg-rojo", titulo: "text-rojo", icono_bg: "bg-rojo-claro" },
  violeta: { barra: "bg-violeta", titulo: "text-violeta", icono_bg: "bg-violeta-claro" },
};

export default function DiapositivaViewer({
  diapositivas,
}: {
  diapositivas: Diapositiva[];
}) {
  const [i, setI] = useState(0);
  const total = diapositivas.length;
  const d = diapositivas[i];
  const acento = colorAcento[d.color ?? "azul"];

  const next = useCallback(
    () => setI((v) => Math.min(v + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className="rounded-2xl border border-borde bg-white overflow-hidden">
      <div className={`h-1.5 ${acento.barra} transition-colors`} />

      <div className="p-6 sm:p-8 min-h-[360px]">
        <header className="flex items-center gap-3.5 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl ${acento.icono_bg} flex items-center justify-center shrink-0`}
          >
            <Emoji emoji={d.icono} className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gris">
              Diapositiva {i + 1} de {total}
            </p>
            <h3 className={`text-2xl font-bold ${acento.titulo} leading-tight`}>
              {d.titulo}
            </h3>
          </div>
        </header>

        <div className="space-y-5">
          {d.bloques.map((b, j) => (
            <BloqueRenderer key={j} bloque={b} />
          ))}
        </div>
      </div>

      <div className="border-t border-borde px-5 py-3 flex items-center justify-between gap-3 bg-gray-50">
        <button
          type="button"
          onClick={prev}
          disabled={i === 0}
          className="px-4 py-2 rounded-lg border border-borde text-sm text-grafito disabled:opacity-30 hover:bg-white transition-colors"
        >
          ← Anterior
        </button>

        <div className="flex gap-1.5">
          {diapositivas.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Ir a diapositiva ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === i
                  ? `${acento.barra} w-6`
                  : "bg-borde w-2 hover:bg-gris"
              }`}
            />
          ))}
        </div>

        {i < total - 1 ? (
          <button
            type="button"
            onClick={next}
            className={`px-4 py-2 rounded-lg text-white text-sm font-semibold ${acento.barra} hover:opacity-90 transition-opacity`}
          >
            Siguiente →
          </button>
        ) : (
          <span className="text-xs text-verde font-medium px-4">Última ✓</span>
        )}
      </div>
    </div>
  );
}
