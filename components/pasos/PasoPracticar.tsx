"use client";

import type { Modulo, TextoLectura } from "@/lib/tipos";
import EjercicioRouter from "../EjercicioRouter";
import TextoModal from "../TextoModal";
import { obtenerTexto } from "@/lib/textos";

export default function PasoPracticar({
  modulo,
  onCompletar,
}: {
  modulo: Modulo;
  onCompletar: () => void;
}) {
  const ids = modulo.metodo!.practicar.ejercicios_ids;
  const ejercicios = ids
    .map((id) => modulo.ejercicios?.find((e) => e.id === id))
    .filter(Boolean) as NonNullable<Modulo["ejercicios"]>;

  const textos = (modulo.metodo!.calentamiento.textos_ids ?? [])
    .map((id) => obtenerTexto(id))
    .filter(Boolean) as TextoLectura[];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-dashed border-azul-claro bg-azul-fondo px-4 py-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-azul flex-1 min-w-[200px]">
            <i className="fa-solid fa-pen-to-square mr-1" />
            Resolvé cada ejercicio y después tocá{" "}
            <strong>Ver respuestas</strong> para verificar. Marcá si lo sacaste
            bien o si tenés que repasar.
          </p>
          {textos.length > 0 && (
            <TextoModal textos={textos}>
              <i className="fa-solid fa-book-open mr-1" />
              {modulo.materia === "matematica" ? "Releer el problema" : "Releer el texto"}
            </TextoModal>
          )}
        </div>
      </div>

      {ejercicios.map((ej) => (
        <EjercicioRouter key={ej.id} ej={ej} moduloId={modulo.id} />
      ))}

      <button
        type="button"
        onClick={onCompletar}
        className="w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors"
      >
        Completar paso y desbloquear Ponete a prueba
      </button>
    </div>
  );
}
