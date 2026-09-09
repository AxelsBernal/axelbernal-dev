/**
 * Estado mutable que leen los bucles de animación (useFrame, Lenis) sin
 * pasar por React: cambia sesenta veces por segundo y no debe re-renderizar.
 */
export const view = {
  /** Progreso del scroll de la página, 0..1 */
  scroll: 0,
  /** Puntero normalizado, -1..1 (x a la derecha, y hacia arriba) */
  mx: 0,
  my: 0,
  /** Instante (performance.now) en que el usuario pulsó «Entrar» */
  enterAt: 0,
  /** Destello de la aurora al atravesar la esfera, 0..1 */
  boost: 0,
};

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
