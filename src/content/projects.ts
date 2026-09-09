import type { Project, Step } from "./types";

export const ownProjects: Project[] = [
  {
    id: "eventleta",
    name: "Eventleta",
    year: "2026",
    kind: { es: "Producto propio · en producción", en: "Own product · in production" },
    summary: {
      es: "Plataforma mexicana de inscripciones a carreras 5K, 10K y 21K. El organizador publica su carrera y cobra en línea con Mercado Pago; el corredor se inscribe sin crear cuenta y recibe su dorsal con QR para recoger el kit. Pensada para teléfonos de gama baja y para que el organizador nunca vuelva al Excel. Carrera piloto: II Festival Running, Tepic, 15 de noviembre de 2026.",
      en: "A Mexican self-service registration platform for 5K, 10K and 21K races. Organizers publish their race and collect payments through Mercado Pago; runners sign up without an account and receive a QR bib to pick up their kit. Built for low-end phones and so the organizer never goes back to Excel. Pilot race: II Festival Running, Tepic, November 15, 2026.",
    },
    url: "https://eventleta.com",
    image: "/img/eventleta.webp",
    logo: "/img/eventleta-logo.png",
    stack: ["React", "FastAPI", "PostgreSQL", "Mercado Pago", "Cloud Run"],
    live: true,
  },
  {
    id: "satium",
    name: "SATIUM",
    year: "2025 – 2026",
    kind: { es: "Plataforma en la que trabajo", en: "The platform I work on" },
    summary: {
      es: "El ERP modular en la nube de Satium Technologies para empresas de México, Chile y Perú: cuentas por pagar, facturación electrónica, costos, gastos, recursos humanos y más. Los casos de arriba son sus módulos.",
      en: "Satium Technologies' modular cloud ERP for companies in Mexico, Chile and Peru: accounts payable, electronic invoicing, costs, expenses, human resources and more. The case studies above are its modules.",
    },
    url: "https://www.satium.com",
    image: "/img/satium.webp",
    stack: ["FastAPI", "React", "Supabase", "Google Cloud"],
    live: true,
  },
];

export const earlyProjects: Project[] = [
  {
    id: "nutriitalia",
    name: "Nutriitalia",
    year: "2023",
    kind: { es: "Sitio web de restaurante", en: "Restaurant website" },
    summary: {
      es: "Sitio de un restaurante italiano con menú y reservaciones.",
      en: "An Italian restaurant site with menu and reservations.",
    },
    image: "/img/nutriitalia.webp",
    stack: ["React", "CSS"],
  },
  {
    id: "mafermusic",
    name: "Mafermusic",
    year: "2023",
    kind: { es: "Sistema web", en: "Web system" },
    summary: {
      es: "Sistema web para una academia de música: alumnos, clases y pagos.",
      en: "Web system for a music academy: students, classes and payments.",
    },
    image: "/img/mafermusic.webp",
    stack: ["React", "Firebase"],
  },
  {
    id: "crazypops",
    name: "Crazy Pops",
    year: "2023",
    kind: { es: "Punto de venta", en: "Point of sale" },
    summary: {
      es: "Punto de venta con catálogo, carrito, caja y reportes para una tienda de botanas.",
      en: "Point of sale with catalogue, cart, till and reports for a snack shop.",
    },
    image: "/img/crazypops.webp",
    stack: ["React", "Node.js"],
  },
  {
    id: "prestamos",
    name: "Préstamos",
    year: "2023",
    kind: { es: "Sistema web", en: "Web system" },
    summary: {
      es: "Control de préstamos personales: clientes, pagos y saldos.",
      en: "Personal loan management: clients, payments and balances.",
    },
    image: "/img/prestamos.webp",
    stack: ["React", "Express"],
  },
  {
    id: "clubdelvalle",
    name: "Club del Valle",
    year: "2023 – 2024",
    kind: { es: "Sistema de gestión", en: "Management system" },
    summary: {
      es: "Gestión de socios de un club deportivo con autenticación y almacenamiento en Firebase y correos automáticos por Mailjet.",
      en: "Member management for a sports club with Firebase auth and storage and automatic emails through Mailjet.",
    },
    stack: ["React", "Firebase", "Mailjet"],
  },
  {
    id: "crudelia",
    name: "La Crudelia Grill",
    year: "2023",
    kind: { es: "Punto de venta", en: "Point of sale" },
    summary: {
      es: "Punto de venta con inventario, ventas y cobro, integrado a Google Sheets para que el dueño lo viera desde el teléfono.",
      en: "Point of sale with inventory, sales and billing, integrated with Google Sheets so the owner could follow it from his phone.",
    },
    stack: ["JavaScript", "Google Sheets"],
  },
  {
    id: "dental",
    name: "Consultorio dental",
    year: "2023",
    kind: { es: "Aplicación de escritorio", en: "Desktop application" },
    summary: {
      es: "Agenda de citas y pacientes para un consultorio, en Java con Swing.",
      en: "Appointment and patient scheduling for a dental office, in Java with Swing.",
    },
    stack: ["Java", "Swing"],
  },
];

export const steps: Step[] = [
  {
    from: "Mar 2026",
    title: { es: "Gerente de Desarrollo Web e IA", en: "Web & AI Development Manager" },
    org: "Satium Technologies",
    note: {
      es: "Dirijo el desarrollo de SATIUM: la API, las aplicaciones, la migración de los clientes desde SIAREX y la operación en producción, con agentes de IA como parte del equipo.",
      en: "I lead SATIUM's development: the API, the applications, the migration of clients from SIAREX and the production operation, with AI agents as part of the team.",
    },
    current: true,
  },
  {
    from: "2026",
    title: { es: "Fundador y desarrollador de Eventleta", en: "Founder and developer of Eventleta" },
    org: "eventleta.com · producto propio",
    note: {
      es: "Plataforma de inscripciones a carreras con pagos en línea y dorsal con QR. En producción con la carrera piloto II Festival Running (Tepic, noviembre de 2026).",
      en: "Race registration platform with online payments and a QR bib. In production with the pilot race II Festival Running (Tepic, November 2026).",
    },
    current: true,
  },
  {
    from: "Sep 2026",
    to: "Dic 2026",
    title: { es: "Máster en Inteligencia Artificial", en: "Master's in Artificial Intelligence" },
    org: "BIG school",
    note: {
      es: "Agentes y modelos de lenguaje, Claude Code y Codex, automatización con n8n y Make. En curso.",
      en: "Agents and language models, Claude Code and Codex, automation with n8n and Make. In progress.",
    },
  },
  {
    from: "Ago 2026",
    title: { es: "Ingeniero en Sistemas Computacionales", en: "B.Eng. in Computer Systems Engineering" },
    org: "Instituto Tecnológico de Tepic",
    note: {
      es: "Especialidad en Desarrollo Web. Estudios de 2020 a 2025; titulación en agosto de 2026.",
      en: "Web Development specialization. Studies from 2020 to 2025; degree awarded in August 2026.",
    },
  },
  {
    from: "Mar 2025",
    to: "Ene 2026",
    title: { es: "Desarrollador full-stack (prácticas)", en: "Full-stack developer (internship)" },
    org: "SIAREX Technology",
    note: {
      es: "Backend empresarial en JavaEE con MySQL sobre el sistema que hoy sustituimos. Ahí aprendí las reglas del negocio que luego migré.",
      en: "Enterprise backend in JavaEE with MySQL on the system we are now replacing. That is where I learned the business rules I later migrated.",
    },
  },
  {
    from: "2023",
    to: "2024",
    title: { es: "Proyectos freelance", en: "Freelance projects" },
    org: "Tepic, Nayarit",
    note: {
      es: "Puntos de venta, sistemas web y una app de escritorio para negocios locales, mientras estudiaba.",
      en: "Points of sale, web systems and a desktop app for local businesses, while studying.",
    },
  },
];

export const links = {
  email: "axsandovalbe@gmail.com",
  linkedin: "https://www.linkedin.com/in/axel-sandoval-bernal-42b3532a6/",
  github: "https://github.com/AxelsBernal",
  instagram: "https://instagram.com/axelbernal0",
  whatsapp: "https://wa.me/523111120517",
};

export const emailjs = {
  serviceId: "service_n920ymd",
  templateId: "template_n2y0t1j",
  publicKey: "luENeV9ei9eFordoN",
};
