import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useSite } from "@/hooks/useSite";

/**
 * La capa de entrada. La esfera vive en el lienzo 3D; aquí sólo van el
 * nombre, el botón y las formas de entrar: clic, Enter, rueda o toque.
 */
export function Intro() {
  const { t } = useTranslation();
  const { enter } = useSite();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        enter();
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 8) enter();
    };
    const onTouch = () => enter();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [enter]);

  return (
    <motion.div
      className="fixed inset-0 z-30 flex flex-col items-center justify-between px-6 py-8 md:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
      transition={{ duration: 1.2 }}
      onClick={enter}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-display text-[15px] font-semibold tracking-tight">{t("intro.name")}</span>
        <span className="chip">{t("intro.tag")}</span>
      </div>

      <div className="flex flex-col items-center gap-4 pb-4">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            enter();
          }}
          className="pill pill-primary text-base !px-6 !py-3"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          autoFocus
        >
          {t("intro.enter")}
          <ArrowRight size={18} aria-hidden />
        </motion.button>
        <motion.span
          className="font-mono text-[12px] text-fog-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          {t("intro.hint")}
        </motion.span>
      </div>
    </motion.div>
  );
}
