import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import { listarTextos } from "@/lib/textos";

export default function TextosPage() {
  const textos = listarTextos();
  const generoLabel: Record<string, string> = {
    novela: "Novela",
    cuento: "Cuento",
    fabula: "Fábula",
    mito: "Mito",
    leyenda: "Leyenda",
    otro: "Otro",
  };

  return (
    <SiteLayout>
      <Link
        href="/"
        className="text-xs text-gris hover:text-azul"
      >
        ← Volver al inicio
      </Link>

      <header className="mt-2 mb-6">
        <h1 className="text-xl font-bold text-grafito">Biblioteca de textos</h1>
        <p className="text-sm text-gris mt-1">
          Textos de lectura del Curso de Ingreso CNBA 2026.
        </p>
      </header>

      <ul className="space-y-2">
        {textos.map((t) => (
          <li key={t.id}>
            <div className="flex items-center justify-between rounded-lg border border-borde bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-grafito truncate">
                  {t.titulo}
                </p>
                <p className="text-xs text-gris">{t.autor}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {t.clase && (
                  <span className="text-[10px] text-gris uppercase tracking-wide">
                    {t.clase}
                  </span>
                )}
                {t.genero !== "otro" && (
                  <span className="px-2 py-0.5 rounded-full bg-azul-fondo text-azul text-[10px] font-medium uppercase tracking-wide">
                    {generoLabel[t.genero] ?? t.genero}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SiteLayout>
  );
}
