export type Usuario = { username: string; password: string };
export type Sesion = { username: string };

const USUARIOS_KEY = "oi_usuarios";
const SESION_KEY = "oi_sesion";

function leerUsuarios(): Usuario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USUARIOS_KEY);
    return raw ? (JSON.parse(raw) as Usuario[]) : [];
  } catch {
    return [];
  }
}

function guardarUsuarios(us: Usuario[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(us));
  } catch {
    /* noop */
  }
}

export function registrar(username: string, password: string): boolean {
  const usuarios = leerUsuarios();
  if (usuarios.some((u) => u.username === username)) return false;
  usuarios.push({ username, password });
  guardarUsuarios(usuarios);
  return true;
}

export function iniciarSesion(username: string, password: string): boolean {
  const usuarios = leerUsuarios();
  const encontrado = usuarios.find(
    (u) => u.username === username && u.password === password
  );
  if (!encontrado) return false;
  try {
    localStorage.setItem(SESION_KEY, JSON.stringify({ username }));
  } catch {
    /* noop */
  }
  return true;
}

export function cerrarSesion() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SESION_KEY);
  } catch {
    /* noop */
  }
}

export function sesionActual(): Sesion | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESION_KEY);
    return raw ? (JSON.parse(raw) as Sesion) : null;
  } catch {
    return null;
  }
}
