import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getTreatments } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";
import { TreatmentCard } from "@/components/commerce/treatment-card";
import { Reveal } from "@/components/ui/reveal";

export default async function TreatmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const all = getTreatments();

  const groups = [
    { key: "face" as const, label: dict.popular.face },
    { key: "body" as const, label: dict.popular.body },
    { key: "addons" as const, label: dict.popular.addons },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.popular.eyebrow}
        title={dict.nav.treatments}
        subtitle={dict.hero.subtitle}
      />

      <div className="mx-auto max-w-[88rem] space-y-20 px-5 py-12 lg:px-8 lg:py-24">
        {groups.map((g) => {
          const items = all.filter((t) => t.category === g.key);
          if (items.length === 0) return null;
          return (
            <section key={g.key}>
              <div className="mb-10 flex items-end justify-between border-b border-line pb-5">
                <h2 className="font-display text-3xl md:text-4xl">{g.label}</h2>
                <span className="eyebrow text-stone">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
                {items.map((t, i) => (
                  <Reveal key={t.slug} delay={(i % 4) * 0.05}>
                    <TreatmentCard treatment={t} locale={l} dict={dict} shape="tile" />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
