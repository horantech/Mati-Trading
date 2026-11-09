import Link from "next/link";
import type { Metadata } from "next";
import { getDict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Award, DivisionIcon } from "@/components/Icons";
import { ButtonLink, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import type { ImageKey } from "@/content/images";
import { divisionPath, divisionSlugs } from "@/content/divisions";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata(locale, "/divisions/coffee", t.coffee.meta.title, t.coffee.meta.description);
}

const offerImages: ImageKey[] = ["coffee-export", "coffee-cupping", "coffee-shipping"];

/** Coffee Export — a richer page than the shared division template, in the corporate palette. */
export default async function CoffeeExport({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale);
  const c = t.coffee;
  const sampleHref = `${href(locale, "/contact")}?division=coffee`;
  const nextSlug = divisionSlugs[1];

  return (
    <>
      <PageHero image="coffee-hero" eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead}>
        <ButtonLink href={sampleHref}>{c.hero.cta}</ButtonLink>
      </PageHero>

      {/* Origin */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal className="text-gold-dark">
              <DivisionIcon slug="coffee" className="h-10 w-10" />
            </Reveal>
            <SectionHeading eyebrow={c.story.eyebrow} title={c.story.title} className="mt-8" />
            <div className="mt-8 space-y-5">
              {c.story.body.map((p, i) => (
                <Reveal key={i} delay={120 + i * 80}>
                  <p className="leading-relaxed text-ink/70 text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300}>
              <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-navy-900/15">
                {c.story.facts.map((f) => (
                  <div key={f.label} className="bg-ivory p-5 md:p-6">
                    <dt className="eyebrow text-gold-dark">{f.label}</dt>
                    <dd className="mt-2 font-display text-xl text-navy-900 md:text-2xl font-bold tracking-tight">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={150} className="relative self-start lg:col-span-5 lg:col-start-8">
            <div className="absolute -right-4 -bottom-4 h-full w-full border border-gold/50 md:-right-6 md:-bottom-6" aria-hidden />
            <Photo name="coffee-origin" tone="forest" sizes="(min-width: 1024px) 40vw, 100vw" className="z-10 aspect-[4/5] rounded-sm" />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 md:py-36">
        <Photo name="coffee-drying-beds" tone="navy" className="absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0c1626_0%,rgba(12,22,38,0.85)_50%,#0c1626_100%)]" aria-hidden />
        <div className="container-x relative">
          <SectionHeading eyebrow={c.process.eyebrow} title={c.process.title} tone="dark" />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-gold/15 sm:grid-cols-2 lg:grid-cols-5">
            {c.process.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="bg-navy-950/90 p-7 backdrop-blur-sm md:p-8">
                <span className="font-display text-4xl font-extralight text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl text-crema font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-crema/60">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Cup profiles */}
      <section className="bg-sand py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={c.profiles.eyebrow} title={c.profiles.title} />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {c.profiles.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <article className={`relative h-full overflow-hidden rounded-sm p-10 md:p-12 ${i === 0 ? "bg-navy-900" : "bg-navy-800"}`}>
                  <h3 className="font-display text-3xl text-crema font-bold tracking-tight">{p.name}</h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-crema/70">{p.body}</p>
                  <ul className="mt-10 flex flex-wrap gap-2">
                    {p.notes.map((n) => (
                      <li key={n} className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold-light">
                        {n}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Recognition */}
          <Reveal delay={200}>
            <div className="mt-6 flex flex-col gap-6 rounded-sm border border-gold/40 bg-ivory p-8 md:flex-row md:items-center md:p-10">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50">
                <Award className="h-8 w-8 text-gold-dark" />
              </span>
              <div>
                <p className="eyebrow text-gold-dark">{c.award.eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl text-navy-900 font-bold tracking-tight">{c.award.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/65">{c.award.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* For buyers */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={c.offer.eyebrow} title={c.offer.title} />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {c.offer.items.map((o, i) => (
              <Reveal key={o.title} delay={i * 100}>
                <Photo name={offerImages[i]} tone={i === 1 ? "forest" : "navy"} sizes="(min-width: 768px) 44vw, 133vw" className="aspect-[4/3] rounded-sm" />
                <h3 className="mt-6 font-display text-2xl text-navy-900 font-bold tracking-tight">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{o.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next business line */}
      <section className="border-t border-navy-900/10 bg-ivory">
        <Link href={href(locale, divisionPath(nextSlug))} className="group container-x flex items-center justify-between gap-6 py-16 md:py-20">
          <div>
            <p className="eyebrow text-gold-dark">{t.common.next}</p>
            <p className="mt-3 font-display text-3xl text-navy-900 transition-colors group-hover:text-gold-dark md:text-5xl font-bold tracking-tight">{t.divisions.items[nextSlug].name}</p>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-navy-900/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold md:h-20 md:w-20">
            <ArrowRight className="h-6 w-6 text-navy-900" />
          </span>
        </Link>
      </section>

      <CtaBand image="coffee-export" eyebrow={t.divisions.items.coffee.name} title={c.cta.title} body={c.cta.body} button={c.cta.button} href={sampleHref} />
    </>
  );
}

