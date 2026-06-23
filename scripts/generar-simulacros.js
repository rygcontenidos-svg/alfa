const fs = require("fs");
const path = require("path");

const MODULOS_DIR = path.join(__dirname, "..", "data", "modulos");

function leerModulo(id) {
  const raw = fs.readFileSync(path.join(MODULOS_DIR, id + ".json"), "utf-8");
  return JSON.parse(raw);
}

function extraerEjercicios(modulo, ids) {
  const mapa = {};
  for (const ej of modulo.ejercicios || []) {
    mapa[ej.id] = ej;
  }
  return ids.map((id) => mapa[id]).filter(Boolean);
}

// ------------------------------------------------------------
// Simulacro 2: Clases 1-5
// ------------------------------------------------------------
const clases1a5 = [
  "comunicacion-funciones-lenguaje",
  "tipos-de-textos-literario-no-literario",
  "comprension-generos-literarios",
  "tipo-textual-narrativo-secuencia-narrador-tiempos",
  "revision-narrativo-puntuacion-scz",
];

const ids2 = [];
const explicaciones2 = [];

for (const id of clases1a5) {
  const mod = leerModulo(id);
  const idsPonerse = mod.metodo?.ponerse_a_prueba?.ejercicios_ids || [];
  ids2.push(...idsPonerse);
  const explics = mod.metodo?.mejorar?.explicaciones || [];
  explicaciones2.push(...explics);
}

// Remove duplicate exercise IDs (some classes share exercise objects)
const uniqueIds2 = [...new Set(ids2)];

// Build full ejercicio list
const todosEjs2 = [];
const seenIds2 = new Set();
for (const id of clases1a5) {
  const mod = leerModulo(id);
  for (const ej of mod.ejercicios || []) {
    if (uniqueIds2.includes(ej.id) && !seenIds2.has(ej.id)) {
      todosEjs2.push(ej);
      seenIds2.add(ej.id);
    }
  }
}

// Remove duplicate explicaciones
const seenExpl2 = new Set();
const unicasExpl2 = explicaciones2.filter((e) => {
  const key = e.titulo;
  if (seenExpl2.has(key)) return false;
  seenExpl2.add(key);
  return true;
});

const sim2 = {
  id: "simulacro-2-lengua",
  materia: "lengua",
  titulo: "Simulacro 2: segunda evaluación de Lengua",
  descripcion:
    "Simulacro integrador que abarca: comunicación y funciones del lenguaje, tipos de textos, géneros literarios, tipo textual narrativo (secuencia, narrador, tiempos verbales), revisión de puntuación y normativa S/C/Z.",
  tipo: "simulacro",
  duracion_min: 90,
  textos_ids: ["el-leon-y-la-liebre"],
  estado: "completo",
  ejercicios: todosEjs2,
  metodo: {
    mejorar: {
      explicaciones: unicasExpl2,
    },
  },
};

// ------------------------------------------------------------
// Simulacro 3: Clases 6-9 (mito, leyenda, cuento realista, novela)
// ------------------------------------------------------------
const clases6a9 = [
  "mito-cohesion-elipsis-tildacion",
  "leyenda-parafasis-tildacion-especial",
  "cuento-realista-coherencia-sinonimia-uso-b",
  "novela-avisale-a-mi-mama",
];

const ids3 = [];
const explicaciones3 = [];

for (const id of clases6a9) {
  const mod = leerModulo(id);
  const idsPonerse = mod.metodo?.ponerse_a_prueba?.ejercicios_ids || [];
  ids3.push(...idsPonerse);
  const explics = mod.metodo?.mejorar?.explicaciones || [];
  explicaciones3.push(...explics);
}

const uniqueIds3 = [...new Set(ids3)];

const todosEjs3 = [];
const seenIds3 = new Set();
for (const id of clases6a9) {
  const mod = leerModulo(id);
  for (const ej of mod.ejercicios || []) {
    if (uniqueIds3.includes(ej.id) && !seenIds3.has(ej.id)) {
      todosEjs3.push(ej);
      seenIds3.add(ej.id);
    }
  }
}

const seenExpl3 = new Set();
const unicasExpl3 = explicaciones3.filter((e) => {
  const key = e.titulo;
  if (seenExpl3.has(key)) return false;
  seenExpl3.add(key);
  return true;
});

const sim3 = {
  id: "simulacro-3-lengua",
  materia: "lengua",
  titulo: "Simulacro 3: tercera evaluación de Lengua",
  descripcion:
    "Simulacro integrador que abarca: mito, cohesión (elipsis), leyenda, paráfrasis, cuento realista, coherencia, sinonimia, uso de B, la novela y memoria colectiva. Incluye lectura de 'La casa del árbol' y 'Avisale a mi mamá'.",
  tipo: "simulacro",
  duracion_min: 90,
  textos_ids: ["la-casa-del-arbol", "avisale-a-mi-mama"],
  estado: "completo",
  ejercicios: todosEjs3,
  metodo: {
    mejorar: {
      explicaciones: unicasExpl3,
    },
  },
};

// Write files
fs.writeFileSync(
  path.join(MODULOS_DIR, "simulacro-2-lengua.json"),
  JSON.stringify(sim2, null, 2),
  "utf-8"
);
fs.writeFileSync(
  path.join(MODULOS_DIR, "simulacro-3-lengua.json"),
  JSON.stringify(sim3, null, 2),
  "utf-8"
);

console.log("Simulacro 2: " + todosEjs2.length + " ejercicios, " + unicasExpl2.length + " explicaciones");
console.log("Simulacro 3: " + todosEjs3.length + " ejercicios, " + unicasExpl3.length + " explicaciones");
console.log("Done.");
