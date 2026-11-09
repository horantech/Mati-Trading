import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { DivisionIcon } from "@/components/Icons";
import { CtaBand, PageHero, TextLink } from "@/components/ui";
import { divisionImages, divisionPath, divisionSlugs } from "@/content/divisions";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata(locale, "/divisions", t.divisions.meta.title, t.divisions.meta.description);
}

export default async function Divisions({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale);
  const d = t.divisions;

  return (
    <>
      <PageHero image="home-reach" eyebrow={d.index.eyebrow} title={d.index.title} lead={d.index.lead} />

      {/* quick index */}
      <nav aria-label={d.index.eyebrow} className="sticky top-[64px] z-30 hidden border-b border-navy-900/10 bg-ivory/90 backdrop-blur-md lg:block">
        <ul className="container-x flex justify-between gap-4 py-4">
          {divisionSlugs.map((slug, i) => (
            <li key={slug}>
              <a href={`#${slug}`} className="flex items-baseline gap-2 text-xs tracking-wide text-ink/60 transition-colors hover:text-gold-dark">
                <span className="text-[10px] text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                {d.items[slug].name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-ivory">
        {divisionSlugs.map((slug, i) => {
          const item = d.items[slug];
          const flip = i % 2 === 1;
          return (
            <section id={slug} key={slug} className="scroll-mt-32 border-b border-navy-900/10 py-20 md:py-28">
              <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <Link href={href(locale, divisionPath(slug))} className="group block overflow-hidden rounded-sm" tabIndex={-1} aria-hidden>
                    <Photo
                      name={divisionImages[slug].hero}
                      tone={i % 3 === 2 ? "forest" : "navy"}
                      sizes="(min-width: 1024px) 66vw, 133vw"
                      className="aspect-[4/3]"
                      imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </Link>
                </Reveal>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <Reveal className="flex items-center gap-4 text-gold-dark">
                    <span className="font-display text-6xl leading-none font-extralight text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                    <DivisionIcon slug={slug} className="h-8 w-8" />
                  </Reveal>
                  <Reveal delay={80}>
                    <h2 className="mt-6 font-display text-3xl leading-tight text-navy-900 text-balance md:text-4xl font-bold tracking-tight">{item.name}</h2>
                  </Reveal>
                  <Reveal delay={140}>
                    <p className="mt-3 font-display text-lg text-gold-dark font-bold tracking-tight">{item.tagline}</p>
                  </Reveal>
                  <Reveal delay={200}>
                    <p className="mt-5 leading-relaxed text-ink/70 text-pretty">{item.short}</p>
                  </Reveal>
                  <Reveal delay={260} className="mt-8">
                    <TextLink href={href(locale, divisionPath(slug))}>{t.common.learnMore}</TextLink>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand image="home-cta" title={d.ctaTitle} body={d.ctaBody} button={t.common.enquire} href={href(locale, "/contact")} />
    </>
  );
}
