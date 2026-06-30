"use client";

import { useEffect, useState } from "react";
import Card from "../Card";
import { leerCheck, setCheck } from "@/lib/progreso";
import { useAuth } from "@/app/AuthProvider";

export function EjercicioShell({
  consigna,
  moduloId,
  ejercicioId,
  guia,
  children,
}: {
  consigna: string;
  moduloId: string;
  ejercicioId: string;
  guia?: string;
  children: (revelado: boolean) => React.ReactNode;
}) {
  const { usuario } = useAuth();
  const [revelado, setRevelado] = useState(false);
  const [check, setCheckState] = useState<"bien" | "repasar" | null>(null);

  const sinRespuestas = usuario === "mikuuchan00";

  useEffect(() => {
    setCheckState(leerCheck(moduloId, ejercicioId, usuario));
  }, [moduloId, ejercicioId, usuario]);

  function autocheck(v: "bien" | "repasar") {
    const nuevo = check === v ? null : v;
    setCheckState(nuevo);
    setCheck(moduloId, ejercicioId, nuevo, usuario);
  }

  return (
    <Card titulo={consigna}>
      {children(revelado)}

      {!revelado ? (
        <div className="mt-4 rounded-lg border border-dashed border-azul-claro bg-azul-fondo px-4 py-3">
          <p className="text-sm text-azul mb-1">
            <i className="fa-solid fa-pen-to-square mr-1" />
            Resolvé en tu cuaderno.
          </p>
          {sinRespuestas ? (
            <p className="text-xs text-grafito">
              {guia ?? "No hace falta que copies toda la consigna. Anotá solo las respuestas con el número o letra de cada item."}
            </p>
          ) : (
            <>
              <p className="text-xs text-grafito mb-3">
                {guia ?? "No hace falta que copies toda la consigna. Anotá solo las respuestas con el número o letra de cada item (1. V, 2. F, 3. V… / a) …, b) …, c) …). Así después podés comparar rápido con las respuestas."}
              </p>
              <button
                type="button"
                onClick={() => setRevelado(true)}
                className="rounded-lg bg-azul text-white text-sm font-semibold px-5 py-2 hover:bg-azul-claro transition-colors"
              >
                Ver respuestas
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-borde bg-white px-4 py-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setRevelado(false)}
              className="text-xs text-gris hover:text-azul"
            >
              Ocultar respuestas
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gris">¿Cómo te fue?</span>
              <button
                type="button"
                onClick={() => autocheck("bien")}
                className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                  check === "bien"
                    ? "bg-verde text-white border-verde"
                    : "border-verde text-verde hover:bg-verde-claro"
                }`}
              >
                <i className="fa-solid fa-circle-check mr-1" />
                Bien
              </button>
              <button
                type="button"
                onClick={() => autocheck("repasar")}
                className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                  check === "repasar"
                    ? "bg-amarillo text-white border-amarillo"
                    : "border-amarillo text-amarillo hover:bg-amarillo-claro"
                }`}
              >
                <i className="fa-solid fa-pen-to-square mr-1" />
                A repasar
              </button>
            </div>
          </div>
          {check === "bien" && (
            <p className="text-xs text-verde mt-2">
              <i className="fa-solid fa-circle-check mr-1" />
              Marcado como logrado.
            </p>
          )}
          {check === "repasar" && (
            <p className="text-xs text-amarillo mt-2">
              <i className="fa-solid fa-pen-to-square mr-1" />
              Anotado para repasar en el paso Mejorá.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
