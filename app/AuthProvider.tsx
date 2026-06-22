"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  iniciarSesion as authLogin,
  cerrarSesion as authLogout,
  registrar as authRegister,
  sesionActual,
} from "@/lib/auth";
import { sincronizarDesdeSupabase } from "@/lib/progreso";

type AuthCtx = {
  usuario: string | null;
  cargando: boolean;
  login: (u: string, p: string) => Promise<string | null>;
  register: (u: string, p: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  usuario: null,
  cargando: true,
  login: async () => null,
  register: async () => null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    sesionActual().then((username) => {
      setUsuario(username);
      setCargando(false);
    });
  }, []);

  const login = useCallback(async (u: string, p: string) => {
    const result = await authLogin(u, p);
    if (result && !result.includes("Error") && !result.includes("incorrect")) {
      setUsuario(result);
      await sincronizarDesdeSupabase(result);
      return null;
    }
    return result ?? "Error al iniciar sesión";
  }, []);

  const register = useCallback(async (u: string, p: string) => {
    const error = await authRegister(u, p);
    if (!error) {
      setUsuario(u);
      return null;
    }
    return error;
  }, []);

  const logout = useCallback(async () => {
    await authLogout();
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
