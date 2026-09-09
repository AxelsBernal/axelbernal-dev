import { useTranslation } from "react-i18next";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function About() {
  const { t } = useTranslation();
  const method = t("about.method", { returnObjects: true }) as Array<{ t: string; d: string }>;

  return (
    <Section id="sobre-mi" title={t("about.title")}>
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <Reveal>
          <Glass className="p-3 md:-rotate-2">
            <div className="photo-frame aspect-[4/5] overflow-hidden rounded-[20px]">
              <img src="/img/axel-graduacion.webp" alt="Axel Bernal el día de su graduación en el Instituto Tecnológico de Tepic" loading="lazy" />
            </div>
            <div className="px-2 pb-1 pt-3 font-mono text-[12px] text-fog-3">Instituto Tecnológico de Tepic · 2026</div>
          </Glass>
        </Reveal>
        <div>
          <Reveal>
            <div className="prose text-[1.05rem] leading-[1.7]">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-10 text-xl">{t("about.method_title")}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {method.map((m) => (
                <Glass key={m.t} className="glass-sm p-5">
                  <p className="font-display text-[17px] font-semibold tracking-tight">{m.t}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-fog-2">{m.d}</p>
                </Glass>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
