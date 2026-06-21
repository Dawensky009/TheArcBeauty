import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { Placeholder } from "@/components/visual/placeholder";
import { getTreatments, getRatingSummary } from "@/lib/data";
import { treatmentImage, productImage } from "@/lib/images";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Experience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const e = dict.experience;
  const summary = getRatingSummary();
  const ritualCount = getTreatments().length;

  const stats = [
    { value: summary.rating, decimals: 1, suffix: "", label: e.stats.rating },
    { value: summary.total, decimals: 0, suffix: "", label: e.stats.reviews },
    { value: 97, decimals: 0, suffix: "%", label: e.stats.rebook },
    { value: ritualCount, decimals: 0, suffix: "", label: e.stats.rituals },
  ];

  return (
    <section className="relative overflow-hidden bg-cream-deep py-14 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow">{e.eyebrow}</p>
          <h2 className="font-display mt-4 text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
            {e.title}
          </h2>
          <p className="mt-5 max-w-md text-stone">{e.subtitle}</p>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-5xl leading-none text-obsidian">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </dd>
                <dt className="eyebrow mt-3 text-stone">{s.label}</dt>
              </div>
            ))}
          </dl>

          <ButtonLink href={`/${locale}/book`} size="lg" className="mt-12">
            {e.cta}
          </ButtonLink>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="relative">
            <Placeholder
              tone="plum"
              variant="portrait"
              kind="scene"
              src={treatmentImage("diamond-glow-facial")}
              alt={e.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-card shadow-soft"
            />
            <div className="absolute -right-5 -top-5 hidden w-32 sm:block">
              <Placeholder tone="amber" variant="tile" kind="product" src={productImage("petalisse-body-oil")} alt="" sizes="128px" className="rounded-card ring-4 ring-cream-deep" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
