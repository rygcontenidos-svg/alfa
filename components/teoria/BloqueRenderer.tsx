import type { Bloque, ColorTema } from "@/lib/tipos";
import DiagramaComunicacion from "./DiagramaComunicacion";
import Emoji from "../Emoji";

const colorTarjeta: Record<ColorTema, { bg: string; border: string; text: string }> = {
  azul: { bg: "bg-azul-fondo", border: "border-azul", text: "text-azul" },
  verde: { bg: "bg-verde-claro", border: "border-verde", text: "text-verde" },
  amarillo: { bg: "bg-amarillo-claro", border: "border-amarillo", text: "text-amarillo" },
  naranja: { bg: "bg-naranja-claro", border: "border-naranja", text: "text-naranja" },
  rojo: { bg: "bg-rojo-claro", border: "border-rojo", text: "text-rojo" },
  violeta: { bg: "bg-violeta-claro", border: "border-violeta", text: "text-violeta" },
};

export default function BloqueRenderer({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case "parrafo":
      return (
        <p className="text-lg leading-relaxed text-grafito whitespace-pre-line">
          {bloque.texto}
        </p>
      );

    case "lista":
      return (
        <ul className="space-y-2.5">
          {bloque.items.map((it, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-base text-grafito leading-relaxed"
            >
              {it.icono && (
                <Emoji emoji={it.icono} className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <span className="flex-1">{it.texto}</span>
            </li>
          ))}
        </ul>
      );

    case "tarjeta_destacada": {
      const c = colorTarjeta[bloque.color ?? "azul"];
      return (
        <div className={`rounded-xl border-2 ${c.bg} ${c.border} p-4`}>
          {bloque.titulo && (
            <p className={`text-base font-bold ${c.text} mb-1.5`}>
              {bloque.titulo}
            </p>
          )}
          <p className="text-base text-grafito leading-relaxed whitespace-pre-line">
            {bloque.texto}
          </p>
        </div>
      );
    }

    case "diagrama_comunicacion":
      return <DiagramaComunicacion />;

    case "ejemplo":
      return (
        <div className="rounded-xl border-l-4 border-azul bg-azul-fondo p-4">
          <p className="text-xs font-semibold text-azul uppercase tracking-wide mb-1.5">
            Ejemplo
          </p>
          <p className="text-base italic text-grafito mb-2">“{bloque.cita}”</p>
          <p className="text-base text-gris leading-relaxed">
            {bloque.explicacion}
          </p>
        </div>
      );

    case "comparativa":
      return (
        <div className="grid sm:grid-cols-2 gap-3">
          {bloque.columnas.map((col, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 ${
                i === 0
                  ? "border-azul bg-azul-fondo"
                  : "border-verde bg-verde-claro"
              }`}
            >
              <p
                className={`text-base font-bold mb-2 ${
                  i === 0 ? "text-azul" : "text-verde"
                }`}
              >
                {col.titulo}
              </p>
              <ul className="space-y-1.5">
                {col.items.map((it, j) => (
                  <li
                    key={j}
                    className="text-sm text-grafito leading-relaxed flex gap-1.5"
                  >
                    <span className="text-gris">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
