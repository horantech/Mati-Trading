export const locales = ["en", "am", "om"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  am: { short: "አማ", long: "አማርኛ" },
  om: { short: "OM", long: "Afaan Oromoo" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a localised href, e.g. href("am", "/about") -> "/am/about/" */
export function href(locale: Locale, path = "/") {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}
