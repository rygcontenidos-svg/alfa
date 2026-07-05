"use client";

import Link from "next/link";
import { useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import { listarModulos } from "@/lib/modulos";

const MATERIAS = [
  { id: "lengua", label: "Lengua", desc: "Primer examen del ingreso.", icono: "fa-solid fa-book" },
  { id: "matematica", label: "Matemática", desc: "Próximamente.", icono: "fa-solid fa-calculator" },
  { id: "historia", label: "Historia", desc: "Ejes, fuentes y multicausalidad.", icono: "fa-solid fa-landmark" },
  { id: "geografia", label: "Geografía", desc: "Próximamente.", icono: "fa-solid fa-earth-americas" },
];

export default function HomePage() {
  const todos = useMemo(() => listarModulos(), []);

  return (
    <SiteLayout>
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
    </SiteLayout>
  );
}
