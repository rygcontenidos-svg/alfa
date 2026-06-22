"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import { listarModulos } from "@/lib/modulos";
import { estadoDe, progresoPct } from "@/lib/progreso";
import { useAuth } from "@/app/AuthProvider";
import type { Modulo } from "@/lib/tipos";

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

function elegirFrases(cantidad: number) {
  const copia = [...FRASES];
  const elegidas: string[] = [];
  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const idx = Math.floor(Math.random() * copia.length);
    elegidas.push(copia.splice(idx, 1)[0]);
  }
  return elegidas;
}

function Papelito({ texto, rotacion }: { texto: string; rotacion: number }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setAbierto(!abierto)}
      aria-label={abierto ? texto : "Abrir papelito"}
      className="aspect-square w-full rounded-lg border flex items-center justify-center p-2 text-center transition-all duration-500 cursor-pointer"
      style={{
        transform: abierto ? "rotate(0deg) scale(1.05)" : `rotate(${rotacion}deg)`,
        backgroundColor: abierto ? "#5657FF" : "#FFFFFF",
        borderColor: abierto ? "#5657FF" : "#5657FF",
        animation: abierto ? "none" : `float 3s ease-in-out infinite`,
        animationDelay: `${rotacion * 0.1}s`,
      }}
    >
      {abierto ? (
        <p className="text-[11px] sm:text-xs font-semibold leading-snug text-white">
          {texto}
        </p>
      ) : (
        <span className="text-lg font-bold" style={{ color: "#5657FF" }}>?</span>
      )}
    </button>
  );
}

function Papelitos() {
  const frases = useMemo(() => elegirFrases(6), []);
  const rotaciones = [-4, 3, -3, 4, -2, 3];

  return (
    <div className="px-4 sm:px-8 pb-10">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      <p className="text-center text-sm font-bold mb-4" style={{ color: "#5657FF" }}>
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

const MATERIAS = [
  { id: "lengua", label: "Lengua", desc: "Primer examen del ingreso.", icono: "fa-solid fa-book" },
  { id: "matematica", label: "Matemática", desc: "Próximamente.", icono: "fa-solid fa-calculator" },
  { id: "historia", label: "Historia", desc: "Próximamente.", icono: "fa-solid fa-landmark" },
  { id: "geografia", label: "Geografía", desc: "Próximamente.", icono: "fa-solid fa-earth-americas" },
];

const METODO = [
  { n: 1, titulo: "Comprender", desc: "Leer y entender", icono: "fa-solid fa-book-open" },
  { n: 2, titulo: "Recordar", desc: "Flashcards", icono: "fa-solid fa-lightbulb" },
  { n: 3, titulo: "Practicar", desc: "Ejercicios guiados", icono: "fa-solid fa-pen-to-square" },
  { n: 4, titulo: "Evaluarte", desc: "Simulacro", icono: "fa-solid fa-stopwatch" },
  { n: 5, titulo: "Mejorar", desc: "Repasar errores", icono: "fa-solid fa-arrow-trend-up" },
];

const CAMINO = [
  { xPct: "8.8", y: 100 },
  { xPct: "29.4", y: 260 },
  { xPct: "50", y: 100 },
  { xPct: "70.6", y: 260 },
  { xPct: "91.2", y: 100 },
];

function MetodoAlfaDesktop() {
  return (
    <div className="relative hidden sm:flex items-center justify-center mt-8 mb-4" style={{ minHeight: 200 }}>
      {METODO.map(({ n, titulo, desc, icono }, i) => (
        <div
          key={n}
          className="flex flex-col items-center"
          style={{ marginLeft: i > 0 ? "-16px" : 0, zIndex: METODO.length - i }}
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-[3px] border-white"
            style={{ background: "#5657FF" }}
          >
            <i className={`${icono}`} style={{ color: "#d4ff00", fontSize: "48px" }} aria-hidden="true" />
          </div>
          <p className="text-[17px] font-bold mt-4 text-center w-36" style={{ color: "#16181D" }}>
            {n}. {titulo}
          </p>
          <p className="text-[14px] text-center w-36 mt-1" style={{ color: "#6B7280" }}>{desc}</p>
        </div>
      ))}
    </div>
  );
}

function MetodoAlfaMobile() {
  return (
    <div className="sm:hidden relative max-w-xs mx-auto">
      <div
        className="absolute left-11 top-4 bottom-4 border-l-2 border-dashed"
        style={{ borderColor: "#D1D5DB" }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-10">
        {METODO.map(({ n, titulo, desc, icono }) => (
          <div key={n} className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shrink-0 relative z-10"
              style={{ background: "#5657FF" }}
            >
              <i className={`${icono}`} style={{ color: "#d4ff00", fontSize: "48px" }} aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-[15px] font-bold" style={{ color: "#16181D" }}>
                {n}. {titulo}
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: "#6B7280" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { usuario } = useAuth();
  const [stats, setStats] = useState<Record<string, { pct: number }>>({});
  const todos = useMemo(() => listarModulos(), []);

  useEffect(() => {
    const s: Record<string, any> = {};
    for (const m of todos) {
      const e = estadoDe(m.id, usuario);
      s[m.id] = { pct: progresoPct(e) };
    }
    setStats(s);
  }, [usuario, todos]);

  const ultimoModulo = useMemo(() => {
    let best: { modulo: Modulo; pct: number } | null = null;
    for (const m of todos) {
      const s = stats[m.id];
      if (!s || s.pct <= 0 || s.pct >= 100) continue;
      if (!best || s.pct > best.pct) best = { modulo: m, pct: s.pct };
    }
    return best;
  }, [stats, todos]);

  return (
    <SiteLayout>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[120px]">

        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center pt-16 sm:pt-20 pb-8">
          <h1
            className="font-bold tracking-wide"
            style={{ fontFamily: "Etna", fontSize: "clamp(56px, 10vw, 96px)", color: "#5657FF", lineHeight: 1 }}
          >
            Alfa
          </h1>
          <p className="mt-4 text-sm sm:text-[15px] max-w-md mx-auto leading-relaxed" style={{ color: "#6B7280" }}>
            Del griego α (álpha). Primera letra del alfabeto griego. Símbolo del comienzo.
            Todo gran aprendizaje empieza por un primer paso.
          </p>
          <Link
            href="/materia/lengua"
            className="inline-block mt-7 px-7 py-3 rounded-lg text-[15px] font-semibold hover:brightness-95 transition"
            style={{ backgroundColor: "#cafe03", color: "#1c2400" }}
          >
            Empezar a estudiar
          </Link>
        </section>

        {/* Papelitos */}
        <Papelitos />
      </div>

      {/* Materias — full width */}
      <section
        id="materias"
        className="py-16 sm:py-20 text-center px-6 sm:px-10 lg:px-[120px]"
        style={{ backgroundColor: "#fbfbff" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs font-medium tracking-wide mb-2 uppercase" style={{ color: "#5657FF", letterSpacing: "0.1em" }}>
            Elegí tu camino
          </p>
          <h2 className="text-3xl font-semibold mb-2" style={{ color: "#16181D" }}>
            Materias
          </h2>
          <p className="text-sm mb-10" style={{ color: "#6B7280" }}>
            Cada materia tiene sus propias clases, ejercicios y simulacros.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {MATERIAS.map((mat) => {
              const total = todos.filter((m) => m.materia === mat.id).length;
              const colorMateria = mat.id === "lengua" ? "#FF2070" : mat.id === "matematica" ? "#0e1cc3" : mat.id === "historia" ? "#FFAE00" : mat.id === "geografia" ? "#ACEC00" : "#FFFFFF";
              const esColor = colorMateria !== "#FFFFFF";
              return (
                <Link
                  key={mat.id}
                  href={`/materia/${mat.id}`}
                  className="group rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: colorMateria ?? "#FFFFFF",
                    border: colorMateria ? "none" : "1px solid #ECEEF7",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: esColor ? "#FFFFFF" : "#5657FF",
                      color: esColor ? colorMateria : "#FFFFFF",
                    }}
                  >
                    <i className={`${mat.icono} text-base`} />
                  </div>
                  <p className="text-base font-semibold mb-1" style={{ color: esColor ? "#FFFFFF" : "#16181D" }}>{mat.label}</p>
                  <p className="text-sm mb-5" style={{ color: esColor ? "rgba(255,255,255,0.8)" : "#6B7280" }}>{mat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-medium px-3 py-1.5 rounded-md"
                      style={{
                        backgroundColor: esColor ? "#FFFFFF" : "#EEF2FF",
                        color: esColor ? colorMateria : "#5657FF",
                      }}
                    >
                      {total} clases
                    </span>
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1" style={{ color: esColor ? "#FFFFFF" : "#5657FF" }}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[120px]">
        {/* Método Alfa */}
        <section className="py-14 sm:py-16 text-center">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "#16181D" }}>
            Método Alfa
          </h2>
          <p className="text-sm mb-12" style={{ color: "#6B7280" }}>
            Aprender no es memorizar. Es construir conocimiento paso a paso.
          </p>
          <div className="max-w-4xl mx-auto">
            <MetodoAlfaDesktop />
            <MetodoAlfaMobile />
          </div>
        </section>

        {/* Continuar estudiando */}
        {usuario && ultimoModulo && (
          <section className="pb-16">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "#16181D" }}>
              Continuar donde quedaste
            </h2>
            <Link
              href={`/modulo/${ultimoModulo.modulo.id}`}
              className="block rounded-xl p-5 max-w-lg group transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#F8F9FC", border: "1px solid #ECEEF7" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#5657FF" }}>
                {ultimoModulo.modulo.materia === "matematica" ? "Matemática" : ultimoModulo.modulo.materia === "historia" ? "Historia" : "Lengua"}
              </p>
              <p className="text-[15px] font-semibold mt-1" style={{ color: "#16181D" }}>
                {ultimoModulo.modulo.titulo}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="h-1.5 flex-1 rounded-full overflow-hidden" style={{ backgroundColor: "#ECEEF7" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${ultimoModulo.pct}%`, backgroundColor: ultimoModulo.pct === 100 ? "#16a34a" : "#5657FF" }}
                  />
                </div>
                <span className="text-[12px] font-medium" style={{ color: "#6B7280" }}>{ultimoModulo.pct}%</span>
              </div>
              <p className="mt-3 text-[13px] font-medium" style={{ color: "#5657FF" }}>Continuar →</p>
            </Link>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
