"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ArrowRight, Globe } from "./Icons";
import { href, localeNames, locales, type Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries";
import { divisionPath, divisionSlugs } from "@/content/divisions";

type Props = {
  locale: Locale;
  nav: Dict["nav"];
  divisionNames: Record<string, string>;
  allDivisions: string;
};

/** Swap the locale segment of the current path, e.g. /en/about/ -> /am/about/ */
function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && (locales as readonly string[]).includes(parts[0])) parts[0] = to;
  else parts.unshift(to);
  return `/${parts.join("/")}/`;
}

function LanguageSwitcher({ locale, pathname, label, onDark = true }: { locale: Locale; pathname: string; label: string; onDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold tracking-wider transition-colors ${onDark ? "text-crema/85 hover:text-gold-light" : "text-navy-900 hover:text-gold-dark"}`}
      >
        <Globe className="h-4 w-4" />
        {localeNames[locale].short}
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-gold/20 bg-navy-950/95 py-1.5 shadow-2xl backdrop-blur-xl">
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <Link
                href={switchLocalePath(pathname, l)}
                lang={l}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${l === locale ? "text-gold-light" : "text-crema/80"}`}
              >
                {localeNames[l].long}
                <span className="text-[10px] tracking-widest text-steel">{localeNames[l].short}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header({ locale, nav, divisionNames, allDivisions }: Props) {
  const rawPath = usePathname() || "/";
  const pathname = rawPath === "/" ? `/${locale}/` : rawPath;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const links = [
    { label: nav.about, path: "/about" },
    { label: nav.divisions, path: "/divisions", dropdown: true },
    { label: nav.contact, path: "/contact" },
  ];

  const isActive = (path: string) => pathname.startsWith(href(locale, path).replace(/\/$/, ""));

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ${
        scrolled || menuOpen ? "border-b border-gold/15 bg-navy-950/85 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-950">
        {nav.skip}
      </a>
      <div className="container-x flex items-center justify-between gap-6">
        <Link href={href(locale)} aria-label={`Mati Trading PLC — ${nav.home}`} className="shrink-0">
          <Logo variant="light" compact={scrolled} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) =>
            l.dropdown ? (
              <div key={l.path} className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
                <Link
                  href={href(locale, l.path)}
                  aria-expanded={dropOpen}
                  onFocus={() => setDropOpen(true)}
                  className={`relative px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${isActive(l.path) ? "text-gold-light" : "text-crema/85 hover:text-gold-light"}`}
                >
                  {l.label}
                </Link>
                <div className={`absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3 transition-all duration-300 ${dropOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-gold/15 bg-navy-950/95 p-3 shadow-2xl backdrop-blur-xl">
                    {divisionSlugs.map((slug, i) => (
                      <Link
                        key={slug}
                        href={href(locale, divisionPath(slug))}
                        onBlur={(e) => {
                          if (!e.currentTarget.parentElement?.parentElement?.contains(e.relatedTarget as Node)) setDropOpen(false);
                        }}
                        className="group flex items-baseline gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                      >
                        <span className="font-[family-name:var(--font-montserrat)] text-[10px] tracking-widest text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-sm text-crema/90 group-hover:text-gold-light">{divisionNames[slug]}</span>
                      </Link>
                    ))}
                    <Link href={href(locale, "/divisions")} className="col-span-2 mt-1 flex items-center justify-between rounded-xl border-t border-white/5 px-3 pt-3 pb-1 text-xs font-semibold tracking-wider text-gold uppercase hover:text-gold-light">
                      {allDivisions}
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.path}
                href={href(locale, l.path)}
                className={`px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${isActive(l.path) ? "text-gold-light" : "text-crema/85 hover:text-gold-light"}`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} pathname={pathname} label={nav.language} />
          <Link
            href={href(locale, "/contact")}
            className="hidden items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-xs font-semibold tracking-wider text-gold-light transition-all hover:bg-gold hover:text-navy-950 md:inline-flex"
          >
            {nav.cta}
          </Link>
          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.close : nav.menu}
          >
            <span className={`absolute left-2 right-2 h-px bg-crema transition-all duration-300 ${menuOpen ? "top-1/2 rotate-45" : "top-[15px]"}`} />
            <span className={`absolute left-2 right-2 h-px bg-crema transition-all duration-300 ${menuOpen ? "top-1/2 -rotate-45" : "top-[24px]"}`} />
          </button>
        </div>
      </div>

    </header>
      {/* Mobile menu */}
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 overflow-y-auto bg-navy-950 pt-20 transition-[opacity,visibility] duration-500 lg:hidden ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <nav className="container-x flex flex-col py-8" aria-label="Mobile">
        {[{ label: nav.home, path: "/" }, ...links].map((l, i) => (
          <Link
            key={l.path}
            href={href(locale, l.path)}
            className="flex items-baseline gap-4 border-b border-white/8 py-5 font-display text-3xl text-crema font-bold tracking-tight"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="font-sans text-[10px] tracking-widest text-gold/70">{String(i + 1).padStart(2, "0")}</span>
            {l.label}
          </Link>
        ))}
        <div className="mt-8 grid gap-1">
          {divisionSlugs.map((slug) => (
            <Link key={slug} href={href(locale, divisionPath(slug))} className="py-2 text-sm text-crema/70 hover:text-gold-light">
              {divisionNames[slug]}
            </Link>
          ))}
        </div>
        <Link href={href(locale, "/contact")} className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-semibold text-navy-950">
          {nav.cta} <ArrowRight />
        </Link>
      </nav>
    </div>
    </>
  );
}
