"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Search, ShoppingBag, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useCart } from "@/components/providers/cart";
import { Logo } from "@/components/ui/logo";
import { LocaleSwitch } from "./locale-switch";
import { ButtonLink } from "@/components/ui/button";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";
import { getSettings } from "@/lib/data";
import { HERO_SLIDES } from "@/lib/images";
import { loc } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function MenuToggle({ open }: { open: boolean }) {
  const bar =
    "absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]";
  return (
    <span className="relative block h-4 w-6" aria-hidden="true">
      <span className={cn(bar, open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[3px]")} />
      <span
        className={cn(
          "absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 bg-current transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span className={cn(bar, open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-[3px]")} />
    </span>
  );
}

export function Nav({
  locale,
  dict,
  phoneHref,
}: {
  locale: Locale;
  dict: Dictionary;
  phoneHref: string;
}) {
  const { count, setOpen: setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const settings = getSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: `/${locale}/treatments`, label: dict.nav.treatments },
    { href: `/${locale}/shop`, label: dict.nav.shop },
    { href: `/${locale}/gift-cards`, label: dict.nav.giftCards },
    { href: `/${locale}/maison`, label: dict.nav.maison },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[70] border-b transition-colors duration-300",
          scrolled && !menuOpen
            ? "border-line bg-cream/85 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto grid h-16 max-w-[88rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 lg:px-8">
          {/* left */}
          <div className="flex items-center">
            <button
              className="grid h-10 w-10 place-items-center text-obsidian transition-colors hover:text-gold-ink lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
              aria-expanded={menuOpen}
            >
              <MenuToggle open={menuOpen} />
            </button>
            <ul className="hidden items-center gap-7 text-[0.7rem] uppercase tracking-[0.16em] text-stone lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline pb-0.5 transition-colors duration-200 hover:text-obsidian"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* center */}
          <div className="flex justify-center">
            <Logo locale={locale} />
          </div>

          {/* right */}
          <div
            className={cn(
              "flex items-center justify-end gap-3 transition-opacity duration-200 sm:gap-4",
              menuOpen && "max-lg:pointer-events-none max-lg:opacity-0",
            )}
          >
            <LocaleSwitch locale={locale} className="hidden sm:flex" />
            <button
              aria-label={dict.nav.search}
              className="hidden h-10 w-10 place-items-center text-stone transition-colors hover:text-gold-ink sm:grid"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`${dict.nav.cart} (${count})`}
              className="relative grid h-10 w-10 place-items-center text-obsidian transition-colors hover:text-gold-ink"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-obsidian">
                  {count}
                </span>
              )}
            </button>
            <ButtonLink href={`/${locale}/book`} size="sm" className="hidden lg:inline-flex">
              {dict.nav.book}
            </ButtonLink>
          </div>
        </nav>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-cream-deep lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="halo-gold pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem]" />

            <div className="relative flex min-h-full flex-col px-7 pb-10 pt-24">
              <nav className="flex flex-col">
                {links.map((l, i) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-line py-4"
                    style={{
                      animation: `reveal-up 0.5s ${0.05 * i + 0.08}s both cubic-bezier(0.23,1,0.32,1)`,
                    }}
                  >
                    <span className="font-mono text-xs text-gold-ink">
                      0{i + 1}
                    </span>
                    <span className="font-display flex-1 text-4xl text-obsidian transition-colors duration-200 group-hover:text-gold-ink">
                      {l.label}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-stone-light opacity-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </nav>

              {/* featured image (taller screens) */}
              <div
                className="relative mt-6 hidden aspect-[16/10] overflow-hidden rounded-card [@media(min-height:760px)]:block"
                style={{ animation: "reveal-up 0.5s 0.32s both cubic-bezier(0.23,1,0.32,1)" }}
              >
                <Image
                  src={HERO_SLIDES[1]}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/45 to-transparent" />
                <span className="font-display absolute bottom-4 left-5 text-2xl text-cream">
                  {loc(settings.tagline, locale)}
                </span>
              </div>

              {/* footer */}
              <div className="mt-auto pt-8">
                <ButtonLink
                  href={`/${locale}/book`}
                  onClick={() => setMenuOpen(false)}
                  className="w-full"
                  size="lg"
                >
                  {dict.nav.book}
                </ButtonLink>

                <div className="mt-7 space-y-3 text-sm text-stone">
                  <a
                    href={phoneHref}
                    className="flex items-center gap-3 transition-colors hover:text-gold-ink"
                  >
                    <Phone size={15} className="text-gold-ink" /> {settings.phone}
                  </a>
                  <a
                    href={settings.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 transition-colors hover:text-gold-ink"
                  >
                    <MapPin size={15} className="text-gold-ink" /> {settings.address}
                  </a>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
                  <div className="flex items-center gap-3">
                    <a
                      href={settings.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-line text-obsidian transition-colors hover:text-gold-ink"
                    >
                      <InstagramIcon size={16} />
                    </a>
                    <a
                      href={settings.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-line text-obsidian transition-colors hover:text-gold-ink"
                    >
                      <FacebookIcon size={16} />
                    </a>
                  </div>
                  <LocaleSwitch locale={locale} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
