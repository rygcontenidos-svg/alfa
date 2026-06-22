import type { TextoLectura as T } from "@/lib/tipos";

export default function TextoBaseView({ texto }: { texto: T }) {
  return (
    <article className="rounded-2xl border border-borde bg-white p-5 sm:p-6">
      <header className="mb-5 pb-4 border-b border-borde">
        <h2 className="text-2xl font-bold text-grafito leading-tight">
          {texto.titulo}
        </h2>
        <p className="text-base text-gris mt-1">{texto.autor}</p>
        <div className="flex items-center gap-2 mt-2">
          {texto.genero !== "otro" && (
            <span className="px-2 py-0.5 rounded-full bg-azul-fondo text-azul text-[10px] font-medium uppercase tracking-wide">
              {texto.genero}
            </span>
          )}
          {texto.clase && (
            <span className="text-[10px] text-gris uppercase tracking-wide">
              {texto.clase}
            </span>
          )}
        </div>
      </header>

      <div className="text-lg leading-relaxed text-grafito whitespace-pre-line">
        {texto.cuerpo}
      </div>

      {texto.notas_al_pie && texto.notas_al_pie.length > 0 && (
        <footer className="mt-6 border-t border-borde pt-3 space-y-1">
          <p className="text-xs font-semibold text-gris uppercase tracking-wide">
            Notas
          </p>
          {texto.notas_al_pie.map((n) => (
            <p key={n.marca} className="text-xs text-gris">
              <sup className="text-azul-claro">{n.marca}</sup> {n.texto}
            </p>
          ))}
        </footer>
      )}
    </article>
  );
}
