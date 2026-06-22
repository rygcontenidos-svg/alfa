import { supabase } from "./supabase";

export async function registrar(username: string, password: string): Promise<string | null> {
  const email = `${username}@alfa.local`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) return error?.message ?? "Error al registrar";

  // Guardar el username en la tabla profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: data.user.id, username });

  if (profileError) {
    return profileError.message;
  }

  return null; // éxito
}

export async function iniciarSesion(username: string, password: string): Promise<string | null> {
  const email = `${username}@alfa.local`;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) return error?.message ?? "Credenciales incorrectas";

  // Obtener el username real desde profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", data.user.id)
    .single();

  return profile?.username ?? username; // éxito, devuelve el username
}

export async function cerrarSesion() {
  await supabase.auth.signOut();
}

export async function sesionActual(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", data.session.user.id)
    .single();

  return profile?.username ?? null;
}
