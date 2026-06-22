"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Modulo, TextoLectura } from "@/lib/tipos";
import EjercicioRouter from "./EjercicioRouter";
import Card from "./Card";
import TextoModal from "./TextoModal";
import { obtenerTexto } from "@/lib/textos";
import { useAuth } from "@/app/AuthProvider";

export default function SimulacroCliente({
  modulo,
}: {
  modulo: Modulo;
}) {
  const { usuario } = useAuth();
  const ejercicios = modulo.ejercicios ?? [];

  const textos = (modulo.textos_ids ?? [])
    .map((id) => obtenerTexto(id))
    .filter(Boolean) as TextoLectura[];

  const duracionMs = (modulo.duracion_min ?? 90) * 60_000;

  const [inicio, setInicio] = useState<number | null>(null);
  const [restante, setRestante] = useState(duracionMs);
  const [finalizado, setFinalizado] = useState(false);
  const [revelado, setRevelado] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (inicio === null) return;
    timer.current = setInterval(() => {
      const r = duracionMs - (Date.now() - inicio);
      if (r <= 0) {
        setRestante(0);
        if (timer.current) clearInterval(timer.current);
        setFinalizado(true);
        setRevelado(true);
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
    setRevelado(true);
  }

  if (inicio === null) {
    return (
      <div>
        <Link href="/" className="text-xs text-gris hover:text-azul">
          ← Volver al inicio
        </Link>
        <div className="mt-2 mb-6">
          <h1 className="text-xl font-bold text-grafito leading-tight">
            {modulo.titulo}
          </h1>
          <p className="text-xs text-gris">
            Lengua · Examen · 90 minutos · CNBA 2026
          </p>
        </div>
        <Card titulo="Simulacro">
          <p className="text-sm text-grafito mb-4">
            Vas a resolver <strong>{ejercicios.length} ejercicios</strong> en{" "}
            <strong>{modulo.duracion_min ?? 90} minutos</strong>.
          </p>
          <p className="text-sm text-grafito mb-4">
            <i className="fa-solid fa-pen-to-square mr-1" />
            Trabajá todo en tu cuaderno. Al final podés ver las respuestas y
            las explicaciones.
          </p>
          {textos.length > 0 && (
            <div className="mb-4 rounded-lg border border-borde bg-azul-fondo p-3">
              <p className="text-xs text-grafito font-medium mb-1">
                <i className="fa-solid fa-book-open mr-1" />
                Texto de lectura obligatorio:
              </p>
              {textos.map((t) => (
                <p key={t.id} className="text-xs text-gris">
                  {t.titulo} — {t.autor}
                </p>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setInicio(Date.now())}
            className="w-full rounded-lg bg-azul text-white font-semibold py-3 hover:bg-azul-claro transition-colors"
          >
            <i className="fa-solid fa-stopwatch mr-2" />
            Iniciar simulación ({modulo.duracion_min ?? 90} min)
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Link href="/" className="text-xs text-gris hover:text-azul">
        ← Volver al inicio
      </Link>
      <div className="mt-2 mb-4">
        <h1 className="text-xl font-bold text-grafito leading-tight">
          {modulo.titulo}
        </h1>
        <p className="text-xs text-gris">
          Lengua · Examen · CNBA 2026
        </p>
      </div>

      <div
        className={`sticky top-2 z-10 flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-white transition-colors ${
          agotado
            ? "bg-red-600"
            : restante < 60000
              ? "bg-amarillo"
              : "bg-grafito"
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
          {textos.length > 0 && (
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

      <div className="mt-4 space-y-4">
        {ejercicios.map((ej) => (
          <EjercicioRouter key={ej.id} ej={ej} moduloId={modulo.id} />
        ))}
      </div>

      {finalizado && (
        <div className="mt-6 space-y-4">
          <Card titulo="Corrección y explicaciones">
            <p className="text-sm text-grafito mb-4">
              Revisá cada ejercicio con las respuestas. Marcá cómo te fue para
              saber qué temas necesitás repasar.
            </p>
          </Card>
          {modulo.metodo?.mejorar.explicaciones.map((exp, i) => (
            <Card key={i} titulo={exp.titulo}>
              <p className="text-sm text-gris whitespace-pre-line">
                {exp.detalle}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
