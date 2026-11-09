# Mati Trading PLC — Website

Corporate website for **Mati Trading PLC**, a diversified Ethiopian trading company with seven business lines (client: Sibu Trading PLC). The site is in English, Amharic and Afaan Oromo.

Built by Horan Technologies with Next.js 15, Tailwind CSS 4 and TypeScript, exported as a fully static site.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:3000  (English home)
pnpm build      # static export to ./out
pnpm start      # serve ./out locally
```

## Deploying

`pnpm build` produces a static `out/` folder. It can be hosted on Vercel, Netlify, Cloudflare Pages or any cPanel/Apache host (upload the contents of `out/`).

- English is the default language: `/` serves the English site, and `/am/` and `/om/` hold the Amharic and Afaan Oromo versions.
- Every page has hreflang alternates, and `sitemap.xml` and `robots.txt` are generated.

## Where things live

| What | Where |
|---|---|
| Contact details, domain, form email | `src/lib/site.ts` |
| English text (source of truth) | `src/content/en.ts` |
| Amharic / Afaan Oromo text | `src/content/am.ts`, `src/content/om.ts` |
| Business lines (order, images) | `src/content/divisions.ts` |
| Image slots | `src/content/images.ts` |
| Brand colours & fonts | `src/app/globals.css`, `src/lib/fonts.ts` |
| Logo files | `public/brand/` |

## Images

Every image slot shows a branded placeholder until a photo is added. To add one, save the original (`.jpg`, `.jpeg` or `.png`, any size) as `public/images/<slot>.jpeg` and rebuild.

The build optimises images automatically. `pnpm build` first runs `scripts/optimize-images.mjs`, which writes four WebP sizes next to each original (`<slot>.webp` up to 2400 px, plus `-1800`, `-1200` and `-640`). Each photo lists all of them so every screen downloads only the size it needs, and the URLs carry a content hash (`?v=…`) so `vercel.json` can cache them for a year. The heavy originals are then removed from `out/`. Run `pnpm images` to optimise without building, or `node scripts/optimize-images.mjs --force` to regenerate everything. **Commit the generated `.webp` files**: the originals are gitignored, so Vercel builds only from the WebP files. Prompts for generating all 29 images are in **[docs/IMAGE_PROMPTS.md](docs/IMAGE_PROMPTS.md)**.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) and delivers to `site.formEmail` (currently `contact@horan.tech`).

- **First submission:** FormSubmit sends an activation email to that address. Click the link once and later messages arrive normally.
- **To change the recipient:** edit `formEmail` in `src/lib/site.ts`, rebuild, and activate the new address the same way.

## Brand

- **Mark:** the Highland Bean ribbon M from the *Mati Coffee Brand Identity 2026*. It was extracted from the source PDF as vector outlines with the original gradients (`public/brand/mati-mark-gold.svg`), plus a single-colour version (`mati-mark-mono.svg`).
- **Corporate palette:** Deep Navy `#14243D`, Midnight `#0C1626`, Heritage Gold `#BF995A`, Sand `#EDE3D1`.
- **Coffee palette:** Espresso Night `#241206`, Roasted Umber `#7A4B2E`, Coffee Gold `#D08A36`, Highland Cream `#F9ECD8`, Forest `#1E4D3B`.
- **Type (Sibu corporate spec):** Montserrat throughout. ExtraBold for the MATI wordmark, SemiBold with 32% tracking for TRADING PLC, Bold for headlines, Regular for body text. Noto Sans Ethiopic for Amharic.

## Content to confirm with the client

- [ ] Final domain (`site.url`)
- [ ] Office address, phone, WhatsApp, email, social links
- [ ] Leadership names, roles and photos (About page)
- [ ] Export markets listed on the homepage (Europe, Middle East, Asia, North America)
- [ ] Coffee facts: altitude range, harvest months, grades offered
- [ ] Cup of Excellence wording (currently "the family behind Mati")
- [ ] Native-speaker review of Amharic and Afaan Oromo copy (see notes below)
- [ ] Final AI photography (see `docs/IMAGE_PROMPTS.md`)

### Translation review notes

- **Amharic:** harvest months are given in the Ethiopian calendar (ጥቅምት – ጥር). "2020" is marked እ.ኤ.አ. in the award text. Coffee trade terms (ሎት, ናቹራል, ካፒንግ) and "PLC" → ኃ.የተ.የግ.ማ. should be checked.
- **Afaan Oromo:** several loanwords (loottii, sampila, loojistiksii, swiichgiyaroota) need checking. The singular/plural imperatives on buttons are mixed. The "Electrical equipment & appliances" name repeats *Meeshaalee*.
