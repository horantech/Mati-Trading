import type { Metadata } from "next";
import { href, locales, type Locale } from "./i18n";
import { site } from "./site";
import { getDict } from "./dictionaries";

const ogLocale: Record<Locale, string> = { en: "en_US", am: "am_ET", om: "om_ET" };

export function pageMetadata(locale: Locale, path: string, title?: string, description?: string): Metadata {
  const t = getDict(locale);
  const fullTitle = title ? `${title} · Mati Trading PLC` : t.meta.title;
  const desc = description ?? t.meta.description;
  const languages = Object.fromEntries(locales.map((l) => [l, href(l, path)]));
  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description: desc,
    alternates: { canonical: href(locale, path), languages: { ...languages, "x-default": href("en", path) } },
    openGraph: {
      title: fullTitle,
      description: desc,
      siteName: "Mati Trading PLC",
      locale: ogLocale[locale],
      type: "website",
      url: href(locale, path),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
    icons: { icon: "/brand/favicon.svg" },
  };
}
