type Variant = "light" | "dark";

/** The Highland Bean "M" mark (extracted from the Mati brand identity, Nov 2026). */
export function Mark({ className = "", mono = false }: { className?: string; mono?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mono ? "/brand/mati-mark-mono.svg" : "/brand/mati-mark-gold.svg"}
      alt=""
      aria-hidden
      width={664}
      height={420}
      className={className}
    />
  );
}

/**
 * Wordmark set to the Sibu corporate type spec:
 * MATI — Montserrat ExtraBold; TRADING PLC — Montserrat SemiBold, 32% tracking, Heritage Gold.
 */
function Wordmark({ variant, size }: { variant: Variant; size: "sm" | "md" | "lg" }) {
  const word = variant === "light" ? "text-white" : "text-navy-900";
  const desc = variant === "light" ? "text-gold" : "text-gold-dark";
  const s = {
    // Sized so TRADING PLC runs the same width as MATI, as in the Sibu lockup.
    sm: { word: "text-[1.85rem]", desc: "text-[0.48rem] mt-[2px]" },
    md: { word: "text-[2.25rem]", desc: "text-[0.585rem] mt-[3px]" },
    lg: { word: "text-[3.6rem]", desc: "text-[0.935rem] mt-1.5" },
  }[size];
  return (
    <span lang="en" className="inline-flex flex-col items-stretch leading-none font-[family-name:var(--font-montserrat)]" aria-hidden>
      <span className={`${s.word} font-extrabold tracking-[0.01em] ${word}`}>MATI</span>
      <span className={`${s.desc} font-semibold tracking-[0.32em] whitespace-nowrap ${desc}`}>TRADING PLC</span>
    </span>
  );
}

/** Horizontal lockup: mark + MATI / TRADING PLC (as on the Sibu signage mock-ups). */
export function Logo({ variant = "light", className = "", compact = false }: { variant?: Variant; className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Mati Trading PLC">
      <Mark className={compact ? "h-8 w-auto" : "h-10 w-auto md:h-11"} />
      <Wordmark variant={variant} size={compact ? "sm" : "md"} />
    </span>
  );
}

/** Stacked lockup: mark above the wordmark (primary logo). */
export function LogoStacked({ variant = "light", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${className}`} aria-label="Mati Trading PLC">
      <Mark className="h-auto w-36 md:w-44" />
      <span className="mt-5">
        <Wordmark variant={variant} size="lg" />
      </span>
    </span>
  );
}
