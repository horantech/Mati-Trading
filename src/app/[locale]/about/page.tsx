import type { Metadata } from "next";
import { getDict } from "@/lib/dictionaries";
import { href, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Logo";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata(locale, "/about", t.about.meta.title, t.about.meta.description);
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale);
  const a = t.about;

  return (
    <>
      <PageHero image="about-hero" eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} />

      {/* Story */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={a.story.eyebrow} title={a.story.title} />
            <div className="mt-10 space-y-6">
              {a.story.body.map((p, i) => (
                <Reveal key={i} delay={120 + i * 80}>
                  <p className={`leading-relaxed text-pretty ${i === 0 ? "font-display text-xl font-semibold tracking-tight text-navy-900 md:text-2xl md:leading-snug" : "text-ink/70"}`}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150} className="relative self-start lg:col-span-5 lg:col-start-8">
            <div className="absolute -bottom-6 -left-6 h-32 w-32 border border-gold/60 md:-left-10" aria-hidden />
            <Photo name="about-story" tone="sand" sizes="(min-width: 1024px) 40vw, 100vw" className="z-10 aspect-[4/5] rounded-sm" />
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 md:py-36">
        <div className="container-x relative">
          <SectionHeading eyebrow={a.timeline.eyebrow} title={a.timeline.title} tone="dark" />
          <div className="relative mt-16 md:mt-24">
          <div className="hairline absolute top-[7px] right-0 left-0 hidden opacity-60 lg:block" aria-hidden />
          <ol className="relative grid gap-0 lg:grid-cols-5">
            {a.timeline.items.map((item, i) => (
              <Reveal as="li" key={item.tag} delay={i * 100} className="relative border-l border-gold/25 pb-12 pl-8 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pr-8">
                <span className={`absolute top-0 -left-[7.5px] h-[15px] w-[15px] rotate-45 border border-gold lg:left-0 ${i === a.timeline.items.length - 1 ? "bg-gold" : "bg-navy-950"}`} aria-hidden />
                <p className="eyebrow text-gold-light lg:mt-10">{item.tag}</p>
                <h3 className="mt-3 font-display text-2xl text-crema font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-crema/60 text-pretty">{item.body}</p>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-sand py-24 md:py-32">
        <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-sm bg-gold/30 md:grid-cols-2">
          {[a.mission, a.vision].map((m, i) => (
            <Reveal key={m.title} delay={i * 120} className="bg-sand p-10 md:p-14">
              <Mark mono className="h-8 w-auto opacity-80" />
              <h2 className="mt-8 font-display text-3xl text-navy-900 font-bold tracking-tight">{m.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/70 text-pretty">{m.body}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={a.values.eyebrow} title={a.values.title} />
          </div>
          <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {a.values.items.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="border-t border-gold/50 pt-7">
                <dt className="flex items-baseline gap-4 font-display text-2xl text-navy-900 font-bold tracking-tight">
                  <span className="text-xs font-semibold tracking-[0.2em] text-gold-dark">0{i + 1}</span>
                  {v.title}
                </dt>
                <dd className="mt-3 leading-relaxed text-ink/65">{v.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-stone py-24 md:py-36">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading eyebrow={a.leadership.eyebrow} title={a.leadership.title} className="lg:col-span-7" />
            <Reveal delay={150} className="lg:col-span-5">
              <p className="leading-relaxed text-ink/65">{a.leadership.lead}</p>
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.leadership.members.map((m, i) => (
              <Reveal as="li" key={i} delay={i * 100}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[radial-gradient(120%_90%_at_30%_10%,#284166,#14243d_55%,#0c1626)]">
                  <Mark className="absolute top-1/2 left-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                </div>
                <h3 className="mt-5 font-display text-xl text-navy-900 font-bold tracking-tight">{m.name}</h3>
                <p className="mt-1 text-sm tracking-wide text-gold-dark">{m.role}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-x py-4">
          <Reveal>
            <Photo name="about-team" tone="navy" className="aspect-[21/9] rounded-sm" />
          </Reveal>
        </div>
        <div className="h-24" />
      </section>

      <CtaBand image="home-cta" eyebrow={t.home.cta.eyebrow} title={t.home.cta.title} body={t.home.cta.body} button={t.home.cta.button} href={href(locale, "/contact")} />
    </>
  );
}

