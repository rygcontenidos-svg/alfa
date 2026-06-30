import type { TextoLectura } from "./tipos";

import cassette from "@/data/textos/cassette.json";
import memoriaHistorica from "@/data/textos/memoria-historica.json";
import entrevistaNora from "@/data/textos/entrevista-nora.json";
import cienAnos from "@/data/textos/cien-anos-soledad.json";
import esmaVisita from "@/data/textos/esma-visita.json";
import noHayNiUnAlma from "@/data/textos/no-hay-ni-un-alma.json";
import bajoLaLluvia from "@/data/textos/bajo-la-lluvia-ajena.json";
import analisisObra from "@/data/textos/analisis-obra.json";
import elLeonYLaLiebre from "@/data/textos/el-leon-y-la-liebre.json";
import estaCasaEsUnSueno from "@/data/textos/esta-casa-es-un-sueno.json";
import orfeoEuridice from "@/data/textos/orfeo-y-euridice.json";
import sakuraYohiro from "@/data/textos/sakura-y-yohiro.json";
import laCasaDelArbol from "@/data/textos/la-casa-del-arbol.json";
import avisaleAMiMama from "@/data/textos/avisale-a-mi-mama.json";
import leyendaCruzDelSur from "@/data/textos/leyenda-cruz-del-sur.json";
import demeter from "@/data/textos/demeter.json";
import elLeon from "@/data/textos/el-leon.json";
import mateCalentamientoNaturales from "@/data/textos/mate-calentamiento-naturales.json";
import mateCalentamientoDesigualdades from "@/data/textos/mate-calentamiento-desigualdades.json";
import mateCalentamientoDivision from "@/data/textos/mate-calentamiento-division.json";
import mateCalentamientoPrimos from "@/data/textos/mate-calentamiento-primos.json";
import mateCalentamientoPerimetro from "@/data/textos/mate-calentamiento-perimetro.json";
import mateCalentamientoArea from "@/data/textos/mate-calentamiento-area.json";
import mateCalentamientoFracciones from "@/data/textos/mate-calentamiento-fracciones.json";

const TEXTOS_JSON: Record<string, TextoLectura> = {
  cassette: cassette as unknown as TextoLectura,
  "memoria-historica": memoriaHistorica as unknown as TextoLectura,
  "entrevista-nora": entrevistaNora as unknown as TextoLectura,
  "cien-anos-soledad": cienAnos as unknown as TextoLectura,
  "esma-visita": esmaVisita as unknown as TextoLectura,
  "no-hay-ni-un-alma": noHayNiUnAlma as unknown as TextoLectura,
  "bajo-la-lluvia-ajena": bajoLaLluvia as unknown as TextoLectura,
  "analisis-obra": analisisObra as unknown as TextoLectura,
  "el-leon-y-la-liebre": elLeonYLaLiebre as unknown as TextoLectura,
  "esta-casa-es-un-sueno": estaCasaEsUnSueno as unknown as TextoLectura,
  "orfeo-y-euridice": orfeoEuridice as unknown as TextoLectura,
  "sakura-y-yohiro": sakuraYohiro as unknown as TextoLectura,
  "la-casa-del-arbol": laCasaDelArbol as unknown as TextoLectura,
  "avisale-a-mi-mama": avisaleAMiMama as unknown as TextoLectura,
  "leyenda-cruz-del-sur": leyendaCruzDelSur as unknown as TextoLectura,
  "demeter": demeter as unknown as TextoLectura,
  "el-leon": elLeon as unknown as TextoLectura,
  "mate-calentamiento-naturales": mateCalentamientoNaturales as unknown as TextoLectura,
  "mate-calentamiento-desigualdades": mateCalentamientoDesigualdades as unknown as TextoLectura,
  "mate-calentamiento-division": mateCalentamientoDivision as unknown as TextoLectura,
  "mate-calentamiento-primos": mateCalentamientoPrimos as unknown as TextoLectura,
  "mate-calentamiento-perimetro": mateCalentamientoPerimetro as unknown as TextoLectura,
  "mate-calentamiento-area": mateCalentamientoArea as unknown as TextoLectura,
  "mate-calentamiento-fracciones": mateCalentamientoFracciones as unknown as TextoLectura,
};

const TEXTOS_META: Omit<TextoLectura, "cuerpo" | "notas_al_pie">[] = [
  { id: "avisale-a-mi-mama", titulo: "Avisale a mi mamá", autor: "Mónica Zwaig", genero: "novela" },
  { id: "cassette", titulo: "Cassette", autor: "Anderson Imbert", genero: "cuento", clase: "Clase 1" },
  { id: "memoria-historica", titulo: "Memoria histórica (definición)", autor: "Cervantes (blog neológico)", genero: "otro", clase: "Clase 2" },
  { id: "entrevista-nora", titulo: "No hay que confundir memoria con historia", autor: "Diario La Nación", genero: "otro", clase: "Clase 2" },
  { id: "cien-anos-soledad", titulo: "Cien años de soledad (fragmento)", autor: "Gabriel García Márquez", genero: "novela", clase: "Clase 2" },
  { id: "esma-visita", titulo: "La Visita de las Cinco", autor: "Museo Sitio ESMA", genero: "otro", clase: "Clase 2" },
  { id: "no-hay-ni-un-alma", titulo: "No hay ni un alma", autor: "Silvana De Ingeniis", genero: "cuento", clase: "Clase 3" },
  { id: "bajo-la-lluvia-ajena", titulo: "Bajo la lluvia ajena", autor: "Juan Gelman", genero: "otro", clase: "Clase 3" },
  { id: "analisis-obra", titulo: "Análisis (fragmento)", autor: "Verónica Rodríguez", genero: "otro", clase: "Clase 3" },
  { id: "el-leon-y-la-liebre", titulo: "El león y la liebre", autor: "Anónimo (Panchatantra)", genero: "fabula", clase: "Clase 4" },
  { id: "esta-casa-es-un-sueno", titulo: "Esta casa es un sueño", autor: "Nicolás Schuff", genero: "cuento", clase: "Clase 5" },
  { id: "orfeo-y-euridice", titulo: "Orfeo y Eurídice", autor: "Mito griego", genero: "mito", clase: "Clase 6" },
  { id: "sakura-y-yohiro", titulo: "Sakura y Yohiro", autor: "Anónimo", genero: "leyenda", clase: "Clase 7" },
  { id: "la-casa-del-arbol", titulo: "La casa del árbol", autor: "I. Rivera", genero: "cuento", clase: "Clase 8" },
  { id: "leyenda-cruz-del-sur", titulo: "La cruz del sur", autor: "Adaptación de Susana Otero (Leyenda mocoví)", genero: "leyenda", clase: "Clase 10" },
  { id: "demeter", titulo: "Demeter", autor: "Anónimo (Mito griego adaptado)", genero: "mito", clase: "Simulacro 3" },
  { id: "el-leon", titulo: "El león", autor: "Anónimo (Adaptación de fábula india)", genero: "fabula", clase: "Simulacro 2" },
  { id: "mate-calentamiento-naturales", titulo: "Problema disparador: el cine", autor: "CIEEM 2026", genero: "otro", clase: "Clase 1" },
  { id: "mate-calentamiento-desigualdades", titulo: "Problema disparador: las revistas", autor: "CIEEM 2026", genero: "otro", clase: "Clase 2" },
  { id: "mate-calentamiento-division", titulo: "Problema disparador: las velas", autor: "CIEEM 2026", genero: "otro", clase: "Clase 3" },
  { id: "mate-calentamiento-primos", titulo: "Problema disparador: el juego de cartas", autor: "CIEEM 2026", genero: "otro", clase: "Clase 4" },
  { id: "mate-calentamiento-perimetro", titulo: "Problema disparador: el cerco de la pileta", autor: "CIEEM 2026", genero: "otro", clase: "Clase 5" },
  { id: "mate-calentamiento-area", titulo: "Problema disparador: la cuadrícula", autor: "CIEEM 2026", genero: "otro", clase: "Clase 6" },
  { id: "mate-calentamiento-fracciones", titulo: "Problema disparador: reparto de tartas y pizzas", autor: "CIEEM 2026", genero: "otro", clase: "Clase 7" },
];

export function listarTextos(): TextoLectura[] {
  return TEXTOS_META;
}

export function obtenerTexto(id: string): TextoLectura | undefined {
  if (TEXTOS_JSON[id]) return TEXTOS_JSON[id];
  return TEXTOS_META.find((t) => t.id === id);
}
