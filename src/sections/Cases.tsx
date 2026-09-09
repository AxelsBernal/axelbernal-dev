import { useTranslation } from "react-i18next";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cases } from "@/content/cases";
import { pick } from "@/content/types";
import { currentLang } from "@/i18n";

export function Cases() {
  const { t } = useTranslation();
  const lang = currentLang();

  return (
    <Section id="casos" title={t("cases.title")} lead={t("cases.lead")}>
      <div className="flex flex-col gap-6 md:gap-8">
        {cases.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i, 2) * 0.05}>
            <Glass as="article" liquid className="p-6 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-[30ch] text-[clamp(1.35rem,2.4vw,1.9rem)]">{pick(c.title, lang)}</h3>
                <span className="chip">{c.period}</span>
              </div>

              <div className="mt-7 grid gap-7 md:grid-cols-3 md:gap-8">
                <div>
                  <p className="font-mono text-[12px] text-fog-3">{t("cases.context")}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fog-2">{pick(c.context, lang)}</p>
                </div>
                <div>
                  <p className="font-mono text-[12px] text-fog-3">{t("cases.did")}</p>
                  <ul className="mt-2 space-y-2.5 pl-4 text-[15px] leading-relaxed text-fog-2 marker:text-cobalt-2 list-disc">
                    {c.did.map((d, j) => (
                      <li key={j}>{pick(d, lang)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[12px] text-fog-3">{t("cases.result")}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fog">{pick(c.result, lang)}</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-9 gap-y-4 border-t border-white/10 pt-6">
                {c.metrics.map((m) => (
                  <div key={m.v}>
                    <div className="num text-[1.35rem] font-medium leading-none md:text-[1.6rem]">{m.v}</div>
                    <div className="mt-1.5 text-[12.5px] text-fog-3">{pick(m.l, lang)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </Glass>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
