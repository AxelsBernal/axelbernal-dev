import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { Glass } from "./Glass";
import { scrollToId, cx } from "@/lib/scroll";
import { currentLang } from "@/i18n";

const ITEMS: Array<[string, string]> = [
  ["sobre-mi", "nav.about"],
  ["casos", "nav.work"],
  ["plataforma", "nav.platform"],
  ["proyectos", "nav.projects"],
  ["trayectoria", "nav.path"],
  ["contacto", "nav.contact"],
];

export function Nav() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lang = currentLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };
  const toggleLang = () => i18n.changeLanguage(lang === "es" ? "en" : "es");

  return (
    <header className="fixed inset-x-0 top-0 z-20 px-4 pt-4 md:px-6">
      <Glass
        as="nav"
        aria-label={t("nav.menu")}
        className={cx(
          "glass-pill mx-auto flex max-w-6xl items-center justify-between gap-3 py-2 pl-3 pr-2 transition-[background] duration-500",
          scrolled && "bg-[rgba(11,16,32,0.35)]",
        )}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 rounded-full px-1" aria-label="Axel Bernal, inicio">
          <img src="/img/logo-ab.png" alt="" className="h-7 w-auto" />
          <span className="hidden whitespace-nowrap font-display text-[15px] font-semibold tracking-tight lg:inline">Axel Bernal</span>
        </button>

        <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {ITEMS.map(([id, key]) => (
            <li key={id}>
              <button onClick={() => go(id)} className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13.5px] font-medium text-fog-2 transition hover:bg-white/10 hover:text-fog lg:px-3.5 lg:text-[14px]">
                {t(key)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button onClick={toggleLang} className="pill !px-3 !py-1.5 text-[13px]" aria-label={t("nav.lang")} title={t("nav.lang")}>
            <Languages size={15} aria-hidden />
            <span className="font-mono">{lang === "es" ? "EN" : "ES"}</span>
          </button>
          <button onClick={() => setOpen((o) => !o)} className="pill !px-2.5 !py-1.5 md:hidden" aria-label={t("nav.menu")} aria-expanded={open}>
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </Glass>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl md:hidden"
          >
            <Glass className="glass-sm p-2">
              <ul className="flex flex-col">
                {ITEMS.map(([id, key]) => (
                  <li key={id}>
                    <button onClick={() => go(id)} className="w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium text-fog-2 hover:bg-white/10 hover:text-fog">
                      {t(key)}
                    </button>
                  </li>
                ))}
              </ul>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
