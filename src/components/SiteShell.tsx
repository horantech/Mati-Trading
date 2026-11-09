import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/dictionaries";
import { divisionSlugs } from "@/content/divisions";

/** <html> shell shared by the localised routes and the English root ("/"). */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDict(locale);
  const divisionNames = Object.fromEntries(divisionSlugs.map((s) => [s, t.divisions.items[s].name]));
  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Header locale={locale} nav={t.nav} divisionNames={divisionNames} allDivisions={t.common.allDivisions} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}
