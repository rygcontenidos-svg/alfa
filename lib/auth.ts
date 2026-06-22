import { supabase } from "./supabase";

export async function registrar(email: string, password: string): Promise<string | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: email.split("@")[0] },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) return "Este email ya está registrado.";
    return error.message;
  }

  if (!data.user) return "Error al registrar.";

  const username = email.split("@")[0];

  // Guardar perfil
  await supabase.from("profiles").insert({ id: data.user.id, username });

  if (data.session) {
    // Email confirmation está deshabilitado = sesión inmediata
    return username;
  }

  // Email confirmation habilitado = hay que verificar
  return "verify";
}

export async function iniciarSesion(email: string, password: string): Promise<string | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login")) return "Email o contraseña incorrectos.";
    if (error.message.includes("Email not confirmed")) return "Confirmá tu email primero. Revisá tu casilla.";
    return error.message;
  }

  if (!data.user) return "Error al iniciar sesión.";

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", data.user.id)
    .single();

  return profile?.username ?? email;
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
