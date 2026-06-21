import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = { en, es } as const;

/** Full dictionary type, inferred from the English source of truth. */
export type Dictionary = typeof en;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Synchronous getter — dictionaries are bundled JSON, no async needed. */
export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
