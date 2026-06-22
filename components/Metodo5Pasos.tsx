"use client";

import { NOMBRE_PASO, ORDEN_PASOS, type PasoMetodo } from "@/lib/tipos";
import { pasoDesbloqueado, progresoPct, type EstadoModulo } from "@/lib/progreso";

export default function Metodo5Pasos({
  estado,
  actual,
  onSeleccionar,
}: {
  estado: EstadoModulo;
  actual: PasoMetodo;
  onSeleccionar: (p: PasoMetodo) => void;
}) {
  const pct = progresoPct(estado);

  return (
    <div className="rounded-xl border border-borde bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-grafito">
          Método Objetivo Ingreso
        </h2>
        <span className="text-sm text-gris">{pct}%</span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-borde overflow-hidden mb-5">
        <div
          className="h-full bg-verde transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ol className="space-y-2">
        {ORDEN_PASOS.map((paso) => {
          const meta = NOMBRE_PASO[paso];
          const completado = estado.completados.includes(paso);
          const desbloqueado = pasoDesbloqueado(estado, paso);
          const esActual = actual === paso;
          const icono = completado ? "fa-solid fa-circle-check" : desbloqueado ? meta.icono : "fa-solid fa-lock";
          const iconoColor = completado ? "text-verde" : esActual ? "text-azul" : desbloqueado ? "text-grafito" : "text-gris";

          return (
            <li key={paso}>
              <button
                type="button"
                disabled={!desbloqueado}
                onClick={() => onSeleccionar(paso)}
                className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left text-base transition-colors ${
                  esActual
                    ? "bg-azul-fondo text-azul font-semibold"
                    : desbloqueado
                    ? "hover:bg-azul-fondo text-grafito"
                    : "text-gris cursor-not-allowed"
                }`}
              >
                <span className={`w-6 text-center text-lg shrink-0 ${iconoColor}`}>
                  <i className={icono} />
                </span>
                <span className="flex-1">{meta.label}</span>
                {esActual && (
                  <span className="text-[10px] uppercase tracking-wide text-azul-claro font-semibold px-1.5 py-0.5 rounded-full bg-white border border-azul-claro whitespace-nowrap">
                    en curso
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
