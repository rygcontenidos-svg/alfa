import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import { listarTextos, obtenerTexto } from "@/lib/textos";

export function generateStaticParams() {
  return listarTextos().map((t) => ({ textoId: t.id }));
}

export default async function TextoPage({
  params,
}: {
  params: Promise<{ textoId: string }>;
}) {
  const { textoId } = await params;
  const texto = obtenerTexto(textoId);
  if (!texto) notFound();

  return (
    <SiteLayout>
      <Link href="/textos" className="text-xs text-gris hover:text-azul">
        ← Volver a la biblioteca
      </Link>

      <header className="mt-2 mb-6">
        <h1 className="text-xl font-bold text-grafito leading-tight">
          {texto.titulo}
        </h1>
        <p className="text-sm text-gris mt-1">{texto.autor}</p>
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

      {texto.cuerpo ? (
        <article className="rounded-xl border border-borde bg-white p-5 text-[15px] leading-relaxed text-grafito whitespace-pre-line">
          {texto.cuerpo}
        </article>
      ) : (
        <div className="rounded-xl border border-dashed border-borde bg-azul-fondo p-6 text-center">
          <p className="text-sm text-grafito font-medium">
            Texto en preparación
          </p>
          <p className="text-xs text-gris mt-1">
            El contenido se cargará a partir del PDF de la clase.
          </p>
        </div>
      )}
    </SiteLayout>
  );
}
