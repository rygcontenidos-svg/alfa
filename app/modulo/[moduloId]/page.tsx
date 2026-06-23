import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import ModuloCliente from "@/components/ModuloCliente";
import { listarModulos, obtenerModulo } from "@/lib/modulos";

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

  return (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[120px] py-8">
        <ModuloCliente modulo={modulo} />
      </div>
    </SiteLayout>
  );
}
