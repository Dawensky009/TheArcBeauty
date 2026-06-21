import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Check, ArrowLeft } from "lucide-react";
import { locales, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getTreatments, getTreatment } from "@/lib/data";
import { formatPrice, loc } from "@/lib/utils";
import { Placeholder } from "@/components/visual/placeholder";
import { treatmentImage } from "@/lib/images";
import { ButtonLink } from "@/components/ui/button";
import { BookingEmbed } from "@/components/commerce/booking-embed";
import { TreatmentCard } from "@/components/commerce/treatment-card";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTreatments().map((t) => ({ locale, slug: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return {
    title: loc(t.name, locale),
    description: loc(t.description, locale),
  };
}

export default async function TreatmentDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = getTreatment(slug);
  if (!t) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const related = getTreatments()
    .filter((x) => x.category === t.category && x.slug !== t.slug)
    .slice(0, 4);

  return (
    <>
      {/* intro */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="halo-gold pointer-events-none absolute -top-40 right-0 h-[40rem] w-[40rem]" />
        <div className="mx-auto max-w-[88rem] px-5 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
          <Link
            href={`/${l}/treatments`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold-ink"
          >
            <ArrowLeft size={14} /> {dict.treatment.viewAll}
          </Link>

          <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Placeholder
                tone={t.tone}
                variant="scene"
                kind="scene"
                src={treatmentImage(t.slug)}
                alt={loc(t.name, l)}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-card shadow-soft"
              />
            </Reveal>

            <div>
              <p className="eyebrow text-gold-ink">
                {t.isPackage ? dict.itsBack.eyebrow : dict.popular.eyebrow}
              </p>
              <h1 className="font-display mt-4 text-5xl leading-[1.0] md:text-6xl">
                {loc(t.name, l)}
              </h1>
              <p className="mt-3 text-lg text-stone">{loc(t.tagline, l)}</p>

              <div className="mt-7 flex items-center gap-6 border-y border-line py-5">
                <div>
                  <p className="eyebrow text-stone-light">{dict.treatment.from}</p>
                  <p className="font-display mt-1 text-3xl text-gold-ink">{formatPrice(t.price)}</p>
                </div>
                <div className="h-10 w-px bg-line" />
                <div>
                  <p className="eyebrow text-stone-light">{dict.treatment.duration}</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-lg text-obsidian">
                    <Clock size={16} className="text-gold-ink" /> {t.durationMin} min
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-relaxed text-obsidian/85">{loc(t.description, l)}</p>

              {t.includes && t.includes.length > 0 && (
                <div className="mt-7">
                  <p className="eyebrow text-stone">{dict.treatment.includes}</p>
                  <ul className="mt-4 space-y-2.5">
                    {t.includes.map((inc, i) => (
                      <li key={i} className="flex items-center gap-3 text-obsidian/90">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-ink">
                          <Check size={12} />
                        </span>
                        {loc(inc, l)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ButtonLink href="#book" size="lg" className="mt-9">
                {dict.treatment.book}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* booking */}
      <section id="book" className="scroll-mt-24 bg-cream-deep py-12 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-9 text-center">
            <h2 className="font-display text-3xl md:text-5xl">{dict.treatment.bookTitle}</h2>
            <p className="mx-auto mt-4 max-w-lg text-stone">
              {dict.treatment.bookSubtitle}
            </p>
          </div>
          <BookingEmbed dict={dict} treatmentSlug={t.slug} />
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[88rem] px-5 py-12 lg:px-8 lg:py-24">
          <h2 className="font-display mb-10 text-3xl md:text-4xl">{dict.product.related}</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {related.map((rt) => (
              <TreatmentCard key={rt.slug} treatment={rt} locale={l} dict={dict} shape="tile" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
