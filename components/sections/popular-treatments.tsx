"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { TreatmentCard } from "@/components/commerce/treatment-card";
import { cn } from "@/lib/utils";
import type { Treatment } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

type Filter = "all" | "face" | "body" | "addons";

export function PopularTreatments({
  locale,
  dict,
  treatments,
}: {
  locale: Locale;
  dict: Dictionary;
  treatments: Treatment[];
}) {
  const [active, setActive] = useState<Filter>("all");
  const p = dict.popular;

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: p.all },
    { key: "face", label: p.face },
    { key: "body", label: p.body },
    { key: "addons", label: p.addons },
  ];

  const filtered = (
    active === "all" ? treatments : treatments.filter((t) => t.category === active)
  ).slice(0, 8);

  return (
    <section className="mx-auto max-w-[88rem] px-5 py-14 lg:px-8 lg:py-28">
      <div className="text-center">
        <Reveal>
          <p className="eyebrow">{p.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display mt-4 text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
            {p.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-7 flex flex-wrap justify-center gap-2 md:mt-9">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              "cursor-pointer rounded-pill px-5 py-2 text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-200 active:scale-[0.97]",
              active === f.key
                ? "bg-gold text-obsidian"
                : "border border-line text-stone hover:text-obsidian",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        key={active}
        className="stagger mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-12 md:mt-14 md:grid-cols-4"
      >
        {filtered.map((t) => (
          <TreatmentCard
            key={t.slug}
            treatment={t}
            locale={locale}
            dict={dict}
            shape="arch"
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center md:mt-14">
        <ButtonLink href={`/${locale}/treatments`} variant="outline">
          {dict.treatment.viewAll}
        </ButtonLink>
      </div>
    </section>
  );
}
