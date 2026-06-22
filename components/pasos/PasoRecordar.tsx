"use client";

import { useState } from "react";
import type { Modulo } from "@/lib/tipos";
import Card from "../Card";

export default function PasoRecordar({
  modulo,
  onCompletar,
}: {
  modulo: Modulo;
  onCompletar: () => void;
}) {
  const { flashcards } = modulo.metodo!.recordar;
  const [i, setI] = useState(0);
  const [volteada, setVolteada] = useState(false);

  const carta = flashcards[i];
  const esUltima = i === flashcards.length - 1;

  function siguiente() {
    if (esUltima) return;
    setI(i + 1);
    setVolteada(false);
  }

  function anterior() {
    if (i === 0) return;
    setI(i - 1);
    setVolteada(false);
  }

  return (
    <div className="space-y-4">
      <Card titulo="Flashcards">
        <p className="text-xs text-gris mb-3">
          <i className="fa-solid fa-clone mr-1" />
          Tarjeta interactiva: leé la pregunta, pensá la respuesta y volteá
          para comprobar.
        </p>
        <div className="flex items-center justify-between text-xs text-gris mb-3">
          <span>
            Tarjeta {i + 1} de {flashcards.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setVolteada((v) => !v)}
          className="w-full min-h-[180px] rounded-xl border-2 border-azul bg-azul-fondo p-6 text-center flex flex-col items-center justify-center gap-2 hover:border-azul-claro transition-colors"
        >
          <span className="text-[10px] uppercase tracking-wide text-azul-claro">
            {volteada ? "Respuesta" : "Pregunta"}
          </span>
          <span className="text-lg font-medium text-azul">
            {volteada ? carta.respuesta : carta.pregunta}
          </span>
          <span className="text-xs text-gris mt-2">
            Tocá para {volteada ? "ver la pregunta" : "ver la respuesta"}
          </span>
        </button>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={anterior}
            disabled={i === 0}
            className="px-4 py-2 rounded-lg border border-borde text-sm text-grafito disabled:opacity-40 hover:bg-azul-fondo"
          >
            ← Anterior
          </button>
          <button
            type="button"
            onClick={siguiente}
            disabled={esUltima}
            className="px-4 py-2 rounded-lg border border-borde text-sm text-grafito disabled:opacity-40 hover:bg-azul-fondo"
          >
            Siguiente →
          </button>
        </div>
      </Card>

      <button
        type="button"
        onClick={onCompletar}
        className="w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors"
      >
        Completar paso y desbloquear Practicá
      </button>
    </div>
  );
}
