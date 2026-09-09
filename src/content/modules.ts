import type { L } from "./types";

export type Module = { name: L; note: L; icon: string };

/** Las aplicaciones de SATIUM que he construido o migrado. */
export const modules: Module[] = [
  { icon: "receipt", name: { es: "Cuentas por pagar", en: "Accounts payable" }, note: { es: "Bóveda de CFDI, visor de órdenes, lista negra, descarga del SAT", en: "CFDI vault, purchase orders, blacklist, SAT download" } },
  { icon: "stamp", name: { es: "Facturación México", en: "Invoicing Mexico" }, note: { es: "CFDI 4.0, nómina, lote, cobranza, DIOT", en: "CFDI 4.0, payroll, batch, collections, DIOT" } },
  { icon: "globe", name: { es: "Facturación Chile", en: "Invoicing Chile" }, note: { es: "DTE, bóveda del RCV del SII", en: "DTE, SII purchase and sales vault" } },
  { icon: "globe", name: { es: "Facturación Perú", en: "Invoicing Peru" }, note: { es: "Factura, boleta, guía de remisión, SUNAT", en: "Invoice, receipt, dispatch guide, SUNAT" } },
  { icon: "factory", name: { es: "Costos", en: "Manufacturing costs" }, note: { es: "Presupuesto, actuales, forecast y Cost Report de planta", en: "Budget, actuals, forecast and plant Cost Report" } },
  { icon: "plane", name: { es: "Gastos de viaje", en: "Travel expenses" }, note: { es: "Viajes, comprobación, aprobaciones en cuatro niveles", en: "Trips, expense reports, four-level approvals" } },
  { icon: "users", name: { es: "Recursos Humanos", en: "Human Resources" }, note: { es: "Expediente, horas, kiosko, nómina de ley, IMSS", en: "Employee file, hours, kiosk, statutory payroll, IMSS" } },
  { icon: "calendar", name: { es: "Visitas", en: "Visits" }, note: { es: "Calendario, pase con QR, caseta", en: "Calendar, QR pass, gate" } },
  { icon: "grid", name: { es: "Versatilidad", en: "Versatility" }, note: { es: "Matriz de habilidades de operadores", en: "Operator skills matrix" } },
  { icon: "shield", name: { es: "REPSE", en: "REPSE" }, note: { es: "Cumplimiento documental de proveedores", en: "Supplier document compliance" } },
  { icon: "zap", name: { es: "CFE Alert", en: "CFE Alert" }, note: { es: "Concursos de la CFE, mapa, CRM, avisos", en: "CFE tenders, map, CRM, alerts" } },
  { icon: "lifebuoy", name: { es: "Soporte", en: "Support desk" }, note: { es: "Helpdesk con acceso por nivel", en: "Helpdesk with access by level" } },
  { icon: "chart", name: { es: "Análisis de nómina", en: "Payroll analytics" }, note: { es: "Tablero y ficha por empleado sobre CFDI", en: "Dashboard and per-employee sheet over CFDI" } },
  { icon: "layers", name: { es: "Gestión de plataforma", en: "Platform management" }, note: { es: "Empresas, usuarios, cinco niveles, invitaciones", en: "Companies, users, five levels, invitations" } },
];

export const stack: { group: L; items: string[] }[] = [
  { group: { es: "Backend", en: "Backend" }, items: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Supabase", "Pydantic", "WeasyPrint", "openpyxl"] },
  { group: { es: "Frontend", en: "Frontend" }, items: ["TypeScript", "React", "Vite", "Tailwind", "shadcn/ui", "Three.js", "FullCalendar", "PWA"] },
  { group: { es: "Nube y operación", en: "Cloud and operations" }, items: ["Google Cloud Run", "Cloud Run Jobs", "Cloud Storage", "Firebase", "Docker", "BigQuery", "Slack alerts"] },
  { group: { es: "Fiscal", en: "Tax" }, items: ["CFDI 4.0", "SAT", "PAC", "SII Chile", "SUNAT Perú", "IMSS / IDSE"] },
  { group: { es: "IA", en: "AI" }, items: ["Claude Code", "Codex", "OpenAI API", "tool calling", "Playwright"] },
  { group: { es: "Legado", en: "Legacy" }, items: ["Java", "JavaEE / Struts", "MySQL", "Tomcat"] },
];
