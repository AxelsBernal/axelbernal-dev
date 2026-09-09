import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Lenis from "lenis";
import { SiteProvider, useSite } from "@/hooks/useSite";
import { view } from "@/state/view";
import { setLenis } from "@/lib/scroll";
import { Scene } from "@/three/Scene";
import { LiquidFilter } from "@/components/LiquidFilter";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Cases } from "@/sections/Cases";
import { Platform } from "@/sections/Platform";
import { Projects } from "@/sections/Projects";
import { Path } from "@/sections/Path";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

function Shell() {
  const { phase, reduced } = useSite();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("meta.title");
  }, [t, i18n.language]);

  /* el cursor, normalizado, para la cámara y los objetos */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      view.mx = (e.clientX / window.innerWidth - 0.5) * 2;
      view.my = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* sin scroll mientras dura la entrada */
  useEffect(() => {
    document.body.style.overflow = phase === "site" ? "" : "hidden";
    if (phase === "site") window.scrollTo(0, 0);
  }, [phase]);

  /* scroll suave, sólo con el sitio montado y si el sistema no pide quietud */
  useEffect(() => {
    if (phase !== "site") return;
    if (reduced) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        view.scroll = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on("scroll", (l: Lenis) => {
      view.scroll = l.progress;
    });
    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    setLenis(lenis);
    return () => {
      cancelAnimationFrame(id);
      setLenis(null);
      lenis.destroy();
    };
  }, [phase, reduced]);

  return (
    <>
      <LiquidFilter />
      <Scene />
      <AnimatePresence>{phase === "intro" && <Intro key="intro" />}</AnimatePresence>
      {phase === "site" && (
        <motion.div className="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease: "easeOut" }}>
          <Nav />
          <main>
            <Hero />
            <About />
            <Cases />
            <Platform />
            <Projects />
            <Path />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <Shell />
    </SiteProvider>
  );
}
