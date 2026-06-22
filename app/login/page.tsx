"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [modo, setModo] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Completá ambos campos.");
      return;
    }

    let ok: boolean;
    if (modo === "login") {
      ok = login(username, password);
      if (!ok) setError("Usuario o contraseña incorrectos.");
    } else {
      ok = register(username, password);
      if (!ok) setError("El usuario ya existe. Elegí otro nombre.");
    }

    if (ok) router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🎯</div>
          <h1 className="text-xl font-bold text-grafito">Objetivo Ingreso</h1>
          <p className="text-sm text-gris mt-1">
            {modo === "login"
              ? "Iniciá sesión para guardar tu progreso"
              : "Creá una cuenta para empezar"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-borde bg-white p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-grafito mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-borde px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-azul/30 focus:border-azul"
              placeholder="Tu nombre de usuario"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grafito mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-borde px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-azul/30 focus:border-azul"
              placeholder="Tu contraseña"
              autoComplete={modo === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <p className="text-sm text-rojo font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-azul text-white font-semibold py-2.5 hover:bg-azul-claro transition-colors"
          >
            {modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </button>

          <p className="text-center text-xs text-gris">
            {modo === "login" ? (
              <>
                ¿No tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => { setModo("register"); setError(""); }}
                  className="text-azul font-medium hover:underline"
                >
                  Registrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => { setModo("login"); setError(""); }}
                  className="text-azul font-medium hover:underline"
                >
                  Iniciá sesión
                </button>
              </>
            )}
          </p>
        </form>

        <p className="text-center mt-4">
          <Link href="/" className="text-xs text-gris hover:text-azul">
            ← Volver al inicio sin iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
