import Image from "next/image";
import { FOUNDER_IMAGE } from "@/lib/images";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary, Locale } from "@/lib/i18n";

/**
 * Founder section — Patricia, owner of The Arc Beauty Services.
 * Portrait + personal note, scroll-revealed. Copy in lib/dictionaries
 * (placeholder bio — to be replaced with Patricia's own words).
 */
export function Founder({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.founder;

  return (
    <section className="relative overflow-hidden bg-ivory py-16 lg:py-28">
      <div className="halo-gold pointer-events-none absolute -right-32 top-8 h-[36rem] w-[36rem]" />

      <div className="mx-auto grid max-w-[88rem] items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        {/* portrait */}
        <Reveal y={28}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-card shadow-soft lg:max-w-none">
            <Image
              src={FOUNDER_IMAGE}
              alt={f.name}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            {/* name plate */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-cream/85 px-5 py-3 backdrop-blur-md">
              <span className="font-display text-xl text-obsidian">{f.name}</span>
              <span className="text-right text-[0.65rem] uppercase tracking-[0.14em] text-gold-ink">
                {f.role}
              </span>
            </div>
          </div>
        </Reveal>

        {/* text */}
        <div>
          <Reveal delay={0.05}>
            <p className="eyebrow">{f.eyebrow}</p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] md:text-6xl">
              {f.name}
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-stone">{f.role}</p>
          </Reveal>

          <Reveal
            delay={0.12}
            className="mt-7 space-y-4 text-lg leading-relaxed text-obsidian/85"
          >
            <p>{f.p1}</p>
            <p>{f.p2}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <blockquote className="mt-8 border-l-2 border-gold pl-5 font-display text-2xl text-gold-ink">
              “{f.quote}”
            </blockquote>
            <div className="mt-9">
              <ButtonLink href={`/${locale}/book`} size="lg">
                {f.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
