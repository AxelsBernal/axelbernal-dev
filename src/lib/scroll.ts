import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  lenis = l;
}

/** Desplaza a una sección por id, con Lenis si está vivo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  /* Lenis ya respeta el scroll-margin-top de la sección; sin offset extra. */
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");
