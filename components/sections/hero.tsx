import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
    { label: h.cardMaison, desc: h.cardMaisonDesc, href: `/${locale}/maison`, src: MAISON_IMAGE },
  ];

  return (
    <section className="relative -mt-16 min-h-[100svh] w-full overflow-hidden">
      {/* full-bleed Full-HD image — centered subject */}
      <Image
        src={HERO_FULL}
        alt="The Arc Beauty — radiant, glowing skin"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* legibility scrims — warm, tuned for AA contrast under the headline */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#28190d]/88 via-[#28190d]/45 to-[#28190d]/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1b1108]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#1b1108]/82 via-[#1b1108]/25 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[100rem] flex-col px-6 pb-8 pt-28 sm:px-8 lg:px-14 lg:pb-12 lg:pt-32">
        {/* headline */}
        <div className="stagger mt-[7vh] max-w-2xl lg:mt-[13vh]">
          <p className="flex items-center gap-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-gold-bright">
            <span className="h-px w-9 bg-gold-bright/55" />
            {h.eyebrow}
          </p>

          <h1 className="font-display mt-6 whitespace-pre-line text-[clamp(3.1rem,7vw,6.2rem)] font-medium leading-[0.94] tracking-[-0.02em] text-cream [text-shadow:0_2px_50px_rgba(20,12,6,0.5)]">
            {h.title}
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg">
            {h.subtitle}
          </p>

          {/* CTAs — primary (shop) + secondary (book) */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={`/${locale}/shop`}
              className="group inline-flex items-center justify-center gap-2.5 rounded-pill bg-cream px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-obsidian shadow-[0_18px_46px_-18px_rgba(20,12,6,0.7)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_28px_64px_-22px_rgba(20,12,6,0.85)] active:translate-y-0 active:scale-[0.98]"
            >
              {h.cta}
              <ArrowRight
                size={15}
                className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={`/${locale}/book`}
              className="inline-flex items-center justify-center rounded-pill px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream ring-1 ring-inset ring-cream/40 backdrop-blur-sm transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-cream/10 hover:ring-cream/75"
            >
              {dict.nav.book}
            </Link>
          </div>
        </div>

        {/* spacer with a guaranteed minimum gap so the CTAs never crowd the cards */}
        <div className="min-h-[7vh] flex-1 lg:min-h-[11vh]" />

        {/* quick navigation cards */}
        <div className="reveal grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 lg:gap-4" style={{ animationDelay: "0.45s" }}>
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group flex items-center gap-3 rounded-2xl bg-cream/80 p-2.5 ring-1 ring-white/40 backdrop-blur-md transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-cream hover:shadow-[0_20px_44px_-26px_rgba(20,12,6,0.6)] lg:gap-4 lg:p-3.5"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl lg:h-[4.5rem] lg:w-[4.5rem]">
                <Image
                  src={c.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                />
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
