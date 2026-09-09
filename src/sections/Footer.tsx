import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="px-5 pb-10 pt-6 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-fog-3">
        <div className="flex items-center gap-3">
          <img src="/img/logo-ab.png" alt="" className="h-5 w-auto opacity-80" />
          <span>{t("footer.rights")}</span>
        </div>
        <span className="font-mono text-[12px]">
          {t("footer.built")} · {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
