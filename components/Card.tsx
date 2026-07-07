export default function Card({
  titulo,
  children,
  className = "",
}: {
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-borde bg-white p-5 ${className}`}
    >
      {titulo && (
        <h3 className="text-base font-semibold text-grafito mb-3 whitespace-pre-line">{titulo}</h3>
      )}
      {children}
    </section>
  );
}
