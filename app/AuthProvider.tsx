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

type AuthCtx = {
  usuario: string | null;
  cargando: boolean;
  login: (u: string, p: string) => boolean;
  register: (u: string, p: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx>({
  usuario: null,
  cargando: true,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const s = sesionActual();
    if (s) setUsuario(s.username);
    setCargando(false);
  }, []);

  const login = useCallback((u: string, p: string) => {
    const ok = authLogin(u, p);
    if (ok) setUsuario(u);
    return ok;
  }, []);

  const register = useCallback((u: string, p: string) => {
    const ok = authRegister(u, p);
    if (ok) {
      authLogin(u, p);
      setUsuario(u);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    authLogout();
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
