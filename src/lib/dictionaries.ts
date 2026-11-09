import en, { type Dict } from "@/content/en";
import am from "@/content/am";
import om from "@/content/om";
import type { Locale } from "./i18n";

const dictionaries: Record<Locale, Dict> = { en, am, om };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}

export type { Dict };
