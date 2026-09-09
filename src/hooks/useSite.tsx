import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { view } from "@/state/view";

export type Phase = "intro" | "entering" | "site";

type Site = {
  phase: Phase;
  /** El usuario pulsó Entrar: la cámara atraviesa la esfera. */
  enter: () => void;
  /** La cámara terminó de atravesar: se enseña el sitio. */
  finish: () => void;
  /** Equipo modesto o pantalla chica: 3D más barato. */
  low: boolean;
  /** prefers-reduced-motion: sin intro y sin movimiento. */
  reduced: boolean;
};

const Ctx = createContext<Site | null>(null);

const safeSession = {
  get: (k: string) => {
    try {
      return sessionStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string) => {
    try {
      sessionStorage.setItem(k, v);
    } catch {
      /* modo privado o almacenamiento bloqueado: da igual */
    }
  },
};

export function SiteProvider({ children }: { children: ReactNode }) {
  const reduced = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const low = useMemo(
    () => window.matchMedia("(max-width: 820px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4,
    [],
  );
  const [phase, setPhase] = useState<Phase>(() =>
    reduced || safeSession.get("ab_intro") === "1" ? "site" : "intro",
  );

  const enter = useCallback(() => {
    setPhase((p) => {
      if (p !== "intro") return p;
      view.enterAt = performance.now();
      safeSession.set("ab_intro", "1");
      return "entering";
    });
  }, []);
  const finish = useCallback(() => setPhase("site"), []);

  const value = useMemo(() => ({ phase, enter, finish, low, reduced }), [phase, enter, finish, low, reduced]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSite fuera de SiteProvider");
  return v;
}
