"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Modulo } from "@/lib/tipos";
import { listarRepasar } from "@/lib/progreso";
import { useAuth } from "@/app/AuthProvider";
import Card from "../Card";

export default function PasoMejorar({
  modulo,
  onCompletar,
}: {
  modulo: Modulo;
  onCompletar: () => void;
}) {
  const { usuario } = useAuth();
  const router = useRouter();
  const { explicaciones } = modulo.metodo?.mejorar ?? {};
  if (!explicaciones?.length) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-gris">No hay explicaciones para este módulo.</p>
        <button type="button" onClick={onCompletar} className="mt-3 w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors">Completar paso</button>
      </div>
    );
  }
  const [repasar, setRepasar] = useState<string[]>([]);

  useEffect(() => {
    setRepasar(listarRepasar(modulo.id, usuario));
  }, [modulo.id, usuario]);

  const ejerciciosRepasar = repasar
    .map((id) => modulo.ejercicios?.find((e) => e.id === id))
    .filter(Boolean) as NonNullable<Modulo["ejercicios"]>;

  return (
    <div className="space-y-4">
      {ejerciciosRepasar.length > 0 && (
        <Card titulo="Ejercicios marcados para repasar">
          <p className="text-xs text-gris mb-3">
            <i className="fa-solid fa-pen-to-square mr-1" />
            Durante la práctica marcaste estos ejercicios como {'\u201C'}a repasar{'\u201D'}.
            Releé la consigna y volvé a resolverlos en pantalla.
          </p>
          <ul className="space-y-2">
            {ejerciciosRepasar.map((ej) => (
              <li
                key={ej.id}
                className="rounded-lg border border-amarillo bg-amarillo-claro/50 px-3 py-2 text-sm text-grafito"
              >
                <p className="font-medium">{ej.consigna}</p>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card titulo="Corrección y explicaciones">
        <ul className="space-y-4">
          {explicaciones.map((e, i) => (
            <li key={i} className="border-l-2 border-amarillo pl-3">
              <p className="text-sm font-semibold text-grafito">{e.titulo}</p>
              <p className="text-sm text-gris mt-1 whitespace-pre-line">
                {e.detalle}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      <button
        type="button"
        onClick={() => { onCompletar(); router.push("/"); }}
        className="w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors"
      >
        <i className="fa-solid fa-circle-check mr-2" />
        Completar clase
      </button>
    </div>
  );
}
