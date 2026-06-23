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
