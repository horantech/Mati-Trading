/**
 * Image optimiser — runs automatically before `pnpm build` (and via `pnpm images`).
 *
 * Drop original photos (.jpg / .jpeg / .png) into public/images/ named after their slot.
 * For each original this writes, next to it:
 *   <slot>.webp       — max 2400px wide, used on large screens
 *   <slot>-1200.webp  — 1200px wide, used on phones and small layouts
 * Files are only regenerated when the original is newer than the output.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images");
const SOURCE = /\.(jpe?g|png)$/i;
const variants = [
  { suffix: "", width: 2400, quality: 78 },
  { suffix: "-1200", width: 1200, quality: 76 },
];

if (!fs.existsSync(dir)) process.exit(0);

let made = 0;
for (const file of fs.readdirSync(dir)) {
  if (!SOURCE.test(file)) continue;
  const src = path.join(dir, file);
  const base = file.replace(SOURCE, "");
  const srcTime = fs.statSync(src).mtimeMs;
  for (const v of variants) {
    const out = path.join(dir, `${base}${v.suffix}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;
    await sharp(src).rotate().resize({ width: v.width, withoutEnlargement: true }).webp({ quality: v.quality, effort: 5 }).toFile(out);
    made++;
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`  ✓ ${path.basename(out)} (${kb} KB)`);
  }
}
console.log(made ? `Optimised ${made} image file(s).` : "Images up to date.");
