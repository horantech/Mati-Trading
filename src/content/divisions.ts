import type { ImageKey } from "./images";

/** Business lines, in display order. Text for each lives in the locale dictionaries. */
export const divisionSlugs = [
  "coffee",
  "minerals",
  "animal-health",
  "electrical",
  "agro-industry",
  "construction",
  "consultancy",
] as const;

export type DivisionSlug = (typeof divisionSlugs)[number];

/** Every business line lives under /divisions/<slug>. Coffee has a richer custom page; the rest share a template. */
export function divisionPath(slug: DivisionSlug) {
  return `/divisions/${slug}`;
}

export const divisionImages: Record<DivisionSlug, { hero: ImageKey; detail: ImageKey }> = {
  coffee: { hero: "division-coffee", detail: "coffee-drying-beds" },
  minerals: { hero: "division-minerals", detail: "minerals-detail" },
  "animal-health": { hero: "division-animal-health", detail: "animal-health-detail" },
  electrical: { hero: "division-electrical", detail: "electrical-detail" },
  "agro-industry": { hero: "division-agro-industry", detail: "agro-industry-detail" },
  construction: { hero: "division-construction", detail: "construction-detail" },
  consultancy: { hero: "division-consultancy", detail: "consultancy-detail" },
};
