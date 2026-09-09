import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Glass } from "@/components/Glass";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  return (
    <section id="inicio" className="flex min-h-[100svh] items-center pb-16 pt-28 md:pt-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:px-8">
        <div>
          <motion.p
            className="font-mono text-[13px] text-fog-3 md:text-sm"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            {t("hero.role")}
          </motion.p>
          <motion.h1
            className="mt-4 text-[clamp(3.2rem,9vw,6rem)] font-extrabold leading-[0.96]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          >
            Axel
            <br />
            Bernal
          </motion.h1>
          <motion.p
            className="lead mt-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
          >
            {t("hero.thesis")}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
          >
            <button className="pill pill-primary" onClick={() => scrollToId("casos")}>
              {t("hero.cta_work")}
              <ArrowDown size={16} aria-hidden />
            </button>
            <button className="pill" onClick={() => scrollToId("contacto")}>
              <MessageCircle size={16} aria-hidden />
              {t("hero.cta_contact")}
            </button>
          </motion.div>
          <motion.p
            className="num mt-9 text-[12px] text-fog-3 md:text-[13px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {t("hero.facts")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 2.5 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="mx-auto w-full max-w-[420px] md:max-w-none"
        >
          <Glass liquid className="p-3">
            <div className="photo-frame aspect-[4/5] overflow-hidden rounded-[20px]">
              <img src="/img/axel-portada.webp" alt="Axel Bernal en un frontón, junto al banner de la Federación Internacional de Pelota Vasca" fetchPriority="high" />
            </div>
            <div className="flex items-center justify-between px-2 pb-1 pt-3 font-mono text-[12px] text-fog-3">
              <span>Tepic, Nayarit · MX</span>
              <span>Frontenis · Team USA</span>
            </div>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
}
