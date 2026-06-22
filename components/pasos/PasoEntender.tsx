"use client";

import type { Modulo } from "@/lib/tipos";
import DiapositivaViewer from "../teoria/DiapositivaViewer";

export default function PasoEntender({
  modulo,
  onCompletar,
}: {
  modulo: Modulo;
  onCompletar: () => void;
}) {
  const { diapositivas } = modulo.metodo!.entender;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-azul-claro bg-azul-fondo px-4 py-2 text-center">
        <p className="text-xs text-azul">
          Mirá las diapositivas a tu ritmo. Usá las flechas ← → del teclado o
          los botones para navegar.
        </p>
      </div>

      <DiapositivaViewer diapositivas={diapositivas} />

      <button
        type="button"
        onClick={onCompletar}
        className="w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors"
      >
        Completar paso y desbloquear Recordá
      </button>
    </div>
  );
}
