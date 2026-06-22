import { ORDEN_PASOS, type PasoMetodo } from "./tipos";

export type EstadoModulo = {
  completados: PasoMetodo[];
  actual: PasoMetodo;
  checks: Record<string, "bien" | "repasar">;
};

export type Progreso = Record<string, EstadoModulo>;

function claveBase(username?: string | null): string {
  return username ? `oi_progreso_${username}` : "oi_progreso";
}

function leerTodo(username?: string | null): Progreso {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(claveBase(username));
    return raw ? (JSON.parse(raw) as Progreso) : {};
  } catch {
    return {};
  }
}

function guardarTodo(p: Progreso, username?: string | null) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(claveBase(username), JSON.stringify(p));
  } catch {
    /* noop */
  }
}

export function estadoInicial(): EstadoModulo {
  return { completados: [], actual: "calentamiento", checks: {} };
}

export function estadoDe(
  moduloId: string,
  username?: string | null
): EstadoModulo {
  return leerTodo(username)[moduloId] ?? estadoInicial();
}

export function pasoDesbloqueado(
  estado: EstadoModulo,
  paso: PasoMetodo
): boolean {
  const idx = ORDEN_PASOS.indexOf(paso);
  if (idx === 0) return true;
  const anterior = ORDEN_PASOS[idx - 1];
  return estado.completados.includes(anterior);
}

export function completarPaso(
  estado: EstadoModulo,
  paso: PasoMetodo
): EstadoModulo {
  const completados = Array.from(new Set([...estado.completados, paso]));
  const idxActual = ORDEN_PASOS.indexOf(paso);
  const siguiente = ORDEN_PASOS[idxActual + 1];
  const actual = siguiente ? siguiente : paso;
  return { ...estado, completados, actual };
}

export function persistirEstado(
  moduloId: string,
  estado: EstadoModulo,
  username?: string | null
) {
  const p = leerTodo(username);
  guardarTodo({ ...p, [moduloId]: estado }, username);
}

export function progresoPct(estado: EstadoModulo): number {
  return Math.round((estado.completados.length / ORDEN_PASOS.length) * 100);
}

export function leerCheck(
  moduloId: string,
  ejId: string,
  username?: string | null
): "bien" | "repasar" | null {
  const e = estadoDe(moduloId, username);
  return e.checks[ejId] ?? null;
}

export function setCheck(
  moduloId: string,
  ejId: string,
  val: "bien" | "repasar" | null,
  username?: string | null
) {
  const p = leerTodo(username);
  const e = estadoDe(moduloId, username);
  const checks = { ...e.checks };
  if (val === null) delete checks[ejId];
  else checks[ejId] = val;
  guardarTodo(
    { ...p, [moduloId]: { ...e, checks } },
    username
  );
}

export function listarRepasar(
  moduloId: string,
  username?: string | null
): string[] {
  const e = estadoDe(moduloId, username);
  return Object.entries(e.checks)
    .filter(([, v]) => v === "repasar")
    .map(([k]) => k);
}

export function progresoGeneral(username?: string | null): {
  totalCompletados: number;
  totalPasos: number;
  modulosPorMateria: Record<
    string,
    { id: string; titulo: string; pct: number; completados: string[] }[]
  >;
} {
  const p = leerTodo(username);
  const ids = Object.keys(p);
  let totalCompletados = 0;
  const totalPasos = ids.length * ORDEN_PASOS.length;

  const materias: Record<string, any[]> = {};

  for (const id of ids) {
    const e = p[id];
    const pct = progresoPct(e);
    const sujeto = id.startsWith("mate-")
      ? "matematica"
      : id.startsWith("historia-")
        ? "historia"
        : "lengua";
    if (!materias[sujeto]) materias[sujeto] = [];
    materias[sujeto].push({
      id,
      titulo: id,
      pct,
      completados: e.completados,
    });
    totalCompletados += e.completados.length;
  }

  return { totalCompletados, totalPasos, modulosPorMateria: materias };
}
