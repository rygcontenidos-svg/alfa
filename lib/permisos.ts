import permisosData from "@/data/permisos.json";

let cache: { admins: string[]; sinRespuestas: string[] } = permisosData;

export function esAdmin(usuario: string | null): boolean {
  if (!usuario) return false;
  return cache.admins.includes(usuario);
}

export function puedeVerRespuestas(usuario: string | null): boolean {
  if (!usuario) return false;
  return !cache.sinRespuestas.includes(usuario);
}

export function obtenerPermisos() {
  return { ...cache };
}

export function actualizarPermisos(nuevos: { admins?: string[]; sinRespuestas?: string[] }) {
  if (nuevos.admins) cache.admins = nuevos.admins;
  if (nuevos.sinRespuestas) cache.sinRespuestas = nuevos.sinRespuestas;
}
