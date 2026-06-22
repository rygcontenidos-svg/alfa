# Objetivo Ingreso — Especificación de Producto (v1)
### Módulo inicial: Lengua — Preparación CNBA / ingreso UBA (CIEEM)

> Este documento es la especificación de arranque para que la IA local (terminal) empiece a armar la arquitectura del proyecto. Está basado en 3 simulacros reales del Instituto Noesis / CIEEM-UBA, analizados para extraer la taxonomía real de ejercicios que el producto debe poder renderizar.

---

## 1. Concepto del producto

**Nombre:** Objetivo Ingreso
**Isotipo:** 🎯 (diana — concepto de meta, no de libro/lápiz/birrete)
**Propuesta de valor:** No es un banco de ejercicios. Es **un método de estudio** con 5 pasos fijos, repetible para cualquier materia (arranca en Lengua, escala a Matemática, Historia, etc).

**Eslogan principal:** *"Entrená hoy. Llegá preparado."*
**Eslogan alternativo:** *"La práctica hace la diferencia."*

### El Método Objetivo (5 pasos, siempre en este orden)

| # | Paso | Qué hace el alumno | Estado |
|---|------|---------------------|--------|
| ① | **Entendé** | Lee/escucha un resumen del texto o tema. Preguntas simples de recuperación inicial. | Desbloqueado siempre |
| ② | **Recordá** | Flashcards (pregunta/respuesta) sobre el contenido. | Se desbloquea al completar ① |
| ③ | **Practicá** | Ejercicios tipo V/F, multiple choice, completar, relacionar. | Se desbloquea al completar ② |
| ④ | **Ponete a prueba** | Simulacro completo, cronometrado, formato real de examen. | Se desbloquea al completar ③ |
| ⑤ | **Mejorá** | Corrección con explicaciones, errores frecuentes, repaso personalizado de lo que falló. | Se desbloquea al terminar ④ |

Filosofía pedagógica de base: **retrieval practice + repetición espaciada** (recuperar antes de repasar, no solo releer).

UX clave: un botón único arriba **"▶ Continuar mi estudio"** que decide automáticamente el siguiente paso del alumno (no hay que elegir qué hacer).

---

## 2. Identidad visual

- **Colores:** azul profundo (confianza) como primario, verde para indicar progreso/completado, blanco predominante de fondo, amarillo solo para logros/avances puntuales (no decorativo).
- **Tono:** app moderna tipo Duolingo/Khan Academy pero **más sobria** — el público no son solo chicos, también las madres/padres que acompañan el estudio.
- **Tipografía:** sans-serif legible, sin estética infantil (nada de fuentes "redonditas" tipo cartoon).
- **Gamificación sutil:** barra de progreso por paso (✅ completado / ⏳ en curso / 🔒 bloqueado). No vidas, no monedas, no mascotas.

---

## 3. Taxonomía real de ejercicios — Módulo Lengua

Extraída de 3 simulacros reales (Demeter — mito; Las azucenas del bosque — leyenda; La Cruz del Sur — leyenda; más fragmentos de la novela *Avisale a mi mamá*). Esto define los **componentes de UI/datos** que el sistema tiene que poder renderizar. Cada tipo de ejercicio abajo debe ser un **componente reutilizable** que reciba contenido por JSON, no algo hardcodeado por texto.

### 3.1 Texto base + comprensión lectora
- Bloque de texto largo (mito/leyenda/fragmento de novela) con notas al pie opcionales (ej. nota 1 sobre "Tártaro", nota sobre "pecarí/saíno").
- Sirve como ancla para todos los ejercicios siguientes de esa unidad.

**Schema sugerido:**
```json
{
  "texto_id": "demeter_01",
  "titulo": "Demeter",
  "genero": "mito",
  "cuerpo": "...",
  "notas_al_pie": [{"marca": 1, "texto": "En la mitología griega, el Tártaro..."}]
}
```

### 3.2 Selección múltiple (marcar con X la opción correcta)
- Una pregunta, 3 opciones de texto largo (no son frases cortas, son párrafos completos a comparar). Solo una correcta.
- Ej: "fundamentá la inclusión del texto en el género mito" con 3 definiciones similares para discriminar matices.

### 3.3 Verdadero/Falso (en tabla, una columna de respuesta)
- Lista de afirmaciones sobre el texto leído (8 a 12 ítems típico), el alumno marca V o F.
- Variante "Correcto/Incorrecto" (C/I) — funcionalmente igual, cambia el label.

### 3.4 Circuito de la comunicación (diagrama interactivo)
- Diagrama con óvalos vacíos: Emisor, Receptor, Mensaje, Canal, Código, Referente (+ a veces Ruido).
- El alumno arrastra/escribe la etiqueta correcta en cada óvalo a partir de una frase del texto.
- Debajo: completar la **función del lenguaje predominante** (referencial, emotiva, apelativa, poética, fática, metalingüística).
- **Importante:** este es el ejercicio que se repite en los 3 simulacros — es central al programa. Necesita un componente de diagrama tipo "drag-to-label" o select por nodo.

### 3.5 Tabla de justificación de tildación (general)
- Columnas: Aguda / Grave / Esdrújula / Monosílabo / Hiato.
- Filas: "Palabra con tilde" + justificación / "Palabra sin tilde" + justificación.
- El alumno ubica cada palabra dada (ej: pedir, reconoció, morirían, si, príncipe) en la columna correcta y escribe por qué.

### 3.6 Tildación diacrítica
- Tabla: Palabra | Clase de palabra | Ejemplo (tomado del texto).
- Casos típicos: "el/él" (artículo vs pronombre), "mas/más" (conjunción vs adverbio).

### 3.7 Tabla de tildación por sílabas
- Columnas: separación en sílabas (marcando antepenúltima/penúltima/última), clase de palabra según acentuación, "lleva tilde porque…" / "no lleva tilde porque…".
- Palabras de ejemplo sacadas del texto (ej: necios, castigar, cuerpo, éxito, saltó, lejos, jamás, cazador).

### 3.8 Normativa gráfica — completar grafemas
- Texto con huecos tipo `co__ijaba`, `__arrio`, `bul_(b/v)o` — el alumno elige entre opciones dadas entre paréntesis (b/v, s/c/z, g/j).
- Variante: tabla de "Norma V/F + ejemplo correcto" (reglas de ortografía con casos a verificar y completar con ejemplo propio).
- Variante: "escribí la regla de uso de c/s/z (o b/v) para estas palabras extraídas del texto".

### 3.9 Tiempos verbales (relacionar con flecha / completar cuadro)
- Tabla: Ejemplo (verbo conjugado) | Tiempo verbal | Flecha → Uso correspondiente.
- Tiempos vistos: Pretérito Perfecto Simple, Pretérito Imperfecto, Pretérito Pluscuamperfecto, Condicional Simple.
- Usos a relacionar: acciones principales puntuales terminadas / descripciones y acciones habituales / acciones anteriores a otra acción pasada / acciones futuras en el pasado.
- UI: tipo "unir con flechas" (matching de dos columnas).

### 3.10 Paráfrasis, sinónimos y elisión
- "¿A quién hace referencia la frase X?" (paráfrasis → personaje).
- "¿Qué palabra es sinónima de Y?".
- "¿Cuál es la palabra elidida en el siguiente fragmento?" (omisión gramatical).

### 3.11 Marco narrativo
- Tabla simple de 3 columnas: Personajes | Lugar | Tiempo — el alumno completa a partir del texto leído.

### 3.12 Tipo de narrador
- 3 casillas: Narrador Protagonista / Narrador Testigo / Narrador Omnisciente — marcar X + justificar con cita del texto.

### 3.13 Tipo textual narrativo (características → ejemplos)
- Tabla: característica (ej. "uso de tiempos verbales del pasado", "presencia de un narrador", "secuencia temporal y núcleos narrativos") → el alumno completa con un ejemplo extraído del texto.

### 3.14 Núcleos narrativos — ordenar secuencia temporal
- Lista de eventos del relato, desordenados. El alumno numera del 1 al N según el orden real en la historia.
- UI: componente de **ordenamiento drag-and-drop** (no es V/F ni multiple choice).

### 3.15 Coherencia y cohesión
- Fragmentos con partes destacadas/subrayadas (pronombres, repeticiones, conectores). El alumno identifica el **recurso cohesivo** (sustitución pronominal, repetición, elipsis, conector, etc).

### 3.16 Reescritura normativa (multiple choice de párrafo completo)
- Se da un mismo párrafo en 3 versiones, con errores de tildación/ortografía distribuidos distinto en cada una. El alumno marca la versión 100% correcta. Ejercicio de alta dificultad — bueno para el paso ④ (Ponete a prueba).

---

## 4. Estructura de contenido sugerida (por unidad)

Cada "unidad" de Lengua = 1 texto (mito, leyenda o fragmento de novela) + su batería de ejercicios. Sugerencia de modelo de datos:

```json
{
  "unidad_id": "leyenda_cruz_del_sur",
  "materia": "lengua",
  "genero_texto": "leyenda",
  "texto": { "...": "ver 3.1" },
  "ejercicios": [
    { "tipo": "circuito_comunicacion", "data": {...} },
    { "tipo": "verdadero_falso", "data": {...} },
    { "tipo": "ordenar_secuencia", "data": {...} },
    { "tipo": "tildacion_general", "data": {...} },
    { "tipo": "normativa_grafica", "data": {...} }
  ],
  "metodo": {
    "entender": { "resumen": "...", "preguntas_simples": [...] },
    "recordar": { "flashcards": [...] },
    "practicar": { "ejercicios_ids": [...] },
    "ponerse_a_prueba": { "simulacro_ref": "..." },
    "mejorar": { "explicaciones": [...] }
  }
}
```

Los 3 documentos analizados ya dan **contenido real cargable** para la primera unidad piloto (Demeter + Cruz del Sur + Las azucenas del bosque + fragmentos de "Avisale a mi mamá").

---

## 5. Especificación visual — Layout + Ads

### 5.1 Estructura general de la página (desktop)

```
┌─────────────────────────────────────────────────────────────┐
│                    AD HEADER (728x90 o 970x90)               │
│                  Top banner, ancho completo                  │
├──────────┬──────────────────────────────────────┬───────────┤
│          │                                      │           │
│  AD      │     🎯 Objetivo Ingreso              │   AD      │
│  LATERAL │                                      │  LATERAL  │
│  IZQ     │     ▶ Continuar mi estudio           │  DER      │
│          │                                      │           │
│ (160x600 │     Lengua                           │ (160x600  │
│  o       │     ① Entendé   ✅                   │  o        │
│  300x600)│     ② Recordá   ⏳                   │  300x600) │
│          │     ③ Practicá  🔒                   │           │
│  sticky/ │     ④ Ponete a prueba 🔒             │  sticky/  │
│  fixed   │     ⑤ Mejorá 🔒                       │  fixed    │
│          │                                      │           │
│          │     [contenido del ejercicio activo] │           │
│          │                                      │           │
└──────────┴──────────────────────────────────────┴───────────┘
```

**Reglas de implementación:**
- Header ad: banner horizontal fijo (no sticky al scroll, va arriba del todo, antes del nombre de marca). Tamaños estándar IAB: `970x90` desktop / `320x50` o `320x100` mobile.
- Ads laterales: tamaño estándar IAB `300x600` (Half Page) en desktop. **Se ocultan completamente en mobile/tablet** (breakpoint < 1100px aprox) para no robar espacio al contenido de estudio — en su lugar, considerar 1 ad nativo intercalado entre pasos del método en mobile.
- Los 3 espacios de ad son slots fijos en el layout (contenedores con `id` reservado), pensados para integrarse después con un proveedor de ads (Google AdSense u otro) — por ahora se deja el contenedor vacío/placeholder.
- El contenido de estudio nunca debe quedar tapado por un ad ni hacer scroll horizontal — los laterales son columnas fijas fuera del área de contenido principal, no overlays.
- Mantener buena densidad de "white space" alrededor de los ejercicios: la lectura de comprensión lectora necesita aire, no hay que comprimir el texto para hacerle lugar a publicidad.

### 5.2 Vista mobile (prioridad — la mayoría va a estudiar desde el celular)
- Sin laterales. Header ad chico arriba (320x50/100).
- Eventual ad nativo cada 2-3 ejercicios completados (no intrusivo, no interrumpe un ejercicio a la mitad).
- Botón "▶ Continuar mi estudio" siempre visible arriba, sticky.

---

## 6. Stack sugerido (a decidir con la IA local, no bloqueante)

- **Frontend:** Next.js (App Router) + Tailwind — facilita SSR/SEO para las páginas de práctica indexables (`/simulacro-lengua-ingreso-nacional-buenos-aires`, etc.) y permite slots de ads fáciles de aislar como componentes.
- **Backend/datos:** empezar simple — contenido de ejercicios como JSON/Markdown versionado en el repo (no hace falta DB todavía con 3 simulacros). Migrar a DB (Postgres/SQLite) cuando haya progreso de usuario que persistir (qué pasos completó, qué flashcards le costaron, etc).
- **Auth:** diferir hasta tener el piloto validado con Nathalie — no es prioridad del MVP.
- **Mobile-first**, siempre.

---

## 7. Roadmap del piloto (Lengua, módulo único)

1. **MVP estático:** cargar el contenido de los 3 textos analizados (Demeter, Las azucenas del bosque, Cruz del Sur + fragmentos de Avisale a mi mamá) con los componentes de ejercicio de la sección 3.
2. Implementar el flujo de 5 pasos con desbloqueo secuencial y el botón "Continuar mi estudio".
3. Layout con los 3 slots de ad como placeholders (sin integración real todavía).
4. Validar con Nathalie 1 semana: ¿prefiere estudiar Lengua acá que con las fotocopias?
5. Recién después: SEO de páginas indexables, métricas, integración real de ads, expansión a otra materia.

---

## 8. Fuentes de contenido ya disponibles para cargar

| Archivo | Contiene |
|---|---|
| Eval BACP — Demeter | Mito completo + 9 consignas: género, tipo textual, tildación, tiempos verbales, paráfrasis/sinónimos, elisión, normativa b/v, circuito de comunicación, V/F sobre 2 obras más (Avisale a mi mamá, cuentos del primer parcial) |
| Tp Final 1 | Fragmento "Avisale a mi mamá" (circuito de comunicación + V/F de 8 ítems) + leyenda "Las azucenas del bosque" completa con 8 actividades (funciones del lenguaje, C/I, marco, narrador, tipo textual, cohesión, tildación diacrítica, tildación por sílabas, normativa gráfica) |
| Lengua Clase 10 — Simulacro 1/2026 | Fragmento "Avisale a mi mamá" (circuito + V/F de 4 ítems) + leyenda "La Cruz del Sur" completa con 7 actividades (C/I, reescritura normativa multiple-choice, ordenar núcleos narrativos, marco, narrador, tipo textual, cohesión, tildación diacrítica, tildación por sílabas, normativa gráfica c/s/z) |

Estos tres dan contenido real suficiente para armar y probar **los 5 pasos del método** en al menos 2 unidades completas (Las azucenas del bosque / La Cruz del Sur) más material de refuerzo (Demeter, fragmentos de Avisale a mi mamá).
