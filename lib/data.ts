import type { Localized } from "./utils";

/* ------------------------------------------------------------------ *
 * Data layer — seeded from the existing site (the BRIEF).
 * Shapes mirror the intended Sanity schema so this can be swapped for
 * a live CMS client later without touching components.
 * ------------------------------------------------------------------ */

export type Tone =
  | "amber"
  | "sage"
  | "rose"
  | "espresso"
  | "ocean"
  | "plum"
  | "sand"
  | "noir";

export interface Product {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  price: number;
  compareAt?: number;
  category: "skincare" | "hair" | "body";
  ingredients: Localized[];
  tone: Tone;
  bestseller?: boolean;
  featured?: boolean;
}

export interface Treatment {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  price: number;
  durationMin: number;
  category: "face" | "body" | "addons";
  includes?: Localized[];
  depositPct?: number;
  tone: Tone;
  isPackage?: boolean;
  popular?: boolean;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: Localized;
  source: "google";
}

export interface RatingSummary {
  rating: number;
  total: number;
  mapsUrl: string;
}

export interface Settings {
  name: string;
  tagline: Localized;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  hours: { label: Localized; value: Localized }[];
  social: { facebook: string; instagram: string };
  mapsUrl: string;
  directionsUrl: string;
}

/* ----------------------------- Settings ---------------------------- */

const MAPS_CID = "https://maps.google.com/maps?cid=16562646255384912103";

export const settings: Settings = {
  name: "The Arc Beauty Services",
  tagline: {
    en: "Enhance your glow. Discover your beauty.",
    es: "Realza tu glow. Descubre tu belleza.",
  },
  address: "166 W Yamato Rd, Boca Raton, FL 33431",
  phone: "+1 561 577 5953",
  phoneHref: "tel:+15615775953",
  email: "hello@thearcbeautyservice.com",
  hours: [
    { label: { en: "Mon – Fri", es: "Lun – Vie" }, value: { en: "9:00 am – 6:00 pm", es: "9:00 – 18:00" } },
    { label: { en: "Saturday", es: "Sábado" }, value: { en: "10:00 am – 4:00 pm", es: "10:00 – 16:00" } },
    { label: { en: "Sunday", es: "Domingo" }, value: { en: "Closed", es: "Cerrado" } },
  ],
  social: {
    facebook: "https://www.facebook.com/110919815165809",
    instagram: "https://www.instagram.com/thearcbeautyservices/",
  },
  mapsUrl: MAPS_CID,
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=166+W+Yamato+Rd+Boca+Raton+FL+33431",
};

export const ratingSummary: RatingSummary = {
  rating: 5.0,
  total: 34,
  mapsUrl: MAPS_CID,
};

/* ----------------------------- Products ---------------------------- */

export const products: Product[] = [
  {
    slug: "skin-stem-cell-plus-serum",
    name: { en: "Skin Stem Cell Plus Serum", es: "Sérum Stem Cell Plus" },
    tagline: { en: "Firmness, restored", es: "Firmeza restaurada" },
    description: {
      en: "A featherlight serum that floods skin with plant stem cells and vitamin C to firm, brighten and smooth the look of fine lines.",
      es: "Un sérum ultraligero que inunda la piel de células madre vegetales y vitamina C para reafirmar, iluminar y suavizar las líneas finas.",
    },
    price: 40,
    compareAt: 60,
    category: "skincare",
    ingredients: [
      { en: "Plant stem cells", es: "Células madre vegetales" },
      { en: "Vitamin C", es: "Vitamina C" },
      { en: "Peptides", es: "Péptidos" },
    ],
    tone: "amber",
    bestseller: true,
    featured: true,
  },
  {
    slug: "peppermint-toner-organic",
    name: { en: "Peppermint Toner · Organic", es: "Tónico de Menta · Orgánico" },
    tagline: { en: "Cool, clarified, calm", es: "Frescor que clarifica" },
    description: {
      en: "Certified-organic peppermint and witch hazel sweep away the day and refine pores, leaving skin balanced and quietly luminous.",
      es: "Menta orgánica certificada y hamamelis barren el día y afinan los poros, dejando la piel equilibrada y luminosa.",
    },
    price: 40,
    compareAt: 125,
    category: "skincare",
    ingredients: [
      { en: "Peppermint", es: "Menta" },
      { en: "Witch hazel", es: "Hamamelis" },
      { en: "Aloe", es: "Aloe" },
    ],
    tone: "sage",
    bestseller: true,
    featured: true,
  },
  {
    slug: "milk-facial-cleanser-8oz",
    name: { en: "Milk Facial Cleanser 8oz", es: "Limpiador Facial de Leche 8oz" },
    tagline: { en: "The gentle daily ritual", es: "El ritual diario suave" },
    description: {
      en: "A creamy milk cleanser that melts away makeup and impurities without stripping — leaving skin soft, supple and never tight.",
      es: "Un limpiador cremoso de leche que disuelve maquillaje e impurezas sin resecar — piel suave, flexible y nunca tirante.",
    },
    price: 40,
    compareAt: 100,
    category: "skincare",
    ingredients: [
      { en: "Milk proteins", es: "Proteínas de leche" },
      { en: "Oat", es: "Avena" },
      { en: "Glycerin", es: "Glicerina" },
    ],
    tone: "sand",
    bestseller: true,
    featured: true,
  },
  {
    slug: "dark-circle-eye-cream",
    name: { en: "Dark Circle Eye Cream", es: "Crema Contorno Antiojeras" },
    tagline: { en: "Bright eyes, awake", es: "Mirada despierta" },
    description: {
      en: "Caffeine and vitamin K target shadows and puffiness while peptides firm the delicate eye area for a rested, lifted look.",
      es: "Cafeína y vitamina K atenúan ojeras y bolsas mientras los péptidos reafirman el contorno para una mirada descansada.",
    },
    price: 40,
    compareAt: 70,
    category: "skincare",
    ingredients: [
      { en: "Caffeine", es: "Cafeína" },
      { en: "Vitamin K", es: "Vitamina K" },
      { en: "Peptides", es: "Péptidos" },
    ],
    tone: "rose",
    bestseller: true,
    featured: true,
  },
  {
    slug: "oil-be-gone-lemon-gel-mask-8oz",
    name: { en: "Oil Be Gone Lemon Gel Mask 8oz", es: "Mascarilla Gel Limón 8oz" },
    tagline: { en: "Shine, sorted", es: "Adiós a los brillos" },
    description: {
      en: "A cooling lemon and kaolin gel mask that absorbs excess oil and refines texture for a fresh, matte-luminous finish.",
      es: "Una mascarilla gel de limón y caolín que absorbe el exceso de grasa y afina la textura para un acabado fresco y mate-luminoso.",
    },
    price: 40,
    compareAt: 80,
    category: "skincare",
    ingredients: [
      { en: "Lemon", es: "Limón" },
      { en: "Kaolin clay", es: "Arcilla caolín" },
      { en: "Salicylic acid", es: "Ácido salicílico" },
    ],
    tone: "sage",
    featured: true,
  },
  {
    slug: "eye-complex-cream-4oz",
    name: { en: "Eye Complex Cream 4oz", es: "Crema Complejo de Ojos 4oz" },
    tagline: { en: "Hydration that holds", es: "Hidratación que perdura" },
    description: {
      en: "A cushioning complex of niacinamide and hyaluronic acid that plumps, hydrates and softens the eye contour around the clock.",
      es: "Un complejo de niacinamida y ácido hialurónico que rellena, hidrata y suaviza el contorno de ojos a toda hora.",
    },
    price: 40,
    compareAt: 75,
    category: "skincare",
    ingredients: [
      { en: "Niacinamide", es: "Niacinamida" },
      { en: "Hyaluronic acid", es: "Ácido hialurónico" },
      { en: "Shea", es: "Karité" },
    ],
    tone: "sand",
    featured: true,
  },
  {
    slug: "batana-hair-combo",
    name: { en: "Batana Hair Combo", es: "Combo Capilar Batana" },
    tagline: { en: "Roots to lengths", es: "De la raíz a las puntas" },
    description: {
      en: "A nourishing duo of raw batana and castor oils to strengthen strands, soothe the scalp and revive shine and density.",
      es: "Un dúo nutritivo de aceites de batana y ricino para fortalecer el cabello, calmar el cuero cabelludo y revivir brillo y densidad.",
    },
    price: 65,
    compareAt: 100,
    category: "hair",
    ingredients: [
      { en: "Batana oil", es: "Aceite de batana" },
      { en: "Castor oil", es: "Aceite de ricino" },
      { en: "Rosemary", es: "Romero" },
    ],
    tone: "espresso",
    featured: true,
  },
  {
    slug: "petalisse-body-oil",
    name: { en: "Petalisse Body Oil", es: "Aceite Corporal Petalisse" },
    tagline: { en: "A whisper of petals", es: "Un susurro de pétalos" },
    description: {
      en: "A silken body oil of rosehip, jojoba and petal extracts that sinks in fast, leaving skin glazed, soft and softly scented.",
      es: "Un aceite corporal sedoso de rosa mosqueta, jojoba y extractos de pétalos que se absorbe rápido y deja la piel glaseada y suave.",
    },
    price: 20,
    compareAt: 35,
    category: "body",
    ingredients: [
      { en: "Rosehip", es: "Rosa mosqueta" },
      { en: "Jojoba", es: "Jojoba" },
      { en: "Petal extracts", es: "Extractos de pétalos" },
    ],
    tone: "rose",
    featured: true,
  },
];

/* ---------------------------- Treatments --------------------------- */

export const treatments: Treatment[] = [
  {
    slug: "rg-24-glow-package-1",
    name: { en: "RG 24 Glow Package I", es: "RG 24 Glow Paquete I" },
    tagline: { en: "The full reset", es: "El reinicio total" },
    description: {
      en: "Our signature glow ritual: a purifying detox back facial, a tailored facial and ear candling with wax removal — ninety minutes to feel entirely renewed.",
      es: "Nuestro ritual glow insignia: un facial detox de espalda purificante, un facial a medida y velas de oído con limpieza — noventa minutos para renovarte por completo.",
    },
    price: 250,
    durationMin: 90,
    category: "face",
    includes: [
      { en: "Detox back facial", es: "Facial detox de espalda" },
      { en: "Tailored facial", es: "Facial a medida" },
      { en: "Ear candling / wax removal", es: "Velas de oído / limpieza" },
    ],
    tone: "amber",
    isPackage: true,
    popular: true,
  },
  {
    slug: "rg-24-glow-package-2",
    name: { en: "RG 24 Glow Package II", es: "RG 24 Glow Paquete II" },
    tagline: { en: "Glow, head to smile", es: "Glow de la piel a la sonrisa" },
    description: {
      en: "A radiance-and-confidence duo: a diamond facial treatment paired with a professional teeth-whitening session for a luminous, photo-ready finish.",
      es: "Un dúo de radiancia y confianza: un tratamiento facial diamante con una sesión profesional de blanqueamiento dental para un acabado luminoso.",
    },
    price: 300,
    durationMin: 90,
    category: "face",
    includes: [
      { en: "Diamond facial treatment", es: "Tratamiento facial diamante" },
      { en: "Teeth-whitening session", es: "Sesión de blanqueamiento dental" },
    ],
    tone: "espresso",
    isPackage: true,
    popular: true,
  },
  {
    slug: "signature-facial",
    name: { en: "Signature Facial", es: "Facial Signature" },
    tagline: { en: "Tailored to your skin", es: "A medida de tu piel" },
    description: {
      en: "A deeply personalised facial — cleanse, exfoliation, extractions, massage and a bespoke mask — to leave skin clear, calm and luminous.",
      es: "Un facial profundamente personalizado — limpieza, exfoliación, extracciones, masaje y mascarilla a medida — para una piel clara y luminosa.",
    },
    price: 120,
    durationMin: 60,
    category: "face",
    tone: "sage",
    popular: true,
  },
  {
    slug: "hydrofacial",
    name: { en: "HydroFacial", es: "HydroFacial" },
    tagline: { en: "Deep clean, instant glow", es: "Limpieza profunda, glow al instante" },
    description: {
      en: "Medical-grade hydradermabrasion that cleanses, extracts and infuses skin with serums for an instant, weeks-long glow. Includes complimentary ear wax removal.",
      es: "Hidradermoabrasión de grado médico que limpia, extrae e infunde sérums para un glow inmediato que dura semanas. Incluye limpieza de oídos de cortesía.",
    },
    price: 160,
    durationMin: 60,
    category: "face",
    tone: "ocean",
    popular: true,
  },
  {
    slug: "diamond-glow-facial",
    name: { en: "Diamond Glow Facial", es: "Facial Diamond Glow" },
    tagline: { en: "Resurface and refine", es: "Renueva y afina" },
    description: {
      en: "A diamond-tip resurfacing facial that polishes away dullness and refines texture for skin that looks lit from within.",
      es: "Un facial de renovación con punta de diamante que pule la opacidad y afina la textura para una piel iluminada desde dentro.",
    },
    price: 150,
    durationMin: 60,
    category: "face",
    tone: "amber",
  },
  {
    slug: "chemical-peel",
    name: { en: "Chemical Peel", es: "Peeling Químico" },
    tagline: { en: "Renew the surface", es: "Renueva la superficie" },
    description: {
      en: "A targeted professional peel that accelerates cell turnover to fade pigmentation, soften lines and reveal fresh, even-toned skin.",
      es: "Un peeling profesional que acelera la renovación celular para atenuar la pigmentación, suavizar líneas y revelar piel fresca y uniforme.",
    },
    price: 110,
    durationMin: 45,
    category: "face",
    tone: "rose",
  },
  {
    slug: "body-sculpting",
    name: { en: "Body Sculpting", es: "Esculpido Corporal" },
    tagline: { en: "Contour and tone", es: "Contornea y tonifica" },
    description: {
      en: "Non-invasive body contouring that smooths, tightens and defines — a relaxing session with visibly toned results.",
      es: "Contorno corporal no invasivo que alisa, reafirma y define — una sesión relajante con resultados visiblemente tonificados.",
    },
    price: 140,
    durationMin: 60,
    category: "body",
    tone: "plum",
    popular: true,
  },
  {
    slug: "detox-body-wrap",
    name: { en: "Detox Body Wrap", es: "Envoltura Detox Corporal" },
    tagline: { en: "Wrapped and renewed", es: "Envuelta y renovada" },
    description: {
      en: "A warming mineral wrap that draws out impurities, softens skin and leaves the whole body feeling lighter and renewed.",
      es: "Una envoltura mineral cálida que extrae impurezas, suaviza la piel y deja todo el cuerpo más ligero y renovado.",
    },
    price: 130,
    durationMin: 75,
    category: "body",
    tone: "sage",
  },
  {
    slug: "teeth-whitening",
    name: { en: "Teeth Whitening", es: "Blanqueamiento Dental" },
    tagline: { en: "A brighter smile", es: "Una sonrisa más brillante" },
    description: {
      en: "A gentle professional whitening session that lifts stains and brightens your smile several shades in a single visit.",
      es: "Una sesión profesional y suave que elimina manchas y aclara tu sonrisa varios tonos en una sola visita.",
    },
    price: 90,
    durationMin: 45,
    category: "addons",
    tone: "sand",
    popular: true,
  },
  {
    slug: "brow-and-lash",
    name: { en: "Brow & Lash", es: "Cejas y Pestañas" },
    tagline: { en: "Framed to perfection", es: "Enmarcada a la perfección" },
    description: {
      en: "Expert shaping, tinting and lash enhancement to frame the eyes and define your features beautifully.",
      es: "Diseño, tinte y realce de pestañas expertos para enmarcar la mirada y definir tus facciones.",
    },
    price: 60,
    durationMin: 45,
    category: "addons",
    tone: "rose",
  },
  {
    slug: "waxing",
    name: { en: "Waxing & Wax Removal", es: "Depilación con Cera" },
    tagline: { en: "Smooth, refined", es: "Suave y refinada" },
    description: {
      en: "Precise, gentle waxing for smooth, refined skin — performed with premium waxes and a calm, careful touch.",
      es: "Depilación precisa y suave para una piel lisa y refinada — con ceras premium y un trato cuidadoso.",
    },
    price: 45,
    durationMin: 30,
    category: "addons",
    tone: "espresso",
  },
  {
    slug: "ear-candling",
    name: { en: "Ear Candling", es: "Velas de Oído" },
    tagline: { en: "Quiet and clarifying", es: "Tranquilo y clarificante" },
    description: {
      en: "A soothing traditional ear-candling and wax-removal ritual to relieve pressure and leave you calm and clear.",
      es: "Un ritual tradicional y relajante de velas de oído y limpieza para aliviar la presión y dejarte en calma.",
    },
    price: 35,
    durationMin: 30,
    category: "addons",
    tone: "espresso",
  },
];

/* ----------------------------- Reviews ----------------------------- */

export const reviews: Review[] = [
  {
    author: "Kerrine Estime",
    rating: 5,
    date: "2026-05-14",
    source: "google",
    text: {
      en: "Highly recommend — it was so relaxing. I got a facial and my skin has never looked better. The whole experience felt like a private retreat.",
      es: "Muy recomendable — fue tan relajante. Me hice un facial y mi piel nunca se vio mejor. Toda la experiencia fue como un retiro privado.",
    },
  },
  {
    author: "tamauri hopkins",
    rating: 5,
    date: "2026-03-25",
    source: "google",
    text: {
      en: "A beautiful experience for my 40th birthday celebration. My first facial ever and I left absolutely glowing. I'll definitely be back.",
      es: "Una experiencia preciosa para celebrar mis 40. Mi primer facial y salí radiante. Sin duda volveré.",
    },
  },
  {
    author: "Stephanie",
    rating: 5,
    date: "2026-06-15",
    source: "google",
    text: {
      en: "From the welcome to the final touch, every detail was perfect. The most luxurious facial I've had in South Florida.",
      es: "Desde la bienvenida hasta el último detalle, todo fue perfecto. El facial más lujoso que he tenido en el sur de Florida.",
    },
  },
  {
    author: "Daniela R.",
    rating: 5,
    date: "2026-02-10",
    source: "google",
    text: {
      en: "Obsessed. The HydroFacial is worth every penny — my skin looks lit from within for weeks afterwards.",
      es: "Obsesionada. El HydroFacial vale cada centavo — mi piel luce iluminada desde dentro durante semanas.",
    },
  },
];

/* -------------------------- Gift card data ------------------------- */

export const giftCardAmounts = [50, 100, 150, 250, 300, 500];

/* ----------------------------- Accessors --------------------------- */

export const getProducts = () => products;
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getBestsellers = () => products.filter((p) => p.bestseller);
export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getTreatments = () => treatments;
export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const getPackages = () => treatments.filter((t) => t.isPackage);
export const getPopularTreatments = () => treatments.filter((t) => t.popular);

export const getReviews = () => reviews;
export const getRatingSummary = () => ratingSummary;
export const getSettings = () => settings;
