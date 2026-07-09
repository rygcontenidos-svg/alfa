"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modo, setModo] = useState<"login" | "register" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resetOk, setResetOk] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setModo("reset");
      }
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (modo === "reset") {
      if (!password.trim()) { setError("Ingresá una nueva contraseña."); return; }
      setEnviando(true);
      const { error: err } = await supabase.auth.updateUser({ password });
      setEnviando(false);
      if (err) { setError(err.message); return; }
      setResetOk(true);
      setTimeout(() => router.push("/"), 2000);
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Completá ambos campos.");
      return;
    }

    setEnviando(true);
    const err = modo === "login" ? await login(email, password) : await register(email, password);
    setEnviando(false);

    if (err) {
      setError(err);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F8F9FC" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1
            className="font-bold tracking-wide mb-2"
            style={{ fontFamily: "Etna", fontSize: "48px", color: "#5657FF", lineHeight: 1 }}
          >
            Alfa
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            {modo === "reset"
              ? "Ingresá tu nueva contraseña"
              : modo === "login"
              ? "Iniciá sesión para guardar tu progreso"
              : "Creá una cuenta para empezar"}
          </p>
        </div>

        {resetOk ? (
          <div className="rounded-2xl bg-white p-6 text-center" style={{ border: "1px solid #ECEEF7" }}>
            <p className="text-sm font-semibold text-verde mb-2">¡Contraseña restablecida!</p>
            <p className="text-xs" style={{ color: "#6B7280" }}>Redirigiendo...</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 space-y-4"
            style={{ border: "1px solid #ECEEF7" }}
          >
            {modo !== "reset" && (
              <div>
                <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#16181D" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none transition-colors"
                  style={{ border: "1px solid #ECEEF7", color: "#16181D" }}
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
              </div>
            )}

            <div>
              <label className="block text-[13px] font-medium mb-1.5" style={{ color: "#16181D" }}>
                {modo === "reset" ? "Nueva contraseña" : "Contraseña"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-3.5 py-2.5 text-[15px] outline-none transition-colors"
                style={{ border: "1px solid #ECEEF7", color: "#16181D" }}
                placeholder={modo === "reset" ? "Elegí una nueva contraseña" : "Tu contraseña"}
                autoComplete={modo === "reset" ? "new-password" : modo === "login" ? "current-password" : "new-password"}
              />
            </div>

            {error && (
              <p className="text-[13px] font-medium" style={{ color: "#FF2070" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-xl text-[15px] font-semibold py-3 transition-opacity disabled:opacity-50 hover:opacity-90"
              style={{ backgroundColor: "#5657FF", color: "#FFFFFF" }}
            >
              {enviando ? "Cargando..." : modo === "reset" ? "Guardar contraseña" : modo === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>

            <p className="text-center text-[13px]" style={{ color: "#6B7280" }}>
              {modo === "login" && (
                <button
                  type="button"
                  onClick={async () => {
                    if (!email.trim()) { setError("Poné tu email primero."); return; }
                    setEnviando(true);
                    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/login`,
                    });
                    setEnviando(false);
                    if (err) {
                      setError(err.message);
                    } else {
                      setError("");
                      alert("Te enviamos un link para restablecer la contraseña. Revisá tu casilla.");
                    }
                  }}
                  className="block w-full text-center mb-3 hover:underline"
                  style={{ color: "#5657FF" }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}
              {modo === "reset" ? (
                <button
                  type="button"
                  onClick={() => { setModo("login"); setError(""); }}
                  className="font-semibold hover:underline"
                  style={{ color: "#5657FF" }}
                >
                  ← Volver al inicio de sesión
                </button>
              ) : modo === "login" ? (
                <>
                  ¿No tenés cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => { setModo("register"); setError(""); }}
                    className="font-semibold hover:underline"
                    style={{ color: "#5657FF" }}
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
                    className="font-semibold hover:underline"
                    style={{ color: "#5657FF" }}
                  >
                    Iniciá sesión
                  </button>
                </>
              )}
            </p>
          </form>
        )}

        <p className="text-center mt-6">
          <Link href="/" className="text-[13px] hover:underline" style={{ color: "#6B7280" }}>
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
