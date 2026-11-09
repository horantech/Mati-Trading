import fs from "node:fs";
import path from "node:path";
import { images, type ImageKey } from "@/content/images";

const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];
const cache = new Map<string, string | null>();

const fileExists = (name: string) => fs.existsSync(path.join(process.cwd(), "public", "images", name));

/** Finds /public/images/<key>.<ext> at build time (optimised .webp preferred). */
function resolveImage(key: string): string | null {
  if (cache.has(key)) return cache.get(key)!;
  const dir = path.join(process.cwd(), "public", "images");
  let found: string | null = null;
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${key}.${ext}`))) {
      found = `/images/${key}.${ext}`;
      break;
    }
  }
  cache.set(key, found);
  return found;
}

type Tone = "navy" | "espresso" | "sand" | "forest";

const toneStyles: Record<Tone, { bg: string; line: string; label: string }> = {
  navy: {
    bg: "radial-gradient(120% 90% at 20% 10%, #284166 0%, #14243d 45%, #0c1626 100%)",
    line: "rgba(191,153,90,0.22)",
    label: "text-gold/70",
  },
  espresso: {
    bg: "radial-gradient(120% 90% at 25% 15%, #7a4b2e 0%, #3a1f0e 45%, #241206 100%)",
    line: "rgba(228,185,124,0.22)",
    label: "text-gold-light/70",
  },
  sand: {
    bg: "radial-gradient(120% 90% at 20% 10%, #f7f2e9 0%, #ede3d1 55%, #d9c9aa 100%)",
    line: "rgba(156,122,64,0.28)",
    label: "text-gold-dark/80",
  },
  forest: {
    bg: "radial-gradient(120% 90% at 20% 10%, #2f6a53 0%, #1e4d3b 50%, #12301f 100%)",
    line: "rgba(228,185,124,0.2)",
    label: "text-gold-light/70",
  },
};

/** Topographic contour lines — a nod to the Guji highlands. */
function Contours({ color }: { color: string }) {
  const rings = Array.from({ length: 9 }, (_, i) => i);
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g fill="none" stroke={color} strokeWidth="0.8">
        {rings.map((i) => (
          <path
            key={`a${i}`}
            d={`M ${-20} ${230 - i * 18} C ${80} ${180 - i * 22}, ${140} ${250 - i * 14}, ${220} ${190 - i * 20} S ${360} ${150 - i * 16}, ${430} ${200 - i * 19}`}
          />
        ))}
        {rings.slice(0, 6).map((i) => (
          <ellipse key={`e${i}`} cx="300" cy="90" rx={18 + i * 16} ry={10 + i * 10} transform="rotate(-12 300 90)" />
        ))}
      </g>
    </svg>
  );
}

export function Photo({
  name,
  className = "",
  imgClassName = "",
  tone = "navy",
  priority = false,
  alt,
  sizes = "100vw",
}: {
  name: ImageKey;
  className?: string;
  imgClassName?: string;
  tone?: Tone;
  priority?: boolean;
  alt?: string;
  /** Rendered width hint for responsive loading, e.g. "(min-width: 1024px) 50vw, 100vw" */
  sizes?: string;
}) {
  const src = resolveImage(name);
  const altText = alt ?? images[name].alt;
  // Don't fight an absolute/fixed position passed in by the caller (full-bleed backgrounds).
  const pos = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";

  if (src) {
    const small = src.endsWith(".webp") && fileExists(`${name}-1200.webp`) ? `/images/${name}-1200.webp` : null;
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={small ? `${small} 1200w, ${src} 2400w` : undefined}
          sizes={small ? sizes : undefined}
          alt={altText}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  const t = toneStyles[tone];
  return (
    <div
      className={`${pos} overflow-hidden ${className}`}
      style={{ background: t.bg }}
      role="img"
      aria-label={altText}
      data-image-slot={name}
    >
      <div className={`absolute inset-0 ${imgClassName}`}>
        <Contours color={t.line} />
      </div>
      <span className={`pointer-events-none absolute bottom-3 left-3 font-sans text-[10px] tracking-[0.2em] uppercase ${t.label}`}>
        {name}
      </span>
    </div>
  );
}
