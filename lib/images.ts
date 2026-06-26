/* ------------------------------------------------------------------ *
 * Curated free imagery (Unsplash CDN) — placeholders for the client's
 * own HD photography. All IDs verified to return 200. Swap freely.
 * ------------------------------------------------------------------ */

function img(id: string, w = 1200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

// Hero — full-bleed editorial image (Full HD). Black-woman beauty / self-care
// portrait in warm bronze tones (matches the palette). Unsplash, verified 200.
export const HERO_FULL = img("1618509682637-e4790939cf96", 1920);

// Hero — vivid, full-colour beauty slideshow (saturation-picked)
export const HERO_SLIDES: string[] = [
  img("1624819318229-f006595a4993", 1400), // bronzed glow close-up
  img("1699206791200-414d95e68450", 1400), // luminous skin, hand on chin
  img("1637851496668-9310c745c3dc", 1400), // dewy skin, lilac
  img("1627561037197-f41503b0a7d4", 1400), // fresh spa, cool blue
];
export const HERO_MAIN = HERO_SLIDES[0];

// Salon services showcase
export const SERVICE_IMAGES: Record<string, string> = {
  skincare: img("1648249969490-44f3052a3721"),
  facials: img("1570172619644-dfd03ed5d881"),
  body: img("1544843776-7c98a52e08a4"),
};

// Maison / about
export const MAISON_IMAGE = img("1600334129128-685c5582fd35");

// Founder — Patricia, owner. Warm professional portrait (Unsplash, verified 200).
export const FOUNDER_IMAGE = img("1611432579402-7037e3e2c1e4", 1100);

// Editorial gallery
export const GALLERY_IMAGES: string[] = [
  img("1637851496668-9310c745c3dc", 1100),
  img("1624819318229-f006595a4993", 700),
  img("1611594547712-9e5d7da58684", 700),
  img("1643685276743-1b52832c58d5", 700),
  img("1488345979593-09db0f85545f", 700),
  img("1583417267826-aebc4d1542e1", 1100),
  img("1600334089648-b0d9d3028eb2", 1100),
];

// Products — one image per slug
const PRODUCT_IMAGES: Record<string, string> = {
  "skin-stem-cell-plus-serum": img("1620916297397-a4a5402a3c6c", 800),
  "peppermint-toner-organic": img("1632452479455-e3d5e3159b63", 800),
  "milk-facial-cleanser-8oz": img("1633171036157-78d53387fdc0", 800),
  "dark-circle-eye-cream": img("1597931752949-98c74b5b159f", 800),
  "oil-be-gone-lemon-gel-mask-8oz": img("1599022484220-967921f2217c", 800),
  "eye-complex-cream-4oz": img("1631390179226-19682ca159de", 800),
  "batana-hair-combo": img("1605204350321-cfd0ac0702e1", 800),
  "petalisse-body-oil": img("1625457191941-9023e1fb14d4", 800),
};

// Treatments — facial / spa imagery per slug
const TREATMENT_IMAGES: Record<string, string> = {
  "rg-24-glow-package-1": img("1570172619644-dfd03ed5d881"),
  "rg-24-glow-package-2": img("1616394584738-fc6e612e71b9"),
  "signature-facial": img("1544717304-a2db4a7b16ee"),
  hydrofacial: img("1512290923902-8a9f81dc236c"),
  "diamond-glow-facial": img("1552693673-1bf958298935"),
  "chemical-peel": img("1531299244174-d247dd4e5a66"),
  "body-sculpting": img("1544843776-7c98a52e08a4"),
  "detox-body-wrap": img("1554424518-336ec861b705"),
  "teeth-whitening": img("1535485156230-020016c5b156"),
  "brow-and-lash": img("1627561037197-f41503b0a7d4"),
  waxing: img("1596178060671-7a80dc8059ea"),
  "ear-candling": img("1674129962249-541e31d35149"),
};

// Review avatars
const REVIEW_AVATARS: Record<string, string> = {
  "Kerrine Estime": img("1535485156230-020016c5b156", 160),
  "tamauri hopkins": img("1581182800629-7d90925ad072", 160),
  Stephanie: img("1627561037197-f41503b0a7d4", 160),
  "Daniela R.": img("1624819318229-f006595a4993", 160),
};

export function productImage(slug: string): string | undefined {
  return PRODUCT_IMAGES[slug];
}
export function treatmentImage(slug: string): string | undefined {
  return TREATMENT_IMAGES[slug];
}
export function reviewAvatar(author: string): string | undefined {
  return REVIEW_AVATARS[author];
}
