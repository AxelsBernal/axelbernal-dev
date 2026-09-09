import { useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import emailjsClient from "@emailjs/browser";
import { FileDown, Mail, Send } from "lucide-react";
import { currentLang } from "@/i18n";
import { Glass } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/Brand";
import { emailjs, links } from "@/content/projects";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const { t } = useTranslation();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const lang = currentLang();

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.current || status === "sending") return;
    setStatus("sending");
    try {
      await emailjsClient.sendForm(emailjs.serviceId, emailjs.templateId, form.current, { publicKey: emailjs.publicKey });
      form.current.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-[15px] text-fog placeholder:text-fog-3 outline-none transition focus:border-cobalt-2/70 focus:bg-white/9";

  return (
    <Section id="contacto" title={t("contact.title")} lead={t("contact.lead")}>
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <a href={`/cv/Axel-Bernal-CV-${lang}.pdf`} download className="pill pill-primary flex-1 !py-3.5">
                <FileDown size={18} aria-hidden /> {t("contact.cv")}
              </a>
              <a href={`/cv/Axel-Bernal-CV-${lang}.docx`} download className="pill !py-3.5 font-mono text-[12px]" title={t("contact.cv_docx")}>
                DOCX
              </a>
            </div>
            <a href={`mailto:${links.email}`} className="pill justify-between !py-3.5">
              <span className="flex items-center gap-3">
                <Mail size={18} aria-hidden /> {links.email}
              </span>
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="pill !py-3.5">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="pill !py-3.5">
              <GitHubIcon /> GitHub
            </a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer" className="pill !py-3.5">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={links.instagram} target="_blank" rel="noreferrer" className="pill !py-3.5">
              <InstagramIcon /> Instagram
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Glass liquid className="p-5 md:p-7">
            <form ref={form} onSubmit={send} className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="c-name">{t("contact.form.name")}</label>
              <input id="c-name" name="name" required autoComplete="name" placeholder={t("contact.form.name")} className={field} />
              <label className="sr-only" htmlFor="c-email">{t("contact.form.email")}</label>
              <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={t("contact.form.email")} className={field} />
              <label className="sr-only" htmlFor="c-message">{t("contact.form.message")}</label>
              <textarea id="c-message" name="message" required rows={5} placeholder={t("contact.form.message")} className={`${field} resize-y`} />
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button type="submit" className="pill pill-primary" disabled={status === "sending"}>
                  <Send size={16} aria-hidden />
                  {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
                </button>
                <p className="text-[14px] text-fog-2" role="status" aria-live="polite">
                  {status === "ok" && t("contact.form.ok")}
                  {status === "error" && t("contact.form.error")}
                </p>
              </div>
            </form>
          </Glass>
        </Reveal>
      </div>
    </Section>
  );
}
