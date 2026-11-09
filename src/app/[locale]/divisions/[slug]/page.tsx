import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, DivisionIcon } from "@/components/Icons";
import { ButtonLink, CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { divisionImages, divisionPath, divisionSlugs, type DivisionSlug } from "@/content/divisions";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

const templated = divisionSlugs.filter((s) => s !== "coffee");

export const dynamicParams = false;

export function generateStaticParams() {
  return templated.map((slug) => ({ slug }));
}

function isTemplated(slug: string): slug is Exclude<DivisionSlug, "coffee"> {
  return (templated as string[]).includes(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isTemplated(slug)) return {};
  const item = getDict(locale).divisions.items[slug];
  return pageMetadata(locale, `/divisions/${slug}`, item.name, item.short);
}

export default async function DivisionPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isTemplated(slug)) notFound();
  const t = getDict(locale);
  const d = t.divisions;
  const item = d.items[slug];
  const index = divisionSlugs.indexOf(slug);
  const nextSlug = divisionSlugs[(index + 1) % divisionSlugs.length];
  const contactHref = `${href(locale, "/contact")}?division=${slug}`;

  return (
    <>
      <PageHero image={divisionImages[slug].hero} eyebrow={`${t.common.division} ${String(index + 1).padStart(2, "0")}`} title={item.name} lead={item.tagline}>
        <ButtonLink href={contactHref}>{t.common.enquire}</ButtonLink>
      </PageHero>

      {/* Intro */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal className="text-gold-dark">
              <DivisionIcon slug={slug} className="h-10 w-10" />
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 font-display text-xl leading-snug font-medium tracking-tight text-navy-900 text-pretty md:text-[1.6rem] md:leading-[1.4]">{item.intro}</p>
            </Reveal>
          </div>
          <Reveal delay={150} className="relative lg:col-span-5 lg:col-start-8">
            <div className="absolute -right-4 -bottom-4 h-full w-full border border-gold/50 md:-right-6 md:-bottom-6" aria-hidden />
            <Photo name={divisionImages[slug].detail} tone="sand" sizes="(min-width: 1024px) 40vw, 100vw" className="z-10 aspect-[4/5] rounded-sm" />
          </Reveal>
        </div>
      </section>

      {/* Offerings */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 md:py-32">
        <div className="container-x relative">
          <SectionHeading eyebrow={item.name} title={d.offeringsTitle} tone="dark" />
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {item.offerings.map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 100} className="group relative overflow-hidden rounded-sm border border-gold/15 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-gold/40 md:p-10">
                <span className="font-display text-5xl font-extralight text-gold/60 transition-colors duration-500 group-hover:text-gold">0{i + 1}</span>
                <h3 className="mt-8 font-display text-2xl text-crema font-bold tracking-tight">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-crema/60 text-pretty">{o.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Strengths */}
      <section className="bg-sand py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{item.tagline}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-4xl leading-tight text-navy-900 md:text-5xl font-bold tracking-tight">{d.strengthsTitle}</h2>
            </Reveal>
          </div>
          <dl className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {item.strengths.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="border-t border-navy-900/20 pt-6">
                <dt className="font-display text-xl text-navy-900 font-bold tracking-tight">{s.title}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink/65">{s.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Next division */}
      <section className="bg-ivory">
        <Link href={href(locale, divisionPath(nextSlug))} className="group container-x flex items-center justify-between gap-6 py-16 md:py-20">
          <div>
            <p className="eyebrow text-gold-dark">{t.common.next}</p>
            <p className="mt-3 font-display text-3xl text-navy-900 transition-colors group-hover:text-gold-dark md:text-5xl font-bold tracking-tight">{d.items[nextSlug].name}</p>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-navy-900/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold md:h-20 md:w-20">
            <ArrowRight className="h-6 w-6 text-navy-900" />
          </span>
        </Link>
      </section>

      <CtaBand image="home-cta" title={d.ctaTitle} body={d.ctaBody} button={t.common.enquire} href={contactHref} />
    </>
  );
}
