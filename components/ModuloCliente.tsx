"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { Modulo, PasoMetodo, TextoLectura } from "@/lib/tipos";
import {
  completarPaso,
  estadoDe,
  estadoInicial,
  persistirEstado,
  pasoDesbloqueado,
} from "@/lib/progreso";
import { useAuth } from "@/app/AuthProvider";
import Metodo5Pasos from "./Metodo5Pasos";
import PasoCalentamiento from "./pasos/PasoCalentamiento";
import PasoEntender from "./pasos/PasoEntender";
import PasoRecordar from "./pasos/PasoRecordar";
import PasoPracticar from "./pasos/PasoPracticar";
import PasoPonerseAPrueba from "./pasos/PasoPonerseAPrueba";
import PasoMejorar from "./pasos/PasoMejorar";
import SimulacroCliente from "./SimulacroCliente";
import TextoModal from "./TextoModal";
import { obtenerTexto } from "@/lib/textos";

export default function ModuloCliente({ modulo }: { modulo: Modulo }) {
  const { usuario } = useAuth();
  const [estado, setEstado] = useState(estadoInicial());
  const [actual, setActual] = useState<PasoMetodo>("calentamiento");
  const [montado, setMontado] = useState(false);

  const tieneMetodo = Boolean(modulo.metodo && modulo.ejercicios);

  const textosCalentamiento = (modulo.metodo?.calentamiento?.textos_ids ?? [])
    .map((id) => obtenerTexto(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof obtenerTexto>>[];
  const saltarCalentamiento = textosCalentamiento.length === 0;

  const textosModulo = (modulo.textos_ids ?? [])
    .map((id) => obtenerTexto(id))
    .filter(Boolean) as TextoLectura[];

  useEffect(() => {
    const e = estadoDe(modulo.id, usuario);
    setEstado(e);
    if (saltarCalentamiento && e.actual === "calentamiento") {
      setActual("entender");
    } else {
      setActual(e.actual);
    }
    setMontado(true);
  }, [modulo.id, usuario, saltarCalentamiento]);

  const persistir = useCallback(
    (nuevo: typeof estado) => {
      setEstado(nuevo);
      persistirEstado(modulo.id, nuevo, usuario);
    },
    [modulo.id, usuario]
  );

  if (modulo.tipo === "simulacro") {
    return <SimulacroCliente modulo={modulo} />;
  }

  function completar(paso: PasoMetodo) {
    const nuevo = completarPaso(estado, paso);
    persistir(nuevo);
    setActual(nuevo.actual);
  }

  function seleccionar(paso: PasoMetodo) {
    if (!pasoDesbloqueado(estado, paso)) return;
    setActual(paso);
  }

  return (
    <div>
      <header className="mb-4">
        <Link href="/" className="text-xs text-gris hover:text-azul">
          ← Volver al inicio
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <div>
            <h1 className="text-xl font-bold text-grafito leading-tight">
              {modulo.titulo}
            </h1>
            <p className="text-xs text-gris">
              {modulo.materia === "matematica"
                ? "Matemática"
                : modulo.materia === "historia"
                  ? "Historia"
                  : "Lengua"}{" "}
              · Clase · CNBA 2026
            </p>
          </div>
        </div>
      </header>

      {tieneMetodo ? (
        <>
          <div className="grid md:grid-cols-[340px_1fr] gap-6">
            <div className="md:sticky md:top-20 md:self-start">
              <Metodo5Pasos
                estado={montado ? estado : estadoInicial()}
                actual={actual}
                onSeleccionar={seleccionar}
              />
            </div>

            <div id="contenido-paso" className="space-y-4 min-w-0">
              {actual === "calentamiento" && (
                <PasoCalentamiento
                  modulo={modulo}
                  textos={(modulo.metodo!.calentamiento.textos_ids ?? [])
                    .map((id) => obtenerTexto(id))
                    .filter(Boolean) as NonNullable<
                    ReturnType<typeof obtenerTexto>
                  >[]}
                  onCompletar={() => completar("calentamiento")}
                />
              )}
              {actual === "entender" && (
                <PasoEntender
                  modulo={modulo}
                  onCompletar={() => completar("entender")}
                />
              )}
              {actual === "recordar" && (
                <PasoRecordar
                  modulo={modulo}
                  onCompletar={() => completar("recordar")}
                />
              )}
              {actual === "practicar" && (
                <PasoPracticar
                  modulo={modulo}
                  onCompletar={() => completar("practicar")}
                />
              )}
              {actual === "ponerse_a_prueba" && (
                <PasoPonerseAPrueba
                  modulo={modulo}
                  onCompletar={() => completar("ponerse_a_prueba")}
                />
              )}
              {actual === "mejorar" && (
                <PasoMejorar
                  modulo={modulo}
                  onCompletar={() => completar("mejorar")}
                />
              )}
            </div>
          </div>

          {textosModulo.length > 0 && modulo.materia !== "matematica" && (
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-grafito mb-2">
                Textos de esta clase
              </h2>
              <ul className="space-y-2">
                {textosModulo.map((t) => (
                  <li key={t.id}>
                    <TextoModal textos={[t]}>
                      <div className="w-full flex items-center justify-between gap-3 rounded-lg border border-borde bg-white px-4 py-3 hover:border-azul transition-colors">
                        <div className="text-left">
                          <p className="text-sm font-semibold text-grafito">
                            {t.titulo}
                          </p>
                          <p className="text-xs text-gris">{t.autor}</p>
                        </div>
                        <span className="text-azul text-sm font-medium whitespace-nowrap">
                          <i className="fa-solid fa-book-open mr-1" />
                          Abrir
                        </span>
                      </div>
                    </TextoModal>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-borde bg-azul-fondo p-6 text-center">
          <p className="text-sm text-grafito font-medium">
            Clase en preparación
          </p>
          <p className="text-xs text-gris mt-1">
            Los pasos del método y los ejercicios se cargarán próximamente.
          </p>
        </div>
      )}
    </div>
  );
}
