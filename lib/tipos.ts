export type GeneroTexto = "mito" | "leyenda" | "cuento" | "fabula" | "novela" | "otro";

export type NotaAlPie = { marca: number; texto: string };

export type TextoLectura = {
  id: string;
  titulo: string;
  autor: string;
  genero: GeneroTexto;
  clase?: string;
  cuerpo?: string;
  solucion?: string;
  notas_al_pie?: NotaAlPie[];
};

export type FiguraDef = {
  tipo: "cuadricula";
  grilla: (string | null)[][];
  celda?: number;
  etiquetas?: { fila: number; col: number; texto: string; pos?: "arriba" | "abajo" | "izquierda" | "derecha" }[];
  medidas?: { lado: "arriba" | "abajo" | "izquierda" | "derecha"; desde: number; hasta: number; texto: string }[];
} | {
  tipo: "imagen";
  src: string;
  alt?: string;
  ancho?: number;
};

export type EjercicioBase = { id: string; consigna: string; figura?: FiguraDef };

export type SeleccionMultiple = EjercicioBase & {
  tipo: "seleccion_multiple";
  opciones: { id: string; texto: string }[];
  correcta: string;
  explicacion?: string;
};

export type VerdaderoFalso = EjercicioBase & {
  tipo: "verdadero_falso";
  labels?: { verdadero: string; falso: string };
  items: {
    id: string;
    afirmacion: string;
    respuesta: boolean;
    correccion?: string;
  }[];
};

export type CircuitoComunicacion = EjercicioBase & {
  tipo: "circuito_comunicacion";
  frase: string;
  nodos: { id: string; etiqueta: string; respuesta: string }[];
  funcion_lenguaje: { opciones: string[]; correcta: string };
};

export type TildacionGeneral = EjercicioBase & {
  tipo: "tildacion_general";
  columnas: string[];
  palabras: {
    id: string;
    palabra: string;
    columna_correcta: string;
    justificacion: string;
  }[];
};

export type TildacionDiacritica = EjercicioBase & {
  tipo: "tildacion_diacritica";
  filas: { palabra: string; clase: string; ejemplo: string }[];
};

export type TildacionSilabas = EjercicioBase & {
  tipo: "tildacion_silabas";
  filas: {
    palabra: string;
    separacion: string;
    clase: string;
    lleva_tilde: boolean;
    porque: string;
  }[];
};

export type NormativaGrafica = EjercicioBase & {
  tipo: "normativa_grafica";
  items: (
    | { id: string; modo: "completar"; texto: string; opciones: string[]; correcta: string }
    | { id: string; modo: "regla"; regla: string; ejemplo_correcto: string }
  )[];
};

export type TiemposVerbales = EjercicioBase & {
  tipo: "tiempos_verbales";
  filas: { ejemplo: string; tiempo: string; uso: string }[];
  usos_para_relacionar: string[];
};

export type ParafasisSinonimosElision = EjercicioBase & {
  tipo: "parafasis_sinonimos_elision";
  items: {
    id: string;
    subtipo: "parafasis" | "sinonimo" | "elision";
    pregunta: string;
    respuesta: string;
  }[];
};

export type MarcoNarrativo = EjercicioBase & {
  tipo: "marco_narrativo";
  personajes: string;
  lugar: string;
  tiempo: string;
};

export type TipoNarrador = EjercicioBase & {
  tipo: "tipo_narrador";
  opciones: string[];
  correcta: string;
  cita_justificacion: string;
};

export type TipoTextual = EjercicioBase & {
  tipo: "tipo_textual";
  filas: { caracteristica: string; ejemplo: string }[];
};

export type OrdenarSecuencia = EjercicioBase & {
  tipo: "ordenar_secuencia";
  eventos: { id: string; texto: string; orden: number }[];
};

export type CoherenciaCohesion = EjercicioBase & {
  tipo: "coherencia_cohesion";
  fragmento: string;
  recursos_opciones: string[];
  items: { id: string; fragmento_destacado: string; recurso_correcto: string }[];
};

export type ReescrituraNormativa = EjercicioBase & {
  tipo: "reescritura_normativa";
  versiones: { id: string; texto: string }[];
  correcta: string;
};

export type Completar = EjercicioBase & {
  tipo: "completar";
  items: {
    id: string;
    subtipo: "texto" | "select";
    pregunta: string;
    respuesta?: string;
    opciones?: string[];
    explicacion?: string;
  }[];
};

export type CompletarCuadro = EjercicioBase & {
  tipo: "completar_cuadro";
  columnas: string[];
  filas: { id: string; celdas: string[] }[];
};

export type UnirFlechas = EjercicioBase & {
  tipo: "unir_flechas";
  izquierda: { id: string; texto: string }[];
  derecha: { id: string; texto: string }[];
  pares: { izquierda_id: string; derecha_id: string }[];
};

export type RectaNumerica = EjercicioBase & {
  tipo: "recta_numerica";
  marcas?: {
    etiqueta_inferior: string;
    etiqueta_superior?: string;
  }[];
  items: {
    id: string;
    subtipo: "texto" | "select";
    pregunta: string;
    respuesta: string;
    opciones?: string[];
    explicacion?: string;
    marcas?: {
      etiqueta_inferior: string;
      etiqueta_superior?: string;
    }[];
  }[];
};

export type Ejercicio =
  | SeleccionMultiple
  | VerdaderoFalso
  | CircuitoComunicacion
  | TildacionGeneral
  | TildacionDiacritica
  | TildacionSilabas
  | NormativaGrafica
  | TiemposVerbales
  | ParafasisSinonimosElision
  | MarcoNarrativo
  | TipoNarrador
  | TipoTextual
  | OrdenarSecuencia
  | CoherenciaCohesion
  | ReescrituraNormativa
  | Completar
  | CompletarCuadro
  | UnirFlechas
  | RectaNumerica;

export type ColorTema = "azul" | "verde" | "amarillo" | "naranja" | "rojo" | "violeta";

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "lista"; items: { icono?: string; texto: string }[] }
  | {
      tipo: "tarjeta_destacada";
      titulo?: string;
      texto: string;
      color?: ColorTema;
    }
  | { tipo: "diagrama_comunicacion" }
  | { tipo: "ejemplo"; cita: string; explicacion: string }
  | { tipo: "comparativa"; columnas: { titulo: string; items: string[] }[] };

export type Diapositiva = {
  id: string;
  titulo: string;
  icono: string;
  color?: ColorTema;
  bloques: Bloque[];
};

export type PasoMetodo =
  | "calentamiento"
  | "entender"
  | "recordar"
  | "practicar"
  | "ponerse_a_prueba"
  | "mejorar";

export type Metodo = {
  calentamiento: { textos_ids: string[] };
  entender: { diapositivas: Diapositiva[] };
  recordar: { flashcards: { pregunta: string; respuesta: string }[] };
  practicar: { ejercicios_ids: string[] };
  ponerse_a_prueba: { ejercicios_ids: string[]; duracion_min: number };
  mejorar: { explicaciones: { titulo: string; detalle: string }[] };
};

export type Modulo = {
  id: string;
  materia: string;
  titulo: string;
  descripcion: string;
  tipo?: "normal" | "simulacro";
  textos_ids?: string[];
  ejercicios?: Ejercicio[];
  metodo?: Metodo;
  duracion_min?: number;
  estado: "borrador" | "en_progreso" | "completo";
};

export const ORDEN_PASOS: PasoMetodo[] = [
  "calentamiento",
  "entender",
  "recordar",
  "practicar",
  "ponerse_a_prueba",
  "mejorar",
];

export const NOMBRE_PASO: Record<
  PasoMetodo,
  { n: string; label: string; icono: string }
> = {
  calentamiento: { n: "0", label: "Calentamiento", icono: "fa-solid fa-fire" },
  entender: { n: "1", label: "Entendé", icono: "fa-solid fa-lightbulb" },
  recordar: { n: "2", label: "Recordá", icono: "fa-solid fa-clone" },
  practicar: { n: "3", label: "Practicá", icono: "fa-solid fa-pen-to-square" },
  ponerse_a_prueba: { n: "4", label: "Ponete a prueba", icono: "fa-solid fa-stopwatch" },
  mejorar: { n: "5", label: "Mejorá", icono: "fa-solid fa-arrow-trend-up" },
};
