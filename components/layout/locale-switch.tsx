"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitch({
  locale,
  className,
  light = false,
}: {
  locale: Locale;
  className?: string;
  light?: boolean;
}) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className={cn("flex items-center gap-1.5 text-[0.7rem] tracking-[0.14em]", className)}>
      {locales.map((l, i) => {
        const swapped = pathname.replace(/^\/(en|es)/, `/${l}`);
        return (
          <span key={l} className="flex items-center gap-1.5">
            {i > 0 && <span className={light ? "text-cream/40" : "text-stone-light"}>·</span>}
            <Link
              href={swapped}
              hrefLang={l}
              className={cn(
                "uppercase transition-colors duration-200",
                l === locale
                  ? light
                    ? "text-gold-bright"
                    : "text-gold-ink"
                  : light
                    ? "text-cream/70 hover:text-cream"
                    : "text-stone hover:text-obsidian",
              )}
              aria-current={l === locale ? "true" : undefined}
            >
              {l}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
