/**
 * Image optimiser — runs automatically before `pnpm build` (and via `pnpm images`).
 *
 * Drop original photos (.jpg / .jpeg / .png) into public/images/ named after their slot.
 * For each original this writes, next to it, a set of WebP sizes:
 *   <slot>.webp        — up to 2400px wide (large / high-density screens)
 *   <slot>-1800.webp   — 1800px
 *   <slot>-1200.webp   — 1200px
 *   <slot>-640.webp    — 640px (phones, small cards)
 * The <Photo> component lists whichever of these exist in a srcset, so the browser
 * downloads only the size it needs.
 *
 * Files are only regenerated when the original is newer than the output.
 * Run with --force to rebuild everything (e.g. after changing the settings below).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images");
const SOURCE = /\.(jpe?g|png)$/i;
const force = process.argv.includes("--force");
const variants = [
  { suffix: "", width: 2400, quality: 72 },
  { suffix: "-1800", width: 1800, quality: 74 },
  { suffix: "-1200", width: 1200, quality: 78 },
  { suffix: "-640", width: 640, quality: 78 },
];

if (!fs.existsSync(dir)) process.exit(0);

let made = 0;
for (const file of fs.readdirSync(dir)) {
  if (!SOURCE.test(file)) continue;
  const src = path.join(dir, file);
  const base = file.replace(SOURCE, "");
  const srcTime = fs.statSync(src).mtimeMs;
  const { width: srcWidth = 0 } = await sharp(src).metadata();
  for (const v of variants) {
    const out = path.join(dir, `${base}${v.suffix}.webp`);
    // Skip sizes that would be upscales of the original (except the main file).
    if (v.suffix && v.width >= srcWidth) {
      if (fs.existsSync(out)) fs.rmSync(out);
      continue;
    }
    if (!force && fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;
    let img = sharp(src).rotate().resize({ width: v.width, withoutEnlargement: true });
    // Light unsharp mask restores crispness lost when an image is shrunk a lot.
    if (srcWidth / v.width >= 1.4) img = img.sharpen({ sigma: 0.5, m1: 0.5, m2: 1 });
    await img
      .webp({ quality: v.quality, effort: 6, smartSubsample: true })
      .toFile(out);
    made++;
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`  ✓ ${path.basename(out)} (${kb} KB)`);
  }
}
console.log(made ? `Optimised ${made} image file(s).` : "Images up to date.");
