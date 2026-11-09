import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Logo";
import { ArrowRight, ArrowUpRight, DivisionIcon } from "@/components/Icons";
import { ButtonLink, CtaBand, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { divisionImages, divisionPath, divisionSlugs, type DivisionSlug } from "@/content/divisions";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/");
}

const exportLines: DivisionSlug[] = ["coffee", "minerals"];
const importLines: DivisionSlug[] = ["animal-health", "electrical"];

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale);
  const h = t.home;

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950">
        <Photo name="home-hero" priority tone="navy" sizes="(max-aspect-ratio: 16/9) 178vh, 100vw" className="absolute inset-0" imgClassName="hero-zoom" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,22,38,0.55)_0%,rgba(12,22,38,0.15)_35%,rgba(12,22,38,0.85)_85%,#0c1626_100%)]" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,38,0.88)_0%,rgba(12,22,38,0.6)_38%,rgba(12,22,38,0.1)_72%,rgba(12,22,38,0)_100%)]" aria-hidden />

        <div className="container-x relative flex flex-1 flex-col justify-end pt-36 pb-14 md:pb-20">
          <p className="rise eyebrow flex items-center gap-3 text-gold-light">
            <span className="h-px w-10 bg-current opacity-70" aria-hidden />
            {h.hero.eyebrow}
          </p>
          <h1 className="mt-7 max-w-5xl font-display text-[2.9rem] leading-[1.02] tracking-tight text-crema sm:text-6xl md:text-6xl lg:text-[5.4rem] font-bold">
            <span className="rise block" style={{ "--rise-delay": "120ms" } as React.CSSProperties}>
              {h.hero.title}
            </span>
            <span
              className="rise block bg-[linear-gradient(100deg,#f9ecd8_0%,#e4b97c_45%,#bf995a_100%)] bg-clip-text pb-2 text-transparent"
              style={{ "--rise-delay": "240ms" } as React.CSSProperties}
            >
              {h.hero.titleAccent}
            </span>
          </h1>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <p className="rise max-w-xl text-lg leading-relaxed text-crema/75 text-pretty lg:col-span-6" style={{ "--rise-delay": "360ms" } as React.CSSProperties}>
              {h.hero.lead}
            </p>
            <div className="rise flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" style={{ "--rise-delay": "480ms" } as React.CSSProperties}>
              <ButtonLink href={href(locale, "/divisions")}>{h.hero.ctaPrimary}</ButtonLink>
              <ButtonLink href={href(locale, "/contact")} variant="outline-light">
                {h.hero.ctaSecondary}
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* business-line marquee */}
        <div className="relative border-t border-gold/15 bg-navy-950/60 py-5 backdrop-blur-sm">
          <div className="flex overflow-hidden" aria-hidden>
            <div className="marquee flex shrink-0 items-center gap-10 pr-10 whitespace-nowrap">
              {[0, 1].map((dup) =>
                divisionSlugs.map((slug) => (
                  <span key={`${dup}-${slug}`} className="flex items-center gap-10 text-sm tracking-[0.18em] text-crema/60 uppercase">
                    {t.divisions.items[slug].name}
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── About the company ───────── */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            <Photo name="home-intro" tone="sand" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-sm" />
            <div className="absolute -right-4 -bottom-8 hidden w-44 rounded-sm bg-navy-900 p-6 shadow-2xl md:block lg:-right-10">
              <Mark className="w-full" />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <Eyebrow>{h.intro.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight text-navy-900 text-balance md:text-[3rem] font-bold">{h.intro.title}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {h.intro.body.map((p, i) => (
                <Reveal key={i} delay={160 + i * 80}>
                  <p className="leading-relaxed text-ink/70 text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={320} className="mt-10">
              <TextLink href={href(locale, "/about")}>{t.common.readStory}</TextLink>
            </Reveal>
          </div>
        </div>

        {/* four activity pillars */}
        <div className="container-x mt-24 md:mt-32">
          <ul className="grid border-t border-navy-900/15 sm:grid-cols-2 lg:grid-cols-4">
            {h.intro.pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={i * 90}
                className={`border-navy-900/15 py-10 sm:pr-8 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-gold-dark">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl text-navy-900 md:text-4xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Business lines ───────── */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 md:py-36">
        <div className="container-x relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow={h.divisions.eyebrow} title={h.divisions.title} tone="dark" className="lg:col-span-7" />
            <Reveal delay={200} className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-crema/65 text-pretty">{h.divisions.lead}</p>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {divisionSlugs.map((slug, i) => {
              const d = t.divisions.items[slug];
              return (
                <Reveal as="li" key={slug} delay={(i % 4) * 80}>
                  <Link
                    href={href(locale, divisionPath(slug))}
                    className="group relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-sm ring-1 ring-white/10 ring-inset"
                  >
                    <Photo
                      name={divisionImages[slug].hero}
                      tone={i % 3 === 2 ? "forest" : "navy"}
                      sizes="(max-width: 639px) 380px, 600px"
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,22,38,0.15)_0%,rgba(12,22,38,0.55)_35%,rgba(12,22,38,0.92)_65%,rgba(12,22,38,0.97)_100%)]" aria-hidden />
                    <div className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40" aria-hidden />
                    <div className="relative p-7">
                      <div className="flex items-center justify-between text-gold-light">
                        <DivisionIcon slug={slug} />
                        <span className="text-xs tracking-[0.25em] text-crema/50">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <h3 className="mt-6 font-display text-2xl leading-tight text-crema text-balance font-bold tracking-tight">{d.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-crema/65 text-pretty">{d.short}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
                        {t.common.explore}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
            {/* 8th tile: enquiry */}
            <Reveal as="li" delay={240}>
              <Link
                href={href(locale, "/contact")}
                className="group flex h-full min-h-[24rem] flex-col justify-between rounded-sm bg-gold p-7 text-navy-950 transition-colors duration-500 hover:bg-gold-light"
              >
                <Mark mono className="h-10 w-auto self-start opacity-80" />
                <div>
                  <h3 className="font-display text-2xl leading-tight text-balance font-bold tracking-tight">{h.divisions.ctaTitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-950/70">{h.divisions.ctaBody}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
                    {t.common.enquire}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* ───────── Trade in both directions ───────── */}
      <section className="bg-sand py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={h.trade.eyebrow} title={h.trade.title} />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {[
              { block: h.trade.export, image: "home-export" as const, lines: exportLines },
              { block: h.trade.import, image: "home-import" as const, lines: importLines },
            ].map(({ block, image, lines }, i) => (
              <Reveal key={block.label} delay={i * 120}>
                <article className="h-full overflow-hidden rounded-sm bg-ivory">
                  <Photo name={image} tone={i === 0 ? "navy" : "forest"} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/9]" />
                  <div className="p-8 md:p-10">
                    <p className="eyebrow flex items-center gap-3 text-gold-dark">
                      <span className="h-px w-8 bg-current opacity-70" />
                      {block.label}
                    </p>
                    <p className="mt-5 leading-relaxed text-ink/70 text-pretty">{block.body}</p>
                    <ul className="mt-8 divide-y divide-navy-900/10 border-y border-navy-900/10">
                      {lines.map((slug) => (
                        <li key={slug}>
                          <Link href={href(locale, divisionPath(slug))} className="group flex items-center justify-between gap-4 py-4">
                            <span className="flex items-center gap-4">
                              <DivisionIcon slug={slug} className="h-6 w-6 text-gold-dark" />
                              <span className="font-display text-xl text-navy-900 transition-colors group-hover:text-gold-dark font-bold tracking-tight">{t.divisions.items[slug].name}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-navy-900/40 transition-all group-hover:translate-x-1 group-hover:text-gold-dark" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Values ───────── */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={h.values.eyebrow} title={h.values.title} />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {h.values.items.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="border-t border-gold/50 pt-8">
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-gold-dark">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl text-navy-900 font-bold tracking-tight">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65 text-pretty">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Global reach ───────── */}
      <section className="grain relative overflow-hidden bg-navy-900 py-24 md:py-36">
        <Photo name="home-reach" tone="navy" sizes="50vw" className="absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#14243d_45%,rgba(20,36,61,0.6)_75%,rgba(20,36,61,0.2)_100%)]" aria-hidden />
        <div className="container-x relative">
          <SectionHeading eyebrow={h.reach.eyebrow} title={h.reach.title} lead={h.reach.lead} tone="dark" />

          <Reveal delay={200} className="mt-16 md:mt-20">
            <div className="relative grid gap-10 md:grid-cols-4 md:gap-0">
              <svg className="absolute top-[11px] left-[6px] hidden h-[2px] w-[calc(75%)] md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden>
                <line x1="0" y1="1" x2="100" y2="1" stroke="#bf995a" strokeWidth="2" className="route-dash" vectorEffect="non-scaling-stroke" />
              </svg>
              {[h.reach.origin, h.reach.hub, h.reach.port].map((node, i) => (
                <div key={node} className="relative flex items-start gap-4 md:block">
                  <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold bg-navy-900">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                  </span>
                  <div className="md:mt-6 md:pr-6">
                    <span className="text-[10px] tracking-[0.25em] text-crema/45">0{i + 1}</span>
                    <p className="mt-1 font-display text-2xl text-crema font-bold tracking-tight">{node}</p>
                  </div>
                </div>
              ))}
              <div className="relative flex items-start gap-4 md:block">
                <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold">
                  <ArrowRight className="h-3.5 w-3.5 text-navy-950" />
                </span>
                <div className="md:mt-6">
                  <span className="text-[10px] tracking-[0.25em] text-crema/45 uppercase">{h.reach.marketsLabel}</span>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {h.reach.markets.map((m) => (
                      <li key={m} className="rounded-full border border-gold/40 px-3 py-1 text-xs tracking-wide text-gold-light">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CtaBand image="home-cta" eyebrow={h.cta.eyebrow} title={h.cta.title} body={h.cta.body} button={h.cta.button} href={href(locale, "/contact")} />
    </>
  );
}
