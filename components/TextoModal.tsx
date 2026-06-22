"use client";

import { useState } from "react";
import type { TextoLectura } from "@/lib/tipos";

export default function TextoModal({
  textos,
  children,
}: {
  textos: TextoLectura[];
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-azul hover:text-azul-claro transition-colors"
      >
        {children}
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setAbierto(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-borde">
              <h3 className="text-base font-semibold text-grafito">
                <i className="fa-solid fa-book-open mr-2 text-azul" />
                Relectura del texto
              </h3>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="text-gris hover:text-grafito text-xl leading-none"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4 space-y-5">
              {textos.map((t) => (
                <article key={t.id}>
                  <header className="mb-3 pb-3 border-b border-borde">
                    <h4 className="text-lg font-bold text-grafito">
                      {t.titulo}
                    </h4>
                    <p className="text-sm text-gris">{t.autor}</p>
                  </header>
                  <div className="text-base leading-relaxed text-grafito whitespace-pre-line">
                    {t.cuerpo}
                  </div>
                </article>
              ))}
            </div>

            <div className="px-5 py-3 border-t border-borde text-center">
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="text-sm font-semibold text-azul hover:text-azul-claro"
              >
                Cerrar y volver al ejercicio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
