import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Stars } from "@/components/ui/stars";
import { CountUp } from "@/components/ui/count-up";
import { getReviews, getRatingSummary, type Review } from "@/lib/data";
import { reviewAvatar } from "@/lib/images";
import { loc } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.2 5.3C39.6 36.9 44 31.1 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

function ReviewCard({ review, locale }: { review: Review; locale: Locale }) {
  const date = new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "short",
  }).format(new Date(review.date));
  const avatar = reviewAvatar(review.author);

  return (
    <figure className="flex h-full flex-col rounded-card border border-line bg-ivory p-6">
      <Stars rating={review.rating} size={14} />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-obsidian/90">
        “{loc(review.text, locale)}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        {avatar && (
          <Image
            src={avatar}
            alt={review.author}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-line"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-obsidian">{review.author}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-stone-light">
            <GoogleG size={12} /> {date}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Reviews({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reviews = getReviews();
  const summary = getRatingSummary();
  const r = dict.reviews;

  return (
    <section className="relative overflow-hidden bg-cream py-14 lg:py-28">
      <div className="halo-gold pointer-events-none absolute -left-40 top-10 h-[40rem] w-[40rem]" />
      <div className="mx-auto grid max-w-[88rem] items-start gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* rating panel */}
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">{r.eyebrow}</p>
          <h2 className="font-display mt-4 text-5xl leading-[1.0] md:text-6xl">
            {r.title}
          </h2>

          <div className="mt-9 flex items-end gap-5">
            <span className="font-display text-7xl leading-none text-gold-ink">
              <CountUp value={summary.rating} decimals={1} />
            </span>
            <span className="pb-2">
              <Stars rating={5} size={18} />
              <span className="mt-1.5 block text-sm text-stone">
                <CountUp value={summary.total} /> {r.countLabel}
              </span>
            </span>
          </div>

          <a
            href={summary.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-pill border border-line px-5 py-3 text-sm text-obsidian transition-colors duration-200 hover:border-gold/50"
          >
            <GoogleG size={17} />
            {r.cta}
            <ArrowUpRight
              size={15}
              className="text-stone transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink"
            />
          </a>
        </Reveal>

        {/* curated reviews */}
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((rev, i) => (
            <Reveal key={rev.author} delay={i * 0.06}>
              <ReviewCard review={rev} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
