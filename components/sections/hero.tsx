import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  HERO_FULL,
  productImage,
  treatmentImage,
  MAISON_IMAGE,
} from "@/lib/images";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;

  const cards = [
    { label: h.cardShop, desc: h.cardShopDesc, href: `/${locale}/shop`, src: productImage("peppermint-toner-organic")! },
    { label: h.cardTreatments, desc: h.cardTreatmentsDesc, href: `/${locale}/treatments`, src: treatmentImage("signature-facial")! },
    { label: h.cardGift, desc: h.cardGiftDesc, href: `/${locale}/gift-cards`, src: productImage("petalisse-body-oil")! },
    { label: h.cardMaison, desc: h.cardMaisonDesc, href: `/${locale}/maison`, src: MAISON_IMAGE },
  ];

  return (
    <section className="relative -mt-16 min-h-[100svh] w-full overflow-hidden">
      {/* full-bleed Full-HD image */}
      <Image
        src={HERO_FULL}
        alt="The Arc Beauty — radiant, glowing skin"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />

      {/* legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3a281a]/85 via-[#3a281a]/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#251a0f]/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#221710]/75 via-[#221710]/20 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[100rem] flex-col px-6 pb-6 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-28">
        {/* headline */}
        <div className="mt-[9vh] max-w-xl lg:mt-[15vh]">
          <h1 className="font-display whitespace-pre-line text-[clamp(2.9rem,6.6vw,5.8rem)] font-medium leading-[0.98] text-cream [text-shadow:0_2px_40px_rgba(20,12,6,0.45)]">
            {h.title}
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/85 sm:text-lg">
            {h.subtitle}
          </p>
          <Link
            href={`/${locale}/shop`}
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-cream px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-obsidian shadow-[0_18px_40px_-18px_rgba(20,12,6,0.6)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white active:scale-[0.98]"
          >
            {h.cta}
          </Link>
        </div>

        <div className="flex-1" />

        {/* quick navigation cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group flex items-center gap-3 rounded-2xl bg-cream/80 p-2.5 ring-1 ring-white/40 backdrop-blur-md transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-cream lg:gap-4 lg:p-3.5"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl lg:h-[4.5rem] lg:w-[4.5rem]">
                <Image src={c.src} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-obsidian lg:text-sm lg:tracking-[0.08em]">
                  {c.label}
                  <ArrowUpRight
                    size={13}
                    className="hidden text-gold-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:inline"
                  />
                </span>
                <span className="mt-0.5 block text-xs leading-tight text-stone lg:text-sm">
                  {c.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
