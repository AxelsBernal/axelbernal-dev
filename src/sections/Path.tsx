import { useTranslation } from "react-i18next";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { steps } from "@/content/projects";
import { pick } from "@/content/types";
import { currentLang } from "@/i18n";

export function Path() {
  const { t } = useTranslation();
  const lang = currentLang();

  return (
    <Section id="trayectoria" title={t("path.title")}>
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-14">
        <ol className="relative border-l border-white/12 pl-7">
          {steps.map((s, i) => (
            <li key={i} className="relative pb-11 last:pb-0">
              <span
                className={`absolute -left-[35px] top-1.5 h-3 w-3 rounded-full ring-4 ring-ink ${s.current ? "bg-teal" : "bg-fog-3"}`}
                aria-hidden
              />
              <Reveal delay={i * 0.05}>
                <p className="num text-[12.5px] text-fog-3">
                  {s.from}
                  {s.to ? ` — ${s.to}` : s.current ? ` — ${t("path.now")}` : ""}
                </p>
                <h3 className="mt-1 text-[1.25rem]">{pick(s.title, lang)}</h3>
                <p className="text-[14px] text-cobalt-2">{s.org}</p>
                <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-fog-2">{pick(s.note, lang)}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <Glass liquid className="p-3">
            <div className="photo-frame aspect-[4/5] overflow-hidden rounded-[20px]">
              <img src="/img/axel-fronton.webp" alt="Axel Bernal con el uniforme de la selección de Estados Unidos en un frontón" loading="lazy" />
            </div>
            <div className="px-3 pb-3 pt-5">
              <h3 className="text-[1.25rem]">{t("path.sport_title")}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-fog-2">{t("path.sport")}</p>
            </div>
          </Glass>
        </Reveal>
      </div>
    </Section>
  );
}
