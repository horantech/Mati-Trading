import type { MetadataRoute } from "next";
import { href, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { divisionSlugs } from "@/content/divisions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/divisions", "/contact", ...divisionSlugs.map((s) => `/divisions/${s}`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: new URL(href(l, p), site.url).toString(),
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, new URL(href(x, p), site.url).toString()])) },
    })),
  );
}
