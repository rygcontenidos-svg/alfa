"use client";

import { useState } from "react";
import {
  FileText,
  Calculator,
  Landmark,
  ArrowRight,
  StickyNote,
  ChartLine,
  UserCircle,
  LogOut,
  BookOpen,
  Lightbulb,
  PenLine,
  Target,
  TrendingUp,
} from "lucide-react";

// Paleta de marca — usar estos valores en tailwind.config.js como
// colors: { alfa: { indigo: "#5B4FE9", lime: "#D7FF1F" } }
// para poder escribir bg-alfa-indigo / text-alfa-lime en vez de arbitrary values.

const FRASES = [
  "Hoy practicás, mañana brillás",
  "Cada error te acerca a la victoria",
  "Sos capaz de mucho más de lo que pensás",
  "Paso a paso, vas llegando",
  "Estudiar también es entrenar",
  "Confiá en tu esfuerzo de hoy",
  "El que practica hoy, no improvisa el día del examen",
  "Equivocarte en un simulacro es gratis. En el examen, no.",
];

const MATERIAS = [
  {
    nombre: "Lengua",
    descripcion: "Primer examen del ingreso.",
    clases: 10,
    disponible: true,
    Icono: FileText,
  },
  {
    nombre: "Matemática",
    descripcion: "Próximamente.",
    clases: 5,
    disponible: false,
    Icono: Calculator,
  },
  {
    nombre: "Historia",
    descripcion: "Próximamente.",
    clases: 0,
    disponible: false,
    Icono: Landmark,
  },
];

// Cada paso tiene su propio color (familia clara para el fondo, oscura para
// el ícono/texto) para que el camino se lea de un vistazo, no como tarjetas
// idénticas en fila.
const METODO = [
  {
    numero: 1,
    nombre: "Comprender",
    descripcion: "Leer y entender",
    Icono: BookOpen,
    bg: "#EEEDFE",
    fg: "#3C3489",
  },
  {
    numero: 2,
    nombre: "Recordar",
    descripcion: "Flashcards",
    Icono: Lightbulb,
    bg: "#E1F5EE",
    fg: "#085041",
  },
  {
    numero: 3,
    nombre: "Practicar",
    descripcion: "Ejercicios guiados",
    Icono: PenLine,
    bg: "#FAEEDA",
    fg: "#633806",
  },
  {
    numero: 4,
    nombre: "Evaluarte",
    descripcion: "Simulacro",
    Icono: Target,
    bg: "#FBEAF0",
    fg: "#72243E",
  },
  {
    numero: 5,
    nombre: "Mejorar",
    descripcion: "Repasar errores",
    Icono: TrendingUp,
    bg: "#EAF3DE",
    fg: "#27500A",
  },
];

// Posiciones del camino en zigzag (versión desktop), en porcentaje del ancho
// del contenedor y en px de alto, sobre un lienzo de referencia de 680x260.
const CAMINO_DESKTOP = [
  { xPct: (60 / 680) * 100, y: 70 },
  { xPct: (200 / 680) * 100, y: 170 },
  { xPct: (340 / 680) * 100, y: 70 },
  { xPct: (480 / 680) * 100, y: 170 },
  { xPct: (620 / 680) * 100, y: 70 },
];

// Elige N frases al azar sin repetir, para que los papelitos no sean
// siempre los mismos en cada visita.
function elegirFrases(cantidad) {
  const copia = [...FRASES];
  const elegidas = [];
  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const idx = Math.floor(Math.random() * copia.length);
    elegidas.push(copia.splice(idx, 1)[0]);
  }
  return elegidas;
}

function Papelito({ texto, rotacion }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setAbierto(true)}
      aria-label={abierto ? texto : "Abrir papelito"}
      className={[
        "aspect-square w-full rounded-lg border flex items-center justify-center p-2 text-center transition-transform",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4FE9]",
        abierto
          ? "bg-[#F2F0FE] border-[#5B4FE9] rotate-0"
          : "bg-white border-gray-200 hover:border-gray-300 cursor-pointer",
      ].join(" ")}
      style={{ transform: abierto ? "rotate(0deg)" : `rotate(${rotacion}deg)` }}
    >
      {abierto ? (
        <p className="text-[11px] sm:text-xs font-medium leading-snug text-[#3C3489]">
          {texto}
        </p>
      ) : (
        <StickyNote className="w-5 h-5 text-gray-400" aria-hidden="true" />
      )}
    </button>
  );
}

function Papelitos() {
  // Memo simple por render: en producción podés mover esto a useMemo
  // si el componente re-renderiza seguido.
  const frases = elegirFrases(6);
  const rotaciones = [-3, 2, -2, 3, -2, 2];

  return (
    <div className="px-4 sm:px-8 pb-12">
      <p className="text-center text-xs text-gray-400 mb-4">
        Tocá un papelito
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-w-xl mx-auto">
        {frases.map((texto, i) => (
          <Papelito key={texto} texto={texto} rotacion={rotaciones[i]} />
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-[#5B4FE9] px-4 sm:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
      <span className="text-xl font-medium text-[#D7FF1F]">Alfa</span>

      <nav className="hidden sm:flex gap-7">
        <a href="/lengua" className="text-sm font-medium text-white">
          Lengua
        </a>
        <a href="/matematica" className="text-sm font-medium text-white/70">
          Matemática
        </a>
        <a href="/historia" className="text-sm font-medium text-white/70">
          Historia
        </a>
      </nav>

      <div className="flex items-center gap-4 sm:gap-5">
        <a
          href="/progreso"
          className="hidden sm:flex items-center gap-1.5 text-xs text-white"
        >
          <ChartLine className="w-4 h-4" aria-hidden="true" />
          Mi progreso
        </a>
        <span className="flex items-center gap-1.5 text-xs text-white">
          <UserCircle className="w-4 h-4" aria-hidden="true" />
          gabi
        </span>
        <button className="flex items-center gap-1.5 text-xs text-white">
          <LogOut className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="text-center px-4 pt-14 pb-8 sm:pt-16">
      <h1 className="text-5xl sm:text-6xl font-medium text-[#5B4FE9]">Alfa</h1>
      <p className="text-sm text-gray-500 max-w-md mx-auto mt-4 leading-relaxed">
        Del griego α (álpha). Primera letra del alfabeto griego. Símbolo del
        comienzo. Todo gran aprendizaje empieza por un primer paso.
      </p>
      <a
        href="/lengua"
        className="inline-block bg-[#D7FF1F] text-[#1c2400] text-sm font-medium px-7 py-3 rounded-lg mt-6 hover:brightness-95 transition"
      >
        Empezar a estudiar
      </a>
    </div>
  );
}

function Materias() {
  return (
    <section className="px-4 sm:px-8 py-12 bg-[#FAFAFC] text-center">
      <p className="text-xs font-medium tracking-wide text-[#5B4FE9] mb-2">
        ELEGÍ TU CAMINO
      </p>
      <h2 className="text-3xl font-medium text-gray-900 mb-2">Materias</h2>
      <p className="text-sm text-gray-500 mb-8">
        Cada materia tiene sus propias clases, ejercicios y simulacros.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
        {MATERIAS.map(({ nombre, descripcion, clases, disponible, Icono }) => (
          <article
            key={nombre}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <div
              className={[
                "w-9 h-9 rounded-md flex items-center justify-center mb-4",
                disponible ? "bg-[#5B4FE9]" : "bg-gray-100",
              ].join(" ")}
            >
              <Icono
                className={`w-[18px] h-[18px] ${
                  disponible ? "text-white" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              {nombre}
            </p>
            <p className="text-sm text-gray-500 mb-5">{descripcion}</p>
            <div className="flex items-center justify-between">
              <span
                className={[
                  "text-xs font-medium px-3 py-1.5 rounded-md",
                  disponible
                    ? "bg-[#5B4FE9] text-white"
                    : "bg-gray-100 text-gray-500",
                ].join(" ")}
              >
                {clases} clases
              </span>
              <ArrowRight
                className={`w-4 h-4 ${
                  disponible ? "text-[#5B4FE9]" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MetodoAlfaDesktop() {
  return (
    <div className="relative hidden sm:block" style={{ height: 260 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 680 260"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M60,70 L200,170 L340,70 L480,170 L620,70"
          fill="none"
          stroke="#E2E2E8"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          strokeLinecap="round"
        />
      </svg>

      {METODO.map(({ numero, nombre, descripcion, Icono, bg, fg }, i) => (
        <div
          key={numero}
          className="absolute flex flex-col items-center"
          style={{
            left: `${CAMINO_DESKTOP[i].xPct}%`,
            top: CAMINO_DESKTOP[i].y,
            width: 120,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: bg }}
          >
            <Icono className="w-6 h-6" style={{ color: fg }} aria-hidden="true" />
          </div>
          <p className="text-[13px] font-medium text-gray-900 mt-2 text-center">
            {numero}. {nombre}
          </p>
          <p className="text-[11px] text-gray-500 text-center">{descripcion}</p>
        </div>
      ))}
    </div>
  );
}

function MetodoAlfaMobile() {
  return (
    <div className="sm:hidden relative max-w-sm mx-auto">
      <div
        className="absolute left-7 top-2 bottom-2 border-l-2 border-dashed"
        style={{ borderColor: "#E2E2E8" }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-6">
        {METODO.map(({ numero, nombre, descripcion, Icono, bg, fg }) => (
          <div key={numero} className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
              style={{ background: bg }}
            >
              <Icono className="w-6 h-6" style={{ color: fg }} aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-medium text-gray-900">
                {numero}. {nombre}
              </p>
              <p className="text-[11px] text-gray-500">{descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetodoAlfa() {
  return (
    <section className="px-4 sm:px-8 py-14 text-center">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">Método Alfa</h2>
      <p className="text-sm text-gray-500 mb-10">
        Aprender no es memorizar. Es construir conocimiento paso a paso.
      </p>

      <div className="max-w-4xl mx-auto">
        <MetodoAlfaDesktop />
        <MetodoAlfaMobile />
      </div>
    </section>
  );
}

export default function AlfaHome() {
  return (
    <main className="bg-white">
      <Header />
      <Hero />
      <Papelitos />
      <Materias />
      <MetodoAlfa />
    </main>
  );
}
