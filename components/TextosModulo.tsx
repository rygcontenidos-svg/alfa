"use client";

import type { TextoLectura } from "@/lib/tipos";
import TextoModal from "./TextoModal";

export default function TextosModulo({ textos }: { textos: TextoLectura[] }) {
  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold text-grafito mb-2">
        Textos de esta clase
      </h2>
      <ul className="space-y-2">
        {textos.map((t) => (
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
  );
}
