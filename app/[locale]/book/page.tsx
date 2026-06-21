import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getPopularTreatments } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";
import { BookingEmbed } from "@/components/commerce/booking-embed";
import { TreatmentCard } from "@/components/commerce/treatment-card";
import { Reveal } from "@/components/ui/reveal";

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const popular = getPopularTreatments().slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={dict.popular.eyebrow}
        title={dict.treatment.bookTitle}
        subtitle={dict.treatment.bookSubtitle}
      />

      <section className="mx-auto max-w-3xl px-5 py-12 lg:px-8 lg:py-16">
        <BookingEmbed dict={dict} />
      </section>

      <section className="mx-auto max-w-[88rem] border-t border-line px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="font-display mb-10 text-3xl md:text-4xl">{dict.popular.title}</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {popular.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 4) * 0.05}>
              <TreatmentCard treatment={t} locale={l} dict={dict} shape="tile" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
