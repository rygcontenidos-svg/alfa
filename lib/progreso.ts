import { ORDEN_PASOS, type PasoMetodo } from "./tipos";
import { supabase } from "./supabase";

export type EstadoModulo = {
  completados: PasoMetodo[];
  actual: PasoMetodo;
  checks: Record<string, "bien" | "repasar">;
};

export type Progreso = Record<string, EstadoModulo>;

function claveLocal(username?: string | null): string {
  return username ? `oi_progreso_${username}` : "oi_progreso";
}

function leerLocal(username?: string | null): Progreso {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(claveLocal(username));
    return raw ? (JSON.parse(raw) as Progreso) : {};
  } catch {
    return {};
  }
}

function guardarLocal(p: Progreso, username?: string | null) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(claveLocal(username), JSON.stringify(p));
  } catch {
    /* noop */
  }
}

// Sync from Supabase to localStorage
export async function sincronizarDesdeSupabase(username: string) {
  if (typeof window === "undefined") return;

  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return;

  const userId = session.session.user.id;

  const { data: rows } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId);

  if (!rows || rows.length === 0) return;

  const p = leerLocal(username);
  for (const row of rows) {
    p[row.module_id] = {
      completados: (row.completados ?? []) as PasoMetodo[],
      actual: (row.paso_actual ?? "calentamiento") as PasoMetodo,
      checks: (row.checks ?? {}) as Record<string, "bien" | "repasar">,
    };
  }
  guardarLocal(p, username);
}

// Sync from localStorage to Supabase (for a specific module)
async function guardarSupabase(
  moduleId: string,
  estado: EstadoModulo,
  userId: string
) {
  await supabase.from("progress").upsert(
    {
      user_id: userId,
      module_id: moduleId,
      completados: estado.completados,
      paso_actual: estado.actual,
      checks: estado.checks,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id, module_id" }
  );
}

export function estadoInicial(): EstadoModulo {
  return { completados: [], actual: "calentamiento", checks: {} };
}

export function estadoDe(
  moduloId: string,
  username?: string | null
): EstadoModulo {
  return leerLocal(username)[moduloId] ?? estadoInicial();
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

export async function persistirEstado(
  moduloId: string,
  estado: EstadoModulo,
  username?: string | null
) {
  if (!username) return;
  const p = leerLocal(username);
  guardarLocal({ ...p, [moduloId]: estado }, username);

  // Sync to Supabase
  const { data: session } = await supabase.auth.getSession();
  if (session.session) {
    await guardarSupabase(moduloId, estado, session.session.user.id);
  }
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

export async function setCheck(
  moduloId: string,
  ejId: string,
  val: "bien" | "repasar" | null,
  username?: string | null
) {
  const p = leerLocal(username);
  const e = estadoDe(moduloId, username);
  const checks = { ...e.checks };
  if (val === null) delete checks[ejId];
  else checks[ejId] = val;
  const nuevoE = { ...e, checks };
  guardarLocal({ ...p, [moduloId]: nuevoE }, username);

  // Sync to Supabase
  const { data: session } = await supabase.auth.getSession();
  if (session.session) {
    await guardarSupabase(moduloId, nuevoE, session.session.user.id);
  }
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
