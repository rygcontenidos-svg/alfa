import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import ModuloCliente from "@/components/ModuloCliente";
import TextosModulo from "@/components/TextosModulo";
import { listarModulos, obtenerModulo } from "@/lib/modulos";
import { obtenerTexto } from "@/lib/textos";

export function generateStaticParams() {
  return listarModulos().map((m) => ({ moduloId: m.id }));
}

export default async function ModuloPage({
  params,
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = await params;
  const modulo = obtenerModulo(moduloId);
  if (!modulo) notFound();

  const textos = (modulo.textos_ids ?? [])
    .map((id) => obtenerTexto(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof obtenerTexto>>[];

  return (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[120px] py-8">
        <ModuloCliente modulo={modulo} />
        {textos.length > 0 && <TextosModulo textos={textos} />}
      </div>
    </SiteLayout>
  );
}
