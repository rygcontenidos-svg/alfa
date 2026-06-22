import Emoji from "../Emoji";

type Nodo = {
  icono: string;
  etiqueta: string;
  definicion: string;
  color: string;
  bg: string;
};

const NODOS: Nodo[] = [
  {
    icono: "🎤",
    etiqueta: "Emisor",
    definicion: "Quien produce el mensaje",
    color: "text-azul",
    bg: "bg-azul-fondo border-azul",
  },
  {
    icono: "👂",
    etiqueta: "Receptor",
    definicion: "Quien recibe el mensaje",
    color: "text-azul",
    bg: "bg-azul-fondo border-azul",
  },
  {
    icono: "💬",
    etiqueta: "Mensaje",
    definicion: "Lo que el emisor transmite",
    color: "text-verde",
    bg: "bg-verde-claro border-verde",
  },
  {
    icono: "📡",
    etiqueta: "Canal",
    definicion: "El medio físico (oral, escrito, audiovisual)",
    color: "text-amarillo",
    bg: "bg-amarillo-claro border-amarillo",
  },
  {
    icono: "📖",
    etiqueta: "Código",
    definicion: "Sistema de signos compartido",
    color: "text-amarillo",
    bg: "bg-amarillo-claro border-amarillo",
  },
  {
    icono: "🔎",
    etiqueta: "Referente",
    definicion: "El tema de lo que se habla",
    color: "text-verde",
    bg: "bg-verde-claro border-verde",
  },
  {
    icono: "📍",
    etiqueta: "Marco",
    definicion: "Las circunstancias (lugar y tiempo)",
    color: "text-grafito",
    bg: "bg-gray-100 border-gray-400",
  },
];

export default function DiagramaComunicacion() {
  return (
    <div>
      <div className="rounded-2xl border-2 border-borde bg-white p-4">
        <div className="flex items-center justify-center gap-3 mb-4 text-sm font-semibold text-grafito flex-wrap">
          <span className="px-3 py-1 rounded-full bg-azul-fondo text-azul flex items-center gap-1.5">
            <Emoji emoji="🎤" className="w-4 h-4" /> Emisor
          </span>
          <span className="text-azul-claro text-lg">→</span>
          <span className="px-3 py-1 rounded-full bg-verde-claro text-verde flex items-center gap-1.5">
            <Emoji emoji="💬" className="w-4 h-4" /> Mensaje
          </span>
          <span className="text-azul-claro text-lg">→</span>
          <span className="px-3 py-1 rounded-full bg-azul-fondo text-azul flex items-center gap-1.5">
            <Emoji emoji="👂" className="w-4 h-4" /> Receptor
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {NODOS.map((n) => (
            <div
              key={n.etiqueta}
              className={`rounded-xl border-2 p-3 text-center ${n.bg}`}
            >
              <div className="mb-1 flex justify-center">
                <Emoji emoji={n.icono} className="w-7 h-7" />
              </div>
              <p className={`text-sm font-bold ${n.color}`}>{n.etiqueta}</p>
              <p className="text-[11px] text-gris leading-snug mt-0.5">
                {n.definicion}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gris text-center mt-3 italic">
        En la comunicación oral cara a cara, los roles de emisor y receptor
        pueden intercambiarse.
      </p>
    </div>
  );
}
