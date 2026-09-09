import type { Case } from "./types";

/**
 * Los casos de SATIUM. Las cifras salen de los cuadres y bitácoras de cada
 * módulo (docs/<área>/RELEVO.md del backend); si una cifra cambia allá,
 * cambia aquí.
 */
export const cases: Case[] = [
  {
    id: "costos-gastos",
    period: "2026",
    title: {
      es: "Migrar Costos y Gastos de Toyota sin perder un centavo",
      en: "Migrating Toyota's Costs and Travel Expenses without losing a cent",
    },
    context: {
      es: "La planta de Toyota en Baja California llevaba sus costos de manufactura y sus gastos de viaje en SIAREX, un sistema Java/Struts con MySQL y quince años en producción. Había que sustituirlo con los datos vivos y sin que nadie dejara de operar.",
      en: "Toyota's plant in Baja California ran its manufacturing costs and travel expenses on SIAREX, a Java/Struts system on MySQL with fifteen years in production. It had to be replaced with live data and without anyone stopping work.",
    },
    did: [
      {
        es: "Modelé 40 tablas y 65 rutas en FastAPI sobre PostgreSQL y rehíce 24 pantallas y 12 pestañas en React, leyendo el código Java original para conservar cada regla del dinero.",
        en: "I modelled 40 tables and 65 routes in FastAPI on PostgreSQL and rebuilt 24 screens and 12 tabs in React, reading the original Java code to keep every money rule.",
      },
      {
        es: "Escribí los migradores y los cuadré contra el legacy pantalla por pantalla: las cuatro pantallas del dinero coinciden o su diferencia está explicada al centavo.",
        en: "I wrote the migrators and reconciled them against the legacy screen by screen: the four money screens match or their difference is explained to the cent.",
      },
      {
        es: "Reconstruí la plantilla de Excel con sus 9,484 fórmulas y un importador de actuales que corre en menos de cuatro segundos.",
        en: "I rebuilt the Excel template with its 9,484 formulas and an actuals importer that runs in under four seconds.",
      },
    ],
    result: {
      es: "Las dos aplicaciones están en producción con la historia completa. La documentación viva del módulo permitió retomar el trabajo en cada corte sin perder contexto.",
      en: "Both applications are in production with their full history. The module's living documentation made it possible to resume work after every interruption without losing context.",
    },
    metrics: [
      { v: "593,349", l: { es: "filas migradas", en: "rows migrated" } },
      { v: "$42 M", l: { es: "MXN cuadrados", en: "MXN reconciled" } },
      { v: "65", l: { es: "rutas de API", en: "API routes" } },
      { v: "0", l: { es: "diferencias sin explicar", en: "unexplained differences" } },
    ],
    stack: ["FastAPI", "PostgreSQL", "React", "MySQL legacy", "openpyxl"],
  },
  {
    id: "cxp-boveda",
    period: "2026",
    title: {
      es: "Cuentas por pagar y bóveda fiscal a escala",
      en: "Accounts payable and a tax vault at scale",
    },
    context: {
      es: "Cada empresa carga miles de CFDI que hay que validar contra el SAT, convertir a PDF, exportar a Excel y cruzar con la lista negra. Los procesos síncronos se caían con los volúmenes reales.",
      en: "Each company loads thousands of CFDI invoices that must be validated against the SAT, rendered to PDF, exported to Excel and matched against the blacklist. Synchronous processes broke under real volumes.",
    },
    did: [
      {
        es: "Migré 186,592 CFDI con sus PDF desde el sistema anterior y pasé los Excel y las exportaciones a Cloud Run Jobs en paralelo con estado persistido.",
        en: "I migrated 186,592 CFDI with their PDFs from the previous system and moved the Excel exports to parallel Cloud Run Jobs with persisted state.",
      },
      {
        es: "Regeneré 1.46 millones de PDF a la versión 4.1 con un orquestador sobre una máquina virtual de bajo costo.",
        en: "I regenerated 1.46 million PDFs to version 4.1 with an orchestrator on a low-cost virtual machine.",
      },
      {
        es: "Rediseñé la lista negra del SAT: de un snapshot de 5.5 millones de renglones a 635 mil vigencias, con una corrida que sólo toca lo que cambió y se frena sola si el archivo llega corrupto.",
        en: "I redesigned the SAT blacklist: from a 5.5-million-row snapshot to 635 thousand validity periods, with a run that only touches what changed and stops itself if the file arrives corrupted.",
      },
    ],
    result: {
      es: "La exportación bajó de 16 minutos a 87 segundos y la consulta de lista negra de 71 segundos a medio segundo. El lote más grande, 287,041 PDF, salió sin un solo error.",
      en: "Exports dropped from 16 minutes to 87 seconds and blacklist lookups from 71 seconds to half a second. The largest batch, 287,041 PDFs, finished without a single error.",
    },
    metrics: [
      { v: "1.46 M", l: { es: "PDF regenerados", en: "PDFs regenerated" } },
      { v: "16 min → 87 s", l: { es: "exportación", en: "export time" } },
      { v: "71 s → 0.5 s", l: { es: "lista negra", en: "blacklist lookup" } },
      { v: "5.5 M → 635 k", l: { es: "renglones", en: "rows" } },
    ],
    stack: ["FastAPI", "Cloud Run Jobs", "Google Cloud Storage", "Supabase", "openpyxl"],
  },
  {
    id: "facturacion",
    period: "2026",
    title: {
      es: "Facturación electrónica en México, Chile y Perú",
      en: "Electronic invoicing in Mexico, Chile and Peru",
    },
    context: {
      es: "SATIUM necesitaba emitir comprobantes válidos en tres jurisdicciones con reglas, proveedores y formatos distintos, desde la misma plataforma.",
      en: "SATIUM needed to issue valid tax documents in three jurisdictions with different rules, providers and formats, from the same platform.",
    },
    did: [
      {
        es: "México: timbrado de CFDI 4.0 y de nómina con el PAC, facturación por lote desde Excel, cobranza con complementos de pago y recordatorios, facturas recurrentes, contabilidad (DIOT de 54 campos y pólizas) y un asistente con IA que usa herramientas.",
        en: "Mexico: CFDI 4.0 and payroll stamping through the PAC, batch invoicing from Excel, collections with payment complements and reminders, recurring invoices, accounting (54-field DIOT and journal entries) and an AI assistant with tool calling.",
      },
      {
        es: "Chile: documentos tributarios 33, 61, 39 y 41 vía OpenFactura, bóveda del registro de compras y ventas del SII y su tablero.",
        en: "Chile: tax documents 33, 61, 39 and 41 through OpenFactura, a vault for the SII purchase and sales register, and its dashboard.",
      },
      {
        es: "Perú: factura y boleta electrónica, guía de remisión, lote, cobranza, validación con reglas de SUNAT antes de emitir y PDF con código QR.",
        en: "Peru: electronic invoice and receipt, dispatch guide, batch, collections, validation with SUNAT rules before issuing, and PDF with QR code.",
      },
    ],
    result: {
      es: "Las tres facturaciones están en producción. La nómina timbró 26 de 30 recibos de prueba en el sandbox del proveedor a la primera y el QA de Chile pasó sus diez etapas.",
      en: "All three invoicing modules are in production. Payroll stamped 26 of 30 test receipts in the provider's sandbox on the first try, and the Chile QA passed all ten stages.",
    },
    metrics: [
      { v: "3", l: { es: "autoridades fiscales", en: "tax authorities" } },
      { v: "54", l: { es: "campos de la DIOT", en: "DIOT fields" } },
      { v: "10/10", l: { es: "etapas de QA Chile", en: "Chile QA stages" } },
    ],
    stack: ["FastAPI", "WeasyPrint", "PAC CFDI 4.0", "SII", "SUNAT", "OpenAI"],
  },
  {
    id: "rh",
    period: "2026",
    title: {
      es: "Recursos Humanos: la nómina de ley construida desde cero",
      en: "Human Resources: statutory payroll built from scratch",
    },
    context: {
      es: "El módulo del sistema anterior no tenía datos; sólo su código. Lo convertí en la especificación: 918 KB de reglas anotadas con archivo y línea antes de escribir la primera pantalla.",
      en: "The previous system's module had no data, only its code. I turned it into the specification: 918 KB of rules annotated with file and line before writing the first screen.",
    },
    did: [
      {
        es: "54 rutas y 30 pantallas: expediente, semanas y horas con tres versiones (propuesta, confirmada y autorizada), kiosko con terminal por NIP, QR o lector USB, asistencia y reportes.",
        en: "54 routes and 30 screens: employee file, weeks and hours with three versions (proposed, confirmed and authorized), a kiosk with a NIP, QR or USB-reader terminal, attendance and reports.",
      },
      {
        es: "Nómina completa conforme a la ley mexicana: ISR y subsidio, cuotas del IMSS, vacaciones, aguinaldo, PTU, finiquito, ajuste anual, incapacidades, salario base de cotización y archivos para el IDSE y la cédula ICSOE.",
        en: "Full payroll under Mexican law: income tax and subsidy, IMSS contributions, vacations, year-end bonus, profit sharing, severance, annual adjustment, sick leave, contribution base salary and files for IDSE and the ICSOE form.",
      },
      {
        es: "Prefacturas al cliente por las horas colocadas, timbrado de recibos con el módulo de Facturación y manual de usuario en PDF.",
        en: "Client pre-invoices for placed hours, receipt stamping through the Invoicing module, and a PDF user manual.",
      },
    ],
    result: {
      es: "El ciclo completo corrió en producción, del expediente al recibo timbrado en sandbox, con faltas, incapacidad, subsidio y préstamo en el mismo cálculo.",
      en: "The full cycle ran in production, from the employee file to the receipt stamped in the sandbox, with absences, sick leave, subsidy and a loan in the same calculation.",
    },
    metrics: [
      { v: "54", l: { es: "rutas", en: "routes" } },
      { v: "30", l: { es: "pantallas", en: "screens" } },
      { v: "918 KB", l: { es: "de reglas del legacy", en: "of legacy rules" } },
    ],
    stack: ["FastAPI", "React", "Falcon", "WeasyPrint", "PAC"],
  },
  {
    id: "visitas-versatilidad-repse",
    period: "2026",
    title: {
      es: "Visitas, Versatilidad y REPSE: tres apps más fuera del legacy",
      en: "Visits, Versatility and REPSE: three more apps out of the legacy",
    },
    context: {
      es: "SIAREX tiene diez aplicaciones y una docena de clientes. Cada una se evalúa: si hay datos vivos se migra y se cuadra; si no, el sistema viejo es la especificación y se reconstruye.",
      en: "SIAREX has ten applications and a dozen clients. Each one is assessed: if there is live data it gets migrated and reconciled; if not, the old system is the spec and it gets rebuilt.",
    },
    did: [
      {
        es: "Visitas: control de acceso a planta con calendario, pase en PDF con código QR por correo y caseta con cámara y lector USB para entradas y salidas. Especificación, backend de 26 rutas, frontend, despliegue y manual el mismo día.",
        en: "Visits: plant access control with a calendar, a PDF pass with a QR code by email, and a gate screen with camera and USB reader for entries and exits. Spec, a 26-route backend, frontend, deployment and manual on the same day.",
      },
      {
        es: "Versatilidad: la matriz de habilidades de operadores de Toyota, migrada con 1,689 filas y 604 adjuntos, cero rechazos.",
        en: "Versatility: Toyota's operator skills matrix, migrated with 1,689 rows and 604 attachments, zero rejections.",
      },
      {
        es: "REPSE: cumplimiento documental de proveedores conforme a la reforma de subcontratación.",
        en: "REPSE: supplier document compliance under Mexico's outsourcing reform.",
      },
    ],
    result: {
      es: "Cinco aplicaciones del legacy ya viven en SATIUM y cada una deja su estado documentado para la siguiente persona.",
      en: "Five legacy applications now live in SATIUM and each leaves its state documented for the next person.",
    },
    metrics: [
      { v: "1,689", l: { es: "filas, 0 rechazos", en: "rows, 0 rejections" } },
      { v: "26", l: { es: "rutas de Visitas", en: "Visits routes" } },
      { v: "1 día", l: { es: "de spec a producción", en: "from spec to production" } },
    ],
    stack: ["FastAPI", "React", "FullCalendar", "WeasyPrint", "GCS"],
  },
  {
    id: "operacion",
    period: "2026",
    title: {
      es: "Operar la plataforma: multi-tenant, jobs, alertas y documentación que no miente",
      en: "Running the platform: multi-tenant, jobs, alerting and documentation that does not lie",
    },
    context: {
      es: "Una plataforma con una docena de aplicaciones y clientes de varios países no se sostiene con buen código nada más: se sostiene con operación.",
      en: "A platform with a dozen applications and clients in several countries is not held up by good code alone: it is held up by operations.",
    },
    did: [
      {
        es: "Arquitectura multi-empresa con jerarquía de cinco niveles de acceso, FastAPI en Cloud Run y PostgreSQL en Supabase, con el tamaño del pool de conexiones calculado contra el escalado para no tirar producción.",
        en: "Multi-company architecture with a five-level access hierarchy, FastAPI on Cloud Run and PostgreSQL on Supabase, with the connection pool sized against autoscaling so production does not fall over.",
      },
      {
        es: "Trabajo pesado en Cloud Run Jobs, alertas a Slack con deduplicación, notificaciones push, PWA con actualización controlada, respaldos semanales y caché de hosting corregida.",
        en: "Heavy work on Cloud Run Jobs, Slack alerts with deduplication, push notifications, a PWA with controlled updates, weekly backups and fixed hosting caching.",
      },
      {
        es: "Un incidente de 13,165 correos enviados por una prueba se convirtió en una regla del repositorio y en un fixture que lo hace imposible de repetir. Tres verificadores comprueban que la documentación siga siendo cierta: enlaces, cifras y menú contra rutas.",
        en: "An incident of 13,165 emails sent by a test became a repository rule and a fixture that makes it impossible to repeat. Three checkers verify the documentation is still true: links, figures and menu versus routes.",
      },
    ],
    result: {
      es: "Cada módulo tiene su documento de relevo con lo hecho, lo pendiente y lo que no se toca sin el cliente. Alguien nuevo puede desplegar leyendo un solo archivo.",
      en: "Every module has a hand-off document with what is done, what is pending and what is not touched without the client. Someone new can deploy by reading a single file.",
    },
    metrics: [
      { v: "5", l: { es: "niveles de acceso", en: "access levels" } },
      { v: "3", l: { es: "verificadores de docs", en: "docs checkers" } },
      { v: "1", l: { es: "archivo para desplegar", en: "file to deploy" } },
    ],
    stack: ["Cloud Run", "Supabase", "Docker", "Slack", "Firebase Hosting", "Python"],
  },
  {
    id: "cfe-tickets",
    period: "2026",
    title: {
      es: "CFE Alert, soporte y análisis de nómina",
      en: "CFE Alert, support desk and payroll analytics",
    },
    context: {
      es: "Además del núcleo fiscal, la plataforma necesitaba productos de nicho para clientes concretos y herramientas para atenderlos.",
      en: "Beyond the tax core, the platform needed niche products for specific clients and tools to support them.",
    },
    did: [
      {
        es: "CFE Alert vigila los concursos de la Comisión Federal de Electricidad: mapa, gráficas, lista de seguimiento, CRM ligero e historial, con avisos por correo y Slack.",
        en: "CFE Alert watches the tenders of Mexico's federal electricity utility: map, charts, watchlist, a light CRM and history, with email and Slack notices.",
      },
      {
        es: "Un helpdesk propio con control de acceso por nivel y una landing de soporte con formulario.",
        en: "An in-house helpdesk with access control by level and a support landing page with a form.",
      },
      {
        es: "Análisis de nómina sobre los CFDI recibidos: tablero por empresa y ficha por empleado, con correcciones al cálculo del subsidio en 88 mil comprobantes históricos.",
        en: "Payroll analytics over received CFDI: a per-company dashboard and per-employee sheet, with corrections to the subsidy calculation across 88 thousand historical receipts.",
      },
    ],
    result: {
      es: "Tres productos más en producción, cada uno con su documentación y su ruta de operación.",
      en: "Three more products in production, each with its documentation and operating runbook.",
    },
    metrics: [
      { v: "88,435", l: { es: "CFDI corregidos", en: "CFDI corrected" } },
      { v: "3", l: { es: "productos", en: "products" } },
    ],
    stack: ["FastAPI", "React", "Leaflet", "ECharts", "Slack"],
  },
  {
    id: "ia",
    period: "2025 – 2026",
    title: {
      es: "Desarrollo dirigido con agentes de IA",
      en: "Development directed with AI agents",
    },
    context: {
      es: "Todo lo anterior lo construyó un equipo pequeño en meses. La diferencia fue trabajar con agentes de IA como parte del equipo, con un método que los vuelve confiables.",
      en: "Everything above was built by a small team in months. The difference was working with AI agents as part of the team, with a method that makes them trustworthy.",
    },
    did: [
      {
        es: "Cada aplicación arranca con una especificación y un plan por tareas; los agentes ejecutan y yo reviso, cuadro contra la fuente y pruebo en el navegador con la sesión real.",
        en: "Every application starts with a spec and a task plan; the agents execute and I review, reconcile against the source and test in the browser with the real session.",
      },
      {
        es: "Reglas del repositorio que cualquier agente lee primero: multi-tenant, errores, listados, trabajo pesado en jobs, y las trampas que ya costaron una caída.",
        en: "Repository rules that any agent reads first: multi-tenancy, errors, listings, heavy work in jobs, and the traps that already cost an outage.",
      },
      {
        es: "Documentación en el mismo commit que el código, verificadores que la contrastan con la realidad, y manuales de usuario generados desde la aplicación en producción.",
        en: "Documentation in the same commit as the code, checkers that contrast it with reality, and user manuals generated from the application in production.",
      },
    ],
    result: {
      es: "Una plataforma de catorce aplicaciones con el nivel de detalle de un sistema con años de vida, en un año de trabajo.",
      en: "A platform of fourteen applications with the level of detail of a system with years of life, in one year of work.",
    },
    metrics: [
      { v: "14", l: { es: "aplicaciones", en: "applications" } },
      { v: "1", l: { es: "año", en: "year" } },
    ],
    stack: ["Claude Code", "Codex", "OpenAI API", "Playwright", "pytest"],
  },
];
