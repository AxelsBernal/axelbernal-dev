import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { earlyProjects, ownProjects } from "@/content/projects";
import { pick, type Project } from "@/content/types";
import { currentLang } from "@/i18n";

function OwnCard({ p }: { p: Project }) {
  const { t } = useTranslation();
  const lang = currentLang();
  return (
    <Glass as="article" liquid className="flex h-full flex-col p-3 md:p-4">
      {p.image && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ink-2">
          <img src={p.image} alt={`Captura de ${p.name}`} loading="lazy" className="h-full w-full object-cover object-top" />
          {p.logo && (
            <img src={p.logo} alt="" className="absolute left-4 top-4 h-8 w-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
          )}
          {p.live && <span className="chip absolute right-4 top-4 !bg-[rgba(11,16,32,0.6)]">{t("projects.live")}</span>}
        </div>
      )}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 md:px-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-[1.5rem]">{p.name}</h3>
          <span className="font-mono text-[12px] text-fog-3">{p.year}</span>
        </div>
        <p className="mt-1 text-[13.5px] text-cobalt-2">{pick(p.kind, lang)}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-fog-2">{pick(p.summary, lang)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        {p.url && (
          <a href={p.url} target="_blank" rel="noreferrer" className="pill mt-6 self-start">
            {t("projects.visit")} {p.url.replace(/^https?:\/\/(www\.)?/, "")}
            <ArrowUpRight size={16} aria-hidden />
          </a>
        )}
      </div>
    </Glass>
  );
}

function EarlyCard({ p }: { p: Project }) {
  const lang = currentLang();
  return (
    <Glass as="article" className="glass-sm flex h-full flex-col p-3">
      {p.image ? (
        <div className="aspect-[16/9] overflow-hidden rounded-[12px] bg-ink-2">
          <img src={p.image} alt={`Captura de ${p.name}`} loading="lazy" className="h-full w-full object-cover object-top" />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center rounded-[12px] bg-white/5 font-mono text-[12px] text-fog-3">
          {p.year}
        </div>
      )}
      <div className="px-2 pb-1 pt-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[1.05rem]">{p.name}</h3>
          <span className="font-mono text-[11px] text-fog-3">{p.year}</span>
        </div>
        <p className="mt-0.5 text-[12.5px] text-cobalt-2">{pick(p.kind, lang)}</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-fog-2">{pick(p.summary, lang)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="chip !text-[11px]">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Glass>
  );
}

export function Projects() {
  const { t } = useTranslation();
  return (
    <Section id="proyectos" title={t("projects.title")} lead={t("projects.lead")}>
      <div className="grid gap-6 md:grid-cols-2">
        {ownProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <OwnCard p={p} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-16 text-xl">{t("projects.early")}</h3>
      </Reveal>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earlyProjects.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 5) * 0.04}>
            <EarlyCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
