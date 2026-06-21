import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { GiftCardPicker } from "@/components/commerce/gift-card-picker";
import { Logo } from "@/components/ui/logo";

export default async function GiftCardsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const g = dict.giftCards;
  const settings = getSettings();

  return (
    <section className="relative overflow-hidden">
      <div className="halo-gold pointer-events-none absolute -top-40 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2" />
      <div className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        {/* visual */}
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-gold/30 bg-gradient-to-br from-silk to-cream-deep p-8">
            <div className="halo-gold absolute inset-0" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <Logo locale={l} />
                <span className="eyebrow text-gold-ink">{g.eyebrow}</span>
              </div>
              <div>
                <p className="font-display text-5xl text-obsidian">{g.title}</p>
                <p className="mt-2 font-mono text-sm tracking-[0.3em] text-stone">
                  ARC · · · · · · · ·
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* picker */}
        <Reveal delay={0.05}>
          <p className="eyebrow text-gold-ink">{g.eyebrow}</p>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] md:text-6xl">{g.title}</h1>
          <p className="mt-5 max-w-md text-stone">{g.subtitle}</p>
          <div className="mt-9">
            <GiftCardPicker locale={l} dict={dict} />
          </div>
          <p className="mt-5 text-xs text-stone-light">
            {settings.name} · {settings.address}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
