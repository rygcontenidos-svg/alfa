"use client";

import { useEffect, useRef, useState } from "react";
import type { Modulo, TextoLectura } from "@/lib/tipos";
import EjercicioRouter from "../EjercicioRouter";
import Card from "../Card";
import TextoModal from "../TextoModal";
import { obtenerTexto } from "@/lib/textos";

export default function PasoPonerseAPrueba({
  modulo,
  onCompletar,
}: {
  modulo: Modulo;
  onCompletar: () => void;
}) {
  const ids = modulo.metodo!.ponerse_a_prueba.ejercicios_ids;
  const ejercicios = ids
    .map((id) => modulo.ejercicios?.find((e) => e.id === id))
    .filter(Boolean) as NonNullable<Modulo["ejercicios"]>;

  const textos = (modulo.metodo!.calentamiento.textos_ids ?? [])
    .map((id) => obtenerTexto(id))
    .filter(Boolean) as TextoLectura[];

  const duracionMs = modulo.metodo!.ponerse_a_prueba.duracion_min * 60_000;

  const [inicio, setInicio] = useState<number | null>(null);
  const [restante, setRestante] = useState(duracionMs);
  const [finalizado, setFinalizado] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (inicio === null) return;
    timer.current = setInterval(() => {
      const r = duracionMs - (Date.now() - inicio);
      if (r <= 0) {
        setRestante(0);
        if (timer.current) clearInterval(timer.current);
        setFinalizado(true);
      } else {
        setRestante(r);
      }
    }, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [inicio, duracionMs]);

  const mm = String(Math.floor(restante / 60000)).padStart(2, "0");
  const ss = String(Math.floor((restante % 60000) / 1000)).padStart(2, "0");
  const agotado = restante <= 0;

  function finalizar() {
    if (timer.current) clearInterval(timer.current);
    setFinalizado(true);
  }

  if (inicio === null) {
    return (
      <Card titulo="Simulacro cronometrado">
        <p className="text-sm text-grafito mb-4">
          Vas a resolver {ejercicios.length} ejercicios en formato de examen.
          Tenés <strong>{modulo.metodo!.ponerse_a_prueba.duracion_min} minutos</strong>.
          <i className="fa-solid fa-pen-to-square mx-1" />
          Trabajá todo en tu cuaderno, anotando solo las respuestas con su
          letra o número (a), b), c)…). Al final verificá. Si necesitás
          consultar el texto, podés abrirlo cuando quieras.
        </p>
        <button
          type="button"
          onClick={() => setInicio(Date.now())}
          className="w-full rounded-lg bg-azul text-white font-semibold py-3 hover:bg-azul-claro transition-colors"
        >
          <i className="fa-solid fa-stopwatch mr-2" />
          Iniciar simulacro ({modulo.metodo!.ponerse_a_prueba.duracion_min} min)
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={`sticky top-2 z-10 flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-white transition-colors ${
          agotado ? "bg-red-600" : restante < 60000 ? "bg-amarillo" : "bg-grafito"
        }`}
      >
        <span className="font-semibold">
          {agotado ? (
            <>
              <i className="fa-solid fa-flag-checkered mr-1" />
              Se acabó el tiempo
            </>
          ) : (
            <>
              <i className="fa-solid fa-stopwatch mr-1" />
              {mm}:{ss}
            </>
          )}
        </span>
        <div className="flex items-center gap-3">
          {textos.length > 0 && modulo.materia !== "matematica" && (
            <TextoModal textos={textos}>
              <span className="text-white">
                <i className="fa-solid fa-book-open mr-1" />
                Releer el texto
              </span>
            </TextoModal>
          )}
          {!finalizado ? (
            <button
              type="button"
              onClick={finalizar}
              className="rounded-md bg-white/15 px-3 py-1 text-xs hover:bg-white/25"
            >
              Finalizar
            </button>
          ) : (
            <span className="text-xs text-verde-claro">Finalizado</span>
          )}
        </div>
      </div>

      {ejercicios.map((ej, i) => (
        <div key={ej.id}>
          <p className="text-xs font-semibold text-grafito mb-2 uppercase tracking-wide">
            Ejercicio {i + 1}
          </p>
          <EjercicioRouter ej={ej} moduloId={modulo.id} />
        </div>
      ))}

      <button
        type="button"
        onClick={onCompletar}
        className="w-full rounded-lg bg-verde text-white font-semibold py-3 hover:bg-verde/90 transition-colors"
      >
        Completar simulacro y desbloquear Mejorá
      </button>
    </div>
  );
}
