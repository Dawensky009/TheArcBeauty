import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";
import { Logo } from "@/components/ui/logo";
import { LocaleSwitch } from "./locale-switch";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { loc } from "@/lib/utils";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = getSettings();
  const f = dict.footer;
  const year = 2026;

  const explore = [
    { href: `/${locale}/treatments`, label: dict.nav.treatments },
    { href: `/${locale}/shop`, label: dict.nav.shop },
    { href: `/${locale}/gift-cards`, label: dict.nav.giftCards },
    { href: `/${locale}/maison`, label: dict.nav.maison },
    { href: `/${locale}/book`, label: dict.nav.book },
  ];

  return (
    <footer className="relative mt-px overflow-hidden bg-cream-deep">
      <div className="halo-gold pointer-events-none absolute inset-x-0 top-0 h-px" />
      <div className="rule-gold opacity-40" />

      <div className="mx-auto max-w-[88rem] px-5 py-16 lg:px-8 lg:py-24">
        {/* brand statement */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo locale={locale} />
            <p className="font-display mt-6 text-3xl leading-tight text-obsidian">
              {loc(s.tagline, locale)}
            </p>
          </div>

          {/* explore */}
          <nav aria-label={f.explore}>
            <h3 className="eyebrow mb-5 text-stone">{f.explore}</h3>
            <ul className="space-y-3 text-sm text-stone">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline pb-0.5 transition-colors hover:text-obsidian">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* visit */}
          <div>
            <h3 className="eyebrow mb-5 text-stone">{f.visit}</h3>
            <address className="space-y-3 text-sm not-italic text-stone">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold-ink" />
                <span>{s.address}</span>
              </p>
              <a href={s.phoneHref} className="flex items-center gap-2 transition-colors hover:text-obsidian">
                <Phone size={15} className="shrink-0 text-gold-ink" />
                {s.phone}
              </a>
              <a
                href={s.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-ink transition-opacity hover:opacity-80"
              >
                {f.directions} <ArrowUpRight size={14} />
              </a>
            </address>

            <h3 className="eyebrow mb-4 mt-8 text-stone">{f.hours}</h3>
            <ul className="space-y-1.5 text-sm text-stone">
              {s.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6">
                  <span>{loc(h.label, locale)}</span>
                  <span className="text-obsidian">{loc(h.value, locale)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* connect */}
          <div>
            <h3 className="eyebrow mb-5 text-stone">{f.connect}</h3>
            <div className="flex gap-3">
              <a
                href={s.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-stone transition-colors hover:border-gold/50 hover:text-gold-ink"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={s.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-stone transition-colors hover:border-gold/50 hover:text-gold-ink"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
            <div className="mt-8">
              <LocaleSwitch locale={locale} />
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 text-xs text-stone-light sm:flex-row sm:items-center">
          <p>
            © {year} {s.name}. {f.rights}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="transition-colors hover:text-obsidian">
              {f.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="transition-colors hover:text-obsidian">
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
