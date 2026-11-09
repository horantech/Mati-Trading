# Mati Trading — AI image prompts

These are prompts for all 31 image slots on the website. They work in Midjourney v7, Flux, Imagen, GPT-image or Firefly.

## How to use

1. For each slot, combine the **shared style** below with the slot's own prompt.
2. Export as **JPG or WebP**, at least **2400 px** on the long edge (**3200 px** for 16:9 hero images), quality about 80.
3. Save the file to `public/images/<slot>.jpg`, using the slot name exactly. For example: `public/images/home-hero.jpg`.
4. Rebuild the site with `pnpm build`. The placeholder for that slot is replaced automatically.

## Shared style (add to every prompt)

> editorial corporate photography, shot on a full-frame camera with a 35mm lens, natural golden-hour light, refined palette of deep navy, warm stone and soft gold accents, gentle film grain, shallow depth of field, authentic modern Ethiopia and Ethiopian professionals, confident and premium, no text, no logos, no watermark, photorealistic

- **Midjourney:** add `--style raw --v 7 --ar <ratio>` to the end of each prompt, using the slot's ratio.
- **Avoid:** cartoonish or over-saturated looks, people smiling straight at the camera, poverty imagery, visible brand logos, distorted hands, garbled text.
- **Consistency:** generate the home hero first. Then use it as a style reference (`--sref`) for every other image.

---

## Home page

| Slot | Ratio | Prompt |
|---|---|---|
| `home-hero` | 16:9 | Wide view of Addis Ababa's modern business district at golden hour, contemporary glass towers and construction cranes against a warm sky, the Entoto hills in the distance, a sense of growth and ambition. **Leave darker, calm space in the lower-left third for the headline.** |
| `home-intro` | 4:5 | Two Ethiopian managers, a man in a navy suit and a woman in a tailored blazer, reviewing shipment documents on a tablet in a clean, modern warehouse, neatly stacked goods behind them, warm side light. |
| `home-export` | 16:9 | Close-up of shipping containers being lifted by a gantry crane onto a cargo ship at a Red Sea port at dusk, deep blue sky with the last of the golden light. |
| `home-import` | 16:9 | Wooden crates and pallets of imported industrial equipment being received in a bright, organised warehouse in Addis Ababa, an Ethiopian logistics officer in a hi-vis vest checking items against a clipboard. |
| `home-reach` | 16:9 | Aerial view of a container port at blue hour, rows of stacked containers in muted navy, rust and white, a cargo ship at the quay, lights coming on. |
| `home-cta` | 16:9 | Two business partners, an Ethiopian executive and an international buyer, shaking hands across a meeting table in a modern office with large windows over the city, documents and coffee cups on the table, shot from the side. |

## About

| Slot | Ratio | Prompt |
|---|---|---|
| `about-hero` | 16:9 | A modern mid-rise office building of stone and glass in Addis Ababa at golden hour, clean architecture, trees along the street, premium and calm. **Darker lower third for text.** |
| `about-story` | 4:5 | Portrait of an Ethiopian business leader in their 50s in a dark suit, standing by a window in a modern office with city views, confident and approachable, soft natural light. |
| `about-team` | 21:9 | A diverse team of Ethiopian professionals around a long wooden table in a bright, minimal boardroom, mid-discussion, laptops and documents, candid. |

## Business lines (card images and page heroes)

These images are used three ways: as a wide hero, a 4:3 image and a portrait card. **Generate them at 16:9 with the subject in the centre** so every crop works.

| Slot | Ratio | Prompt |
|---|---|---|
| `division-coffee` | 16:9 | Women hand-sorting green coffee beans at long tables in a bright, organised Ethiopian coffee warehouse, jute sacks stacked behind, daylight through high windows. |
| `division-minerals` | 16:9 | Raw mineral ore and polished samples (gold-bearing quartz, tantalite, gemstones) on a dark slate surface in a geology lab, an open-pit mine softly visible through a window, dramatic side light. |
| `division-animal-health` | 16:9 | An Ethiopian veterinarian in a clean white coat examining a healthy dairy cow on a modern farm, vet case and stethoscope nearby, morning light, green highlands behind. |
| `division-electrical` | 16:9 | A modern, well-organised electrical warehouse with industrial cable reels, switchgear cabinets and transformers on pallets, an Ethiopian technician with a tablet checking stock, cool clean light with warm accents. |
| `division-agro-industry` | 16:9 | A modern open-sided dairy barn in the Ethiopian highlands, healthy Holstein cows feeding at a long trough, an Ethiopian farm worker in overalls and boots watching over them, silos, a tractor and acacia trees in the background, soft morning light. Sharp focus, professional DSLR photograph. |
| `division-construction` | 16:9 | A contemporary glass-and-stone building under construction in Addis Ababa, a tower crane against a clear sky, workers in hi-vis vests and helmets, golden hour. |
| `division-consultancy` | 16:9 | An Ethiopian business consultant presenting to clients in a bright, modern meeting room, charts on a screen softly out of focus, notebooks and coffee cups on the table. |

## Business line detail images

| Slot | Ratio | Prompt |
|---|---|---|
| `minerals-detail` | 4:5 | Macro close-up of labelled mineral sample bags and ore fragments on a lab bench, a hand holding a loupe over a crystal, shallow focus. |
| `animal-health-detail` | 4:5 | Clean, well-organised veterinary pharmacy shelves with boxed medicines, vaccine vials in a glass-door cold-storage fridge, a gloved hand selecting a box. |
| `electrical-detail` | 4:5 | Close-up of an electrician's hands installing breakers in a modern distribution panel, colour-coded wires, precise and focused. |
| `agro-industry-detail` | 4:5 | Close-up of healthy goats and sheep eating hay from a wooden feeding trough in a clean, modern, well-ventilated livestock pen, a farmer's hand resting on a goat's back, soft natural light through open sides, calm and well cared for. No chickens or poultry. |
| `construction-detail` | 4:5 | Two Ethiopian engineers in helmets reviewing architectural drawings on a tablet at a building site, concrete frame behind, golden light. |
| `consultancy-detail` | 4:5 | Close-up of a professional's hands with a pen over a market-research report and a map of Ethiopia, laptop beside, warm desk light. |

## Coffee Export page

| Slot | Ratio | Prompt |
|---|---|---|
| `coffee-hero` | 16:9 | Sweeping view of green coffee-forest hills in the Guji highlands of southern Ethiopia in early morning, layers of misty ridges, shade trees over coffee shrubs, soft golden light. **Darker lower-left area for text.** |
| `coffee-origin` | 4:5 | A coffee farmer's hands picking ripe red coffee cherries from a branch in a shaded highland forest, soft backlight, dense green foliage. |
| `coffee-drying-beds` | 16:9 | Long rows of raised African drying beds covered in red and burgundy coffee cherries, workers turning them by hand, hills behind, warm afternoon light. |
| `coffee-cupping` | 4:3 | A professional coffee cupping table: rows of white ceramic bowls, a cupping spoon breaking the crust, green and roasted samples, dark wood, warm moody light. |
| `coffee-export` | 16:9 | Neatly stacked jute sacks of Ethiopian green coffee in a clean export warehouse, stencilled with plain "ETHIOPIA" lettering, a forklift softly blurred, warm light through a loading door. |
| `coffee-shipping` | 4:3 | Jute coffee sacks being loaded into a shipping container by workers in hi-vis vests, the container doors open, warm late light. |

## Contact

| Slot | Ratio | Prompt |
|---|---|---|
| `contact-hero` | 16:9 | Elegant modern office reception in Addis Ababa: a stone reception desk, warm wood panelling, soft gold lighting, a large window with city views, empty and welcoming. **Darker lower third for text.** |
