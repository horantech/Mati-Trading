/**
 * Image slots used across the site.
 *
 * To add a photo: save it to /public/images/<key>.jpg (or .webp / .png) and rebuild.
 * Until a file exists, a branded placeholder is shown in its place.
 * Generation prompts for every slot are in /docs/IMAGE_PROMPTS.md.
 */
export const images = {
  "home-hero": { alt: "Addis Ababa's modern business district at golden hour", ratio: "16:9" },
  "home-intro": { alt: "Mati Trading managers reviewing shipment documents in a modern warehouse", ratio: "4:5" },
  "home-export": { alt: "Export containers being loaded onto a cargo ship", ratio: "16:9" },
  "home-import": { alt: "Imported equipment being received and checked in a warehouse", ratio: "16:9" },
  "home-reach": { alt: "Shipping containers being loaded at a port at dusk", ratio: "16:9" },
  "home-cta": { alt: "Business partners shaking hands in a modern meeting room", ratio: "16:9" },

  "about-hero": { alt: "A modern office building in Addis Ababa", ratio: "16:9" },
  "about-story": { alt: "The Mati Trading management team in their Addis Ababa office", ratio: "4:5" },
  "about-team": { alt: "The Mati team in a modern office in Addis Ababa", ratio: "21:9" },

  "division-coffee": { alt: "Green coffee beans being sorted by hand in a warehouse", ratio: "16:9" },
  "division-minerals": { alt: "Mineral ore samples in an industrial setting", ratio: "16:9" },
  "division-animal-health": { alt: "A veterinarian examining dairy cattle on a farm", ratio: "16:9" },
  "division-electrical": { alt: "Electrical switchgear and cable reels in a warehouse", ratio: "16:9" },
  "division-agro-industry": { alt: "Dairy cows feeding in a modern open barn on a farm in the Ethiopian highlands", ratio: "16:9" },
  "division-construction": { alt: "A modern building under construction in Addis Ababa", ratio: "16:9" },
  "division-consultancy": { alt: "Consultants reviewing documents in a bright meeting room", ratio: "16:9" },

  "minerals-detail": { alt: "Close-up of graded mineral samples in sample bags", ratio: "4:5" },
  "animal-health-detail": { alt: "Veterinary medicines arranged on clean shelves", ratio: "4:5" },
  "electrical-detail": { alt: "An electrician installing a distribution panel", ratio: "4:5" },
  "agro-industry-detail": { alt: "Healthy goats and sheep feeding in a clean, modern livestock pen", ratio: "4:5" },
  "construction-detail": { alt: "Engineers reviewing plans on a construction site", ratio: "4:5" },
  "consultancy-detail": { alt: "A business advisor presenting market data", ratio: "4:5" },

  "coffee-hero": { alt: "Coffee farms on the green hills of the Guji highlands", ratio: "16:9" },
  "coffee-origin": { alt: "A farmer picking ripe coffee cherries in the Guji highlands", ratio: "4:5" },
  "coffee-drying-beds": { alt: "Coffee cherries drying on raised African beds", ratio: "16:9" },
  "coffee-cupping": { alt: "A professional cupping session with rows of coffee cups", ratio: "4:3" },
  "coffee-export": { alt: "Jute sacks of green coffee stacked in a warehouse", ratio: "16:9" },
  "coffee-shipping": { alt: "Coffee sacks being loaded into a shipping container", ratio: "4:3" },

  "contact-hero": { alt: "A modern office reception with warm light", ratio: "16:9" },
} as const;

export type ImageKey = keyof typeof images;
