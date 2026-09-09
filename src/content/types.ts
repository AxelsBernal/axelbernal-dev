import type { Lang } from "@/i18n";

/** Texto en los dos idiomas del sitio. */
export type L = { es: string; en: string };

export const pick = (l: L, lang: Lang) => l[lang];

export type Metric = { v: string; l: L };

export type Case = {
  id: string;
  period: string;
  title: L;
  context: L;
  did: L[];
  result: L;
  metrics: Metric[];
  stack: string[];
};

export type Project = {
  id: string;
  name: string;
  year: string;
  kind: L;
  summary: L;
  url?: string;
  image?: string;
  logo?: string;
  stack: string[];
  live?: boolean;
};

export type Step = {
  from: string;
  to?: string;
  title: L;
  org: string;
  note: L;
  current?: boolean;
};
