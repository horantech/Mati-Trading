import Link from "next/link";
import { Mark } from "./Logo";
import { href, type Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries";
import { divisionPath, divisionSlugs } from "@/content/divisions";
import { site } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const year = new Date().getFullYear();
  const pages = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.divisions, path: "/divisions" },
    { label: t.nav.contact, path: "/contact" },
  ];
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="grain relative overflow-hidden border-t border-gold/15 bg-navy-950 text-crema">
      {/* oversized watermark mark */}
      <Mark mono className="pointer-events-none absolute -right-24 -bottom-24 w-[46rem] max-w-none text-white opacity-[0.025] invert" />

      <div className="container-x relative pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Mark className="h-14 w-auto" />
            <p lang="en" className="mt-6 inline-flex flex-col leading-none" aria-label="Mati Trading PLC">
              <span className="text-4xl font-extrabold tracking-[0.01em] text-white">MATI</span>
              <span className="mt-1 text-[0.585rem] font-semibold tracking-[0.32em] whitespace-nowrap text-gold">TRADING PLC</span>
            </p>
            <p className="mt-8 max-w-sm font-display text-2xl leading-snug text-crema/90 text-balance font-bold tracking-tight">{t.footer.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow text-gold">{t.footer.explore}</h2>
              <ul className="mt-5 space-y-3">
                {pages.map((p) => (
                  <li key={p.path}>
                    <Link href={href(locale, p.path)} className="text-sm text-crema/70 transition-colors hover:text-gold-light">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-gold">{t.footer.divisions}</h2>
              <ul className="mt-5 space-y-3">
                {divisionSlugs.map((slug) => (
                  <li key={slug}>
                    <Link href={href(locale, divisionPath(slug))} className="text-sm text-crema/70 transition-colors hover:text-gold-light">
                      {t.divisions.items[slug].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-gold">{t.footer.contact}</h2>
              <ul className="mt-5 space-y-3 text-sm text-crema/70">
                <li>{site.contact.address[locale]}</li>
                {site.contact.emails.map((email) => (
                  <li key={email}>
                    <a href={`mailto:${email}`} className="break-all transition-colors hover:text-gold-light">
                      {email}
                    </a>
                  </li>
                ))}
                {site.contact.phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="whitespace-nowrap transition-colors hover:text-gold-light">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
              {socials.length > 0 && (
                <ul className="mt-6 flex gap-4 text-xs tracking-widest text-gold uppercase">
                  {socials.map(([name, url]) => (
                    <li key={name}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="hairline mt-20 opacity-40" />
        <div className="mt-8 flex flex-col gap-3 text-xs text-crema/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Mati Trading PLC. {t.footer.rights}
          </p>
          <p>{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
