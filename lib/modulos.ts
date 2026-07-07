import type { Modulo } from "./tipos";

import comunicacionFunciones from "@/data/modulos/comunicacion-funciones-lenguaje.json";
import tiposDeTextos from "@/data/modulos/tipos-de-textos-literario-no-literario.json";
import generosLiterarios from "@/data/modulos/comprension-generos-literarios.json";
import narrativoTiempos from "@/data/modulos/tipo-textual-narrativo-secuencia-narrador-tiempos.json";
import revisionNarrativo from "@/data/modulos/revision-narrativo-puntuacion-scz.json";
import mitoElipsis from "@/data/modulos/mito-cohesion-elipsis-tildacion.json";
import leyendaParafasis from "@/data/modulos/leyenda-parafasis-tildacion-especial.json";
import cuentoRealista from "@/data/modulos/cuento-realista-coherencia-sinonimia-uso-b.json";
import novelaAvisale from "@/data/modulos/novela-avisale-a-mi-mama.json";
import simulacro1 from "@/data/modulos/simulacro-1-lengua.json";
import simulacro2 from "@/data/modulos/simulacro-2-lengua.json";
import simulacro3 from "@/data/modulos/simulacro-3-lengua.json";
import mateNaturales from "@/data/modulos/mate-naturales-operaciones.json";
import mateDesigualdades from "@/data/modulos/mate-desigualdades-traduccion-recta.json";
import mateDivision from "@/data/modulos/mate-division-entera-multiplos-divisibilidad.json";
import matePrimos from "@/data/modulos/mate-numeros-primos-compuestos-factorizacion.json";
import matePerimetro from "@/data/modulos/mate-perimetro-cuadrado-rectangulo-triangulo.json";
import mateArea from "@/data/modulos/mate-area-cuadrado-rectangulo.json";
import mateFracciones from "@/data/modulos/mate-fracciones-concepto-equivalencias.json";
import mateFraccionesRecta from "@/data/modulos/mate-fracciones-recta-suma-resta.json";
import historiaEje1 from "@/data/modulos/historia-eje-1.json";
import historiaEje4 from "@/data/modulos/historia-eje-4.json";
import historiaEje5 from "@/data/modulos/historia-eje-5.json";
import historiaEje6 from "@/data/modulos/historia-eje-6.json";
import simulacro1Historia from "@/data/modulos/simulacro-1-historia.json";

const MODULOS_JSON: Record<string, Modulo> = {
  "comunicacion-funciones-lenguaje":
    comunicacionFunciones as unknown as Modulo,
  "tipos-de-textos-literario-no-literario":
    tiposDeTextos as unknown as Modulo,
  "comprension-generos-literarios":
    generosLiterarios as unknown as Modulo,
  "tipo-textual-narrativo-secuencia-narrador-tiempos":
    narrativoTiempos as unknown as Modulo,
  "revision-narrativo-puntuacion-scz":
    revisionNarrativo as unknown as Modulo,
  "mito-cohesion-elipsis-tildacion":
    mitoElipsis as unknown as Modulo,
  "leyenda-parafasis-tildacion-especial":
    leyendaParafasis as unknown as Modulo,
  "cuento-realista-coherencia-sinonimia-uso-b":
    cuentoRealista as unknown as Modulo,
  "novela-avisale-a-mi-mama":
    novelaAvisale as unknown as Modulo,
  "simulacro-1-lengua":
    simulacro1 as unknown as Modulo,
  "simulacro-2-lengua":
    simulacro2 as unknown as Modulo,
  "simulacro-3-lengua":
    simulacro3 as unknown as Modulo,
  "mate-naturales-operaciones":
    mateNaturales as unknown as Modulo,
  "mate-desigualdades-traduccion-recta":
    mateDesigualdades as unknown as Modulo,
  "mate-division-entera-multiplos-divisibilidad":
    mateDivision as unknown as Modulo,
  "mate-numeros-primos-compuestos-factorizacion":
    matePrimos as unknown as Modulo,
  "mate-perimetro-cuadrado-rectangulo-triangulo":
    matePerimetro as unknown as Modulo,
  "mate-area-cuadrado-rectangulo":
    mateArea as unknown as Modulo,
  "mate-fracciones-concepto-equivalencias":
    mateFracciones as unknown as Modulo,
  "mate-fracciones-recta-suma-resta":
    mateFraccionesRecta as unknown as Modulo,
  "historia-eje-1":
    historiaEje1 as unknown as Modulo,
  "historia-eje-4":
    historiaEje4 as unknown as Modulo,
  "historia-eje-5":
    historiaEje5 as unknown as Modulo,
  "historia-eje-6":
    historiaEje6 as unknown as Modulo,
  "simulacro-1-historia":
    simulacro1Historia as unknown as Modulo,
};

const MODULOS_META: Omit<Modulo, "ejercicios" | "metodo" | "textos_ids">[] = [
  {
    id: "comunicacion-funciones-lenguaje",
    materia: "lengua",
    titulo: "La comunicación. Funciones del lenguaje",
    descripcion:
      "Circuito de la comunicación (emisor, receptor, mensaje, canal, código, referente) y funciones del lenguaje: referencial, emotiva, apelativa, poética.",
    estado: "completo",
  },
  {
    id: "tipos-de-textos-literario-no-literario",
    materia: "lengua",
    titulo: "Tipos de textos. Texto literario y no literario",
    descripcion:
      "Qué es un texto. Tipos textuales: narrativo, descriptivo, dialogal y explicativo. Diferencia entre texto literario y no literario.",
    estado: "completo",
  },
  {
    id: "comprension-generos-literarios",
    materia: "lengua",
    titulo: "Comprensión. Géneros literarios",
    descripcion:
      "Géneros literarios: narrativo, lírico y dramático. Características y reconocimiento. Comprensión lectora de textos de los tres géneros.",
    estado: "completo",
  },
  {
    id: "tipo-textual-narrativo-secuencia-narrador-tiempos",
    materia: "lengua",
    titulo:
      "Tipo textual narrativo. Secuencia. Tipos de narrador. Uso de tiempos verbales en la narración",
    descripcion:
      "Marco narrativo, núcleos narrativos y secuencia. Narrador protagonista, testigo y omnisciente. Tiempos verbales en la narración: pretérito perfecto simple, imperfecto, pluscuamperfecto y condicional simple.",
    estado: "completo",
  },
  {
    id: "revision-narrativo-puntuacion-scz",
    materia: "lengua",
    titulo: "Revisión: género narrativo. Puntuación general. S/C/Z",
    descripcion:
      "Repaso integrador del género narrativo. Uso de coma, punto y punto y coma. Normativa gráfica de S, C y Z.",
    estado: "completo",
  },
  {
    id: "mito-cohesion-elipsis-tildacion",
    materia: "lengua",
    titulo: "Mito. Cohesión: la elipsis. Tildación",
    descripcion:
      "El mito como género. Recursos de cohesión, en particular la elipsis. Repaso general de tildación.",
    estado: "completo",
  },
  {
    id: "leyenda-parafasis-tildacion-especial",
    materia: "lengua",
    titulo:
      "Leyenda. Paráfrasis. Tildación (casos especiales): hiato y tilde diacrítica de los monosílabos",
    descripcion:
      "La leyenda como género. Paráfrasis. Hiato y tilde diacrítica en monosílabos (él/el, más/mas, sí/si, tú/tu).",
    estado: "completo",
  },
  {
    id: "cuento-realista-coherencia-sinonimia-uso-b",
    materia: "lengua",
    titulo:
      "Cuento realista. Cohesión y coherencia: sinonimia y paráfrasis. Uso de B",
    descripcion:
      "El cuento realista. Recursos cohesivos: sinonimia y paráfrasis. Coherencia textual. Normativa gráfica del uso de B.",
    estado: "completo",
  },
  {
    id: "novela-avisale-a-mi-mama",
    materia: "lengua",
    titulo: "La novela. Avisale a mi mamá, de Mónica Zwaig",
    descripcion:
      "La novela como texto literario del género narrativo. Características: extensión, personajes, conflictos, capítulos, tiempos, inclusión de otros géneros. Registros lingüísticos. Ciencia ficción. Memoria personal y colectiva.",
    estado: "completo",
  },
  {
    id: "simulacro-1-lengua",
    materia: "lengua",
    titulo: "Simulacro 1: primera evaluación de Lengua",
    descripcion:
      "Simulacro integrador que abarca: comunicación, funciones del lenguaje, géneros literarios, tipo textual narrativo, cohesión, coherencia, tildación y normativa gráfica. Incluye lectura de la leyenda 'La cruz del sur'.",
    estado: "completo",
  },
  {
    id: "simulacro-2-lengua",
    materia: "lengua",
    titulo: "Simulacro 2: segunda evaluación de Lengua",
    descripcion:
      "Simulacro que abarca: circuito de la comunicación, comprensión lectora de 'El león', marco narrativo, tipo de narrador, tipos textuales, clases de palabras y análisis de 'La hormiga y la paloma'.",
    estado: "completo",
  },
  {
    id: "simulacro-3-lengua",
    materia: "lengua",
    titulo: "Simulacro 3: tercera evaluación de Lengua",
    descripcion:
      "Simulacro integrador que abarca: mito, géneros literarios, tipo textual, tiempos verbales, cohesión, tildación, circuito de la comunicación, normativa gráfica, novela 'Avisale a mi mamá' y repaso de cuentos del primer parcial.",
    estado: "completo",
  },
  {
    id: "mate-naturales-operaciones",
    materia: "matematica",
    titulo: "Números naturales. Operaciones y propiedades",
    descripcion:
      "Números naturales (N y N₀). Orden de las operaciones. Propiedades: conmutativa, asociativa, distributiva. Estrategias de cálculo. Traducción de enunciados.",
    estado: "completo",
  },
  {
    id: "mate-desigualdades-traduccion-recta",
    materia: "matematica",
    titulo: "Desigualdades. Traducción de enunciados. Recta numérica",
    descripcion:
      "Desigualdades: <, >, ≤, ≥. Traducción de enunciados coloquiales al lenguaje simbólico y viceversa. Representación de números naturales en la recta numérica.",
    estado: "completo",
  },
  {
    id: "mate-division-entera-multiplos-divisibilidad",
    materia: "matematica",
    titulo: "División entera. Múltiplos y divisores. Divisibilidad",
    descripcion:
      "División entera: dividendo, divisor, cociente y resto (0 ≤ r < b). Múltiplos y divisores. Criterios de divisibilidad por 2, 3, 4, 5, 9 y 10.",
    estado: "completo",
  },
  {
    id: "mate-numeros-primos-compuestos-factorizacion",
    materia: "matematica",
    titulo: "Números primos y compuestos. Descomposición en factores primos",
    descripcion:
      "Números primos (2 divisores) y compuestos (más de 2 divisores). Descomposición en factores primos. Aplicaciones.",
    estado: "completo",
  },
  {
    id: "mate-perimetro-cuadrado-rectangulo-triangulo",
    materia: "matematica",
    titulo: "Perímetro del cuadrado, rectángulo y triángulo",
    descripcion:
      "Perímetro: definición y cálculo. Perímetro del cuadrado, rectángulo y triángulo. Perímetro de figuras compuestas. Problemas con cuadrícula.",
    estado: "completo",
  },
  {
    id: "mate-area-cuadrado-rectangulo",
    materia: "matematica",
    titulo: "Área del cuadrado y del rectángulo. Perímetros y áreas",
    descripcion:
      "Área en cuadrícula. Área del cuadrado (lado²) y del rectángulo (base × altura). Relación entre perímetro y área. Figuras compuestas: sumar y restar áreas. Problemas con expresiones algebraicas.",
    estado: "completo",
  },
  {
    id: "mate-fracciones-concepto-equivalencias",
    materia: "matematica",
    titulo: "Números racionales no negativos. Fracciones",
    descripcion:
      "Fracción de la unidad. Fracciones equivalentes (amplificar y simplificar). Fracción irreducible. Fracción de una cantidad. Reconstrucción de la unidad.",
    estado: "completo",
  },
  {
    id: "mate-fracciones-recta-suma-resta",
    materia: "matematica",
    titulo: "Orden y representación en la recta numérica. Suma y resta de fracciones",
    descripcion:
      "Representación de fracciones en la recta numérica. Comparación y orden. Suma y resta de fracciones con igual y distinto denominador. Problemas de aplicación.",
    estado: "completo",
  },
  {
    id: "historia-eje-1",
    materia: "historia",
    titulo: "Eje 1: Introducción a la Historia. Tiempo, espacio, fuentes, ciencias auxiliares y multicausalidad",
    descripcion:
      "La Historia como ciencia. Tiempo cronológico e histórico. Periodización. Fuentes: escritas, materiales, orales y audiovisuales. Ciencias auxiliares. Multicausalidad, cambios, continuidades y contexto histórico.",
    estado: "completo",
  },
  {
    id: "historia-eje-4",
    materia: "historia",
    titulo: "Eje 4: Primera Guerra Mundial, Revolución Rusa, crisis del '30 y regímenes totalitarios",
    descripcion:
      "Paz Armada y Primera Guerra Mundial (1914-1918). Revolución Rusa. Felices años 20 y Gran Depresión de 1929. New Deal. Regímenes totalitarios en Europa. Argentina: gobiernos radicales, Golpe de 1930 y Década Infame.",
    estado: "completo",
  },
  {
    id: "historia-eje-5",
    materia: "historia",
    titulo: "Eje 5: Segunda Guerra Mundial, Holocausto y el ascenso de Perón en Argentina",
    descripcion:
      "Camino a la Segunda Guerra Mundial (1939-1945): expansionismo nazi, Pacto Molotov-Ribbentrop, frentes y batallas decisivas. El Holocausto: leyes de Nuremberg, guetos y 'solución final'. Conferencias de paz y nuevo orden mundial. Argentina: Golpe de 1943, medidas laborales de Perón y el 17 de octubre de 1945.",
    estado: "completo",
  },
  {
    id: "historia-eje-6",
    materia: "historia",
    titulo: "Eje 6: La Guerra Fría. Mundo bipolar, conflictos y fin de la URSS",
    descripcion:
      "El mundo bipolar tras la Segunda Guerra Mundial. Bloqueo de Berlín, Plan Marshall, OTAN y Pacto de Varsovia. Guerra de Corea, Revolución Cubana y Crisis de los Misiles. Muro de Berlín. Carrera espacial. Guerra de Vietnam. Deporte y Guerra Fría. Perestroika, Glasnost y disolución de la URSS.",
    estado: "completo",
  },
  {
    id: "simulacro-1-historia",
    materia: "historia",
    titulo: "Simulacro 1: Ejes 4, 5 y 6",
    descripcion:
      "Simulacro integrador de Historia (BACP) que abarca: Primera Guerra Mundial, Años Dorados, Gran Depresión, Revolución Rusa, Argentina entre 1880 y 1930, Segunda Guerra Mundial, Holocausto, Guerra Fría y Argentina entre 1938 y 1945.",
    estado: "completo",
  },
];

export function listarModulos(): Modulo[] {
  return MODULOS_META.map((m) => {
    if (MODULOS_JSON[m.id]) return MODULOS_JSON[m.id];
    return m as Modulo;
  });
}

export function obtenerModulo(id: string): Modulo | undefined {
  if (MODULOS_JSON[id]) return MODULOS_JSON[id];
  return MODULOS_META.find((m) => m.id === id) as Modulo | undefined;
}
