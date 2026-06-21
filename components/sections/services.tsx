import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Placeholder } from "@/components/visual/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SERVICE_IMAGES } from "@/lib/images";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Tone } from "@/lib/data";

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.services;

  const cards: { tone: Tone; label: string; desc: string; href: string; src: string }[] = [
    { tone: "ocean", label: s.skincare, desc: s.skincareDesc, href: `/${locale}/treatments/hydrofacial`, src: SERVICE_IMAGES.skincare },
    { tone: "rose", label: s.facials, desc: s.facialsDesc, href: `/${locale}/treatments/signature-facial`, src: SERVICE_IMAGES.facials },
    { tone: "sage", label: s.body, desc: s.bodyDesc, href: `/${locale}/treatments/body-sculpting`, src: SERVICE_IMAGES.body },
  ];

  return (
    <section className="mx-auto max-w-[88rem] px-5 py-14 lg:px-8 lg:py-28">
      <SectionHeader eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <Reveal className="mt-10 md:mt-14">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0">
          {cards.map((c) => (
            <div
              key={c.label}
              className="w-[80%] shrink-0 snap-start sm:w-[55%] md:w-auto"
            >
            <Link
              href={c.href}
              className="group relative block overflow-hidden rounded-card shadow-soft"
            >
              <Placeholder
                tone={c.tone}
                variant="portrait"
                kind="scene"
                src={c.src}
                alt={c.label}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/95 via-cream/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-obsidian">{c.label}</h3>
                <p className="mt-1.5 text-sm text-stone">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-gold-ink">
                  {s.cta}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
