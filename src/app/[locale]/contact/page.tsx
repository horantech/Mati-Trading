import type { Metadata } from "next";
import { getDict } from "@/lib/dictionaries";
import { type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Chat, Clock, Mail, Phone, Pin } from "@/components/Icons";
import { PageHero } from "@/components/ui";
import { divisionSlugs } from "@/content/divisions";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata(locale, "/contact", t.contact.meta.title, t.contact.meta.description);
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale);
  const c = t.contact;
  const divisions = divisionSlugs.map((slug) => ({ slug, name: t.divisions.items[slug].name }));

  const details = [
    { icon: Pin, label: c.details.address, value: site.contact.address[locale] },
    { icon: Mail, label: c.details.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Phone, label: c.details.phone, value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
    ...(site.contact.whatsapp ? [{ icon: Chat, label: c.details.whatsapp, value: `+${site.contact.whatsapp}`, href: `https://wa.me/${site.contact.whatsapp}` }] : []),
    { icon: Clock, label: c.details.hours, value: c.details.hoursValue },
  ];

  return (
    <>
      <PageHero image="contact-hero" eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} />

      <section className="bg-ivory py-20 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl text-navy-900 md:text-4xl font-bold tracking-tight">{c.form.title}</h2>
            <div className="hairline mt-6 mb-10 w-24 opacity-70" style={{ background: "var(--color-gold)" }} />
            <ContactForm t={c.form} divisions={divisions} endpointEmail={site.formEmail} />
          </Reveal>

          <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
            <div className="grain relative overflow-hidden rounded-sm bg-navy-900 p-8 text-crema md:p-10">
              <h2 className="eyebrow text-gold-light">{c.details.title}</h2>
              <ul className="mt-8 space-y-7">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-[11px] tracking-[0.18em] text-crema/50 uppercase">{label}</p>
                      {href ? (
                        <a href={href} className="mt-1 block break-words text-crema transition-colors hover:text-gold-light">
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-crema">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 overflow-hidden rounded-sm border border-navy-900/10">
              <iframe
                title={site.contact.mapQuery}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&z=12&output=embed`}
                className="h-72 w-full grayscale-[0.85] sepia-[0.15] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
