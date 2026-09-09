import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cx } from "@/lib/scroll";

export function Section({
  id,
  title,
  lead,
  children,
  className,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("scroll-mt-24 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-[clamp(2rem,4.2vw,3.1rem)]">{title}</h2>
          {lead && <p className="lead mt-4">{lead}</p>}
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
