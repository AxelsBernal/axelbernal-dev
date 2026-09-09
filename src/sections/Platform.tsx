import { useTranslation } from "react-i18next";
import {
  CalendarCheck,
  ChartColumn,
  Factory,
  Globe,
  Grid3x3,
  Layers,
  LifeBuoy,
  Plane,
  Receipt,
  ShieldCheck,
  Stamp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { modules, stack } from "@/content/modules";
import { pick } from "@/content/types";
import { currentLang } from "@/i18n";

const ICONS: Record<string, LucideIcon> = {
  receipt: Receipt,
  stamp: Stamp,
  globe: Globe,
  factory: Factory,
  plane: Plane,
  users: Users,
  calendar: CalendarCheck,
  grid: Grid3x3,
  shield: ShieldCheck,
  zap: Zap,
  lifebuoy: LifeBuoy,
  chart: ChartColumn,
  layers: Layers,
};

export function Platform() {
  const { t } = useTranslation();
  const lang = currentLang();

  return (
    <Section id="plataforma" title={t("platform.title")} lead={t("platform.lead")}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => {
          const Icon = ICONS[m.icon] ?? Layers;
          return (
            <Reveal key={pick(m.name, "es")} delay={Math.min(i, 5) * 0.04}>
              <Glass className="glass-sm flex h-full gap-4 p-5">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cobalt-2">
                  <Icon size={19} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[16px] font-semibold tracking-tight">{pick(m.name, lang)}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-fog-2">{pick(m.note, lang)}</p>
                </div>
              </Glass>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <h3 className="mt-16 text-xl">{t("platform.stack_title")}</h3>
        <div className="mt-5 flex flex-col gap-3">
          {stack.map((g) => (
            <div key={pick(g.group, "es")} className="grid gap-2 border-t border-white/10 py-4 md:grid-cols-[200px_1fr] md:gap-6">
              <p className="font-mono text-[12.5px] text-fog-3">{pick(g.group, lang)}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
