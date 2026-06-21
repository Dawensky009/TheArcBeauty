import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { HeroSlideshow } from "./hero-slideshow";
import { Stars } from "@/components/ui/stars";
import { getTreatment, getRatingSummary } from "@/lib/data";
import { HERO_SLIDES, productImage } from "@/lib/images";
import { loc } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

function RatingChip({
  rating,
  total,
  label,
}: {
  rating: number;
  total: number;
  label: string;
}) {
  return (
    <div className="glass flex items-center gap-3 rounded-pill px-4 py-2.5">
      <span className="font-display text-2xl leading-none text-obsidian">
        {rating.toFixed(1)}
      </span>
      <span className="block">
        <Stars rating={5} size={11} />
        <span className="mt-0.5 block text-[0.62rem] uppercase tracking-[0.14em] text-stone">
          {total} {label}
        </span>
      </span>
    </div>
  );
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;
  const s = dict.services;
  const pkg = getTreatment("rg-24-glow-package-1");
  const rating = getRatingSummary();
  const pills = [s.facials, s.skincare, s.body];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-cream via-cream to-silk/60">
      <div className="halo-gold pointer-events-none absolute -top-40 left-1/4 h-[50rem] w-[50rem]" />

      {/* desktop full-bleed slideshow (right half) */}
      <div className="absolute inset-y-0 right-0 hidden lg:block lg:w-1/2 xl:w-[52%]">
        <HeroSlideshow
          slides={HERO_SLIDES}
          alt="The Arc Beauty — radiant, glowing skin"
          sizes="52vw"
          priority
          className="h-full w-full"
        />
        {/* thin edge blend into cream (no gray tint over the image) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      </div>

      <div className="absolute right-6 top-24 z-10 hidden lg:block xl:right-12">
        <RatingChip rating={rating.rating} total={rating.total} label={dict.reviews.countLabel} />
      </div>

      <div className="relative mx-auto max-w-[88rem] px-5 lg:px-8">
        <div className="grid items-center lg:min-h-[88vh] lg:grid-cols-2 lg:gap-12">
          {/* mobile / tablet slideshow */}
          <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-card shadow-soft sm:aspect-[16/10] lg:hidden">
            <HeroSlideshow
              slides={HERO_SLIDES}
              alt="The Arc Beauty — radiant, glowing skin"
              sizes="100vw"
              priority
              className="h-full w-full"
            />
            <div className="absolute right-4 top-4 z-20">
              <RatingChip rating={rating.rating} total={rating.total} label={dict.reviews.countLabel} />
            </div>
          </div>

          {/* text */}
          <div className="stagger py-12 lg:py-24">
            <div className="flex flex-wrap gap-2">
              {pills.map((p) => (
                <span
                  key={p}
                  className="rounded-pill bg-silk/70 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.16em] text-obsidian/80 ring-1 ring-inset ring-line"
                >
                  {p}
                </span>
              ))}
            </div>

            <h1 className="font-display mt-6 whitespace-pre-line text-6xl leading-[0.95] sm:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
              {h.title}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">{h.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`/${locale}/book`} size="lg">
                {h.ctaBook}
              </ButtonLink>
              <ButtonLink href={`/${locale}/shop`} variant="gold" size="lg">
                {h.ctaShop}
              </ButtonLink>
            </div>

            {pkg && (
              <Link
                href={`/${locale}/treatments/${pkg.slug}`}
                className="group mt-10 inline-flex items-center gap-4 rounded-card glass p-2.5 pr-5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5"
              >
                <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={productImage("skin-stem-cell-plus-serum")!}
                    alt={loc(pkg.name, locale)}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <span className="text-left">
                  <span className="eyebrow text-gold-ink">{h.card}</span>
                  <span className="font-display mt-0.5 block text-lg leading-tight text-obsidian">
                    {loc(pkg.name, locale)}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-stone transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
