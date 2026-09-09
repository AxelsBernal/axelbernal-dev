import type { ElementType, FC, PointerEvent, ReactNode } from "react";
import { cx } from "@/lib/scroll";

type Props = {
  as?: ElementType;
  liquid?: boolean;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>;

/** Panel de vidrio: el brillo especular sigue al cursor por variables CSS. */
export function Glass({ as, liquid, className, ...rest }: Props) {
  /* React acepta una etiqueta como cadena; el tipo sólo es para que TS
     admita props sueltas sin resolver la unión de todos los elementos. */
  const Tag = (as ?? "div") as unknown as FC<Record<string, unknown>>;
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };
  return <Tag className={cx("glass", liquid && "liquid", className)} onPointerMove={onPointerMove} {...rest} />;
}
