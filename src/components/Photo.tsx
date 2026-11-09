import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { images, type ImageKey } from "@/content/images";

const DIR = path.join(process.cwd(), "public", "images");
const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];
/** Size variants written by scripts/optimize-images.mjs, smallest first. */
const VARIANT_SUFFIXES = ["-640", "-1200", "-1800", ""];

type Resolved = { src: string; srcSet?: string };
const cache = new Map<string, Promise<Resolved | null>>();

/** Short content hash, appended as ?v= so images can be cached forever yet update when replaced. */
function version(file: string) {
  return crypto.createHash("md5").update(fs.readFileSync(file)).digest("hex").slice(0, 10);
}

/**
 * Finds /public/images/<key>.<ext> at build time. For optimised WebP images it lists
 * every size variant with its real pixel width, so the browser can pick the right one.
 */
function resolveImage(key: string): Promise<Resolved | null> {
  if (!cache.has(key)) cache.set(key, resolve(key));
  return cache.get(key)!;
}

async function resolve(key: string): Promise<Resolved | null> {
  const webp = path.join(DIR, `${key}.webp`);
  if (fs.existsSync(webp)) {
    const entries: { url: string; width: number }[] = [];
    for (const suffix of VARIANT_SUFFIXES) {
      const file = path.join(DIR, `${key}${suffix}.webp`);
      if (!fs.existsSync(file)) continue;
      const { width = 0 } = await sharp(file).metadata();
      entries.push({ url: `/images/${key}${suffix}.webp?v=${version(file)}`, width });
    }
    entries.sort((a, b) => a.width - b.width);
    const largest = entries[entries.length - 1];
    return {
      src: largest.url,
      srcSet: entries.length > 1 ? entries.map((e) => `${e.url} ${e.width}w`).join(", ") : undefined,
    };
  }
  for (const ext of EXTENSIONS.slice(1)) {
    const file = path.join(DIR, `${key}.${ext}`);
    if (fs.existsSync(file)) return { src: `/images/${key}.${ext}?v=${version(file)}` };
  }
  return null;
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

export async function Photo({
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
  /**
   * Width the image is drawn at, so the browser downloads the right size,
   * e.g. "(min-width: 1024px) 50vw, 100vw". For object-cover crops wider than the
   * frame (a 16:9 photo filling a tall box) give the cropped width, not the box width.
   */
  sizes?: string;
}) {
  const resolved = await resolveImage(name);
  const altText = alt ?? images[name].alt;
  // Don't fight an absolute/fixed position passed in by the caller (full-bleed backgrounds).
  const pos = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";

  if (resolved) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolved.src}
          srcSet={resolved.srcSet}
          sizes={resolved.srcSet ? sizes : undefined}
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
