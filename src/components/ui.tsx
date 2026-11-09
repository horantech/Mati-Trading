import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import type { ImageKey } from "@/content/images";

type Tone = "dark" | "light";

export function Eyebrow({ children, tone = "light", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-gold-light" : "text-gold-dark"} ${className}`}>
      <span className="h-px w-8 bg-current opacity-70" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow tone={tone} className={center ? "justify-center" : ""}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className={`mt-5 font-display text-4xl leading-[1.08] tracking-tight text-balance md:text-5xl lg:text-[3rem] ${tone === "dark" ? "text-crema" : "text-navy-900"} font-bold`}>
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p className={`mt-6 text-base leading-relaxed text-pretty md:text-lg ${tone === "dark" ? "text-crema/70" : "text-ink/70"}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "outline-light" | "outline-dark" | "navy";
  className?: string;
}) {
  const styles = {
    gold: "bg-gold text-navy-950 hover:bg-gold-light",
    navy: "bg-navy-900 text-crema hover:bg-navy-800",
    "outline-light": "border border-crema/40 text-crema hover:border-gold-light hover:text-gold-light",
    "outline-dark": "border border-navy-900/30 text-navy-900 hover:border-gold-dark hover:text-gold-dark",
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${styles} ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function TextLink({ href, children, tone = "light" }: { href: string; children: ReactNode; tone?: Tone }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold tracking-wide ${tone === "dark" ? "text-gold-light" : "text-gold-dark"}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/** Inner-page hero with a full-bleed image. */
export function PageHero({
  image,
  eyebrow,
  title,
  lead,
  children,
  tone = "navy",
}: {
  image: ImageKey;
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  tone?: "navy" | "espresso";
}) {
  const overlay =
    tone === "espresso"
      ? "bg-[linear-gradient(180deg,rgba(36,18,6,0.55)_0%,rgba(36,18,6,0.35)_40%,rgba(36,18,6,0.92)_100%)]"
      : "bg-[linear-gradient(180deg,rgba(12,22,38,0.6)_0%,rgba(12,22,38,0.3)_40%,rgba(12,22,38,0.92)_100%)]";
  return (
    <section className={`grain relative flex min-h-[78svh] items-end overflow-hidden ${tone === "espresso" ? "bg-espresso" : "bg-navy-950"}`}>
      <Photo name={image} priority tone={tone} className="absolute inset-0" imgClassName="hero-zoom" />
      <div className={`absolute inset-0 ${overlay}`} aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,38,0.88)_0%,rgba(12,22,38,0.6)_38%,rgba(12,22,38,0.1)_72%,rgba(12,22,38,0)_100%)]" aria-hidden />
      <div className="container-x relative pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl">
          <p className="rise eyebrow flex items-center gap-3 text-gold-light">
            <span className="h-px w-8 bg-current opacity-70" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="rise mt-6 font-display text-5xl leading-[1.04] tracking-tight text-crema text-balance md:text-6xl font-bold" style={{ "--rise-delay": "120ms" } as React.CSSProperties}>
            {title}
          </h1>
          {lead && (
            <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-crema/75 text-pretty" style={{ "--rise-delay": "240ms" } as React.CSSProperties}>
              {lead}
            </p>
          )}
          {children && (
            <div className="rise mt-10" style={{ "--rise-delay": "360ms" } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Full-width call-to-action band with background image. */
export function CtaBand({
  image,
  eyebrow,
  title,
  body,
  button,
  href,
}: {
  image: ImageKey;
  eyebrow?: string;
  title: string;
  body: string;
  button: string;
  href: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-navy-950">
      <Photo name={image} className="absolute inset-0" tone="navy" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,38,0.95)_0%,rgba(12,22,38,0.8)_50%,rgba(12,22,38,0.45)_100%)]" aria-hidden />
      <div className="container-x relative py-28 md:py-36">
        <div className="max-w-2xl">
          {eyebrow && (
            <Reveal>
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl leading-[1.08] text-crema text-balance md:text-6xl font-bold tracking-tight">{title}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-crema/70 text-pretty">{body}</p>
          </Reveal>
          <Reveal delay={240} className="mt-10">
            <ButtonLink href={href}>{button}</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
