import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a USD price. Whole numbers render without cents. */
export function formatPrice(amount: number) {
  const hasCents = !Number.isInteger(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export type Localized = { en: string; es: string };

/** Resolve a localized field with EN fallback. */
export function loc(field: Localized | string, locale: string): string {
  if (typeof field === "string") return field;
  return field[locale as keyof Localized] ?? field.en;
}
