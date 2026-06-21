import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Placeholder } from "@/components/visual/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { getPackages } from "@/lib/data";
import { treatmentImage } from "@/lib/images";
import { formatPrice, loc } from "@/lib/utils";
import type { Dictionary, Locale, } from "@/lib/i18n";
import type { Treatment } from "@/lib/data";

function PackageTile({
  treatment,
  locale,
  dict,
  className,
  caption,
}: {
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
  className?: string;
  caption: string;
}) {
  return (
    <Link
      href={`/${locale}/treatments/${treatment.slug}`}
      className={`group relative overflow-hidden rounded-card ${className ?? ""}`}
    >
      <Placeholder
        tone={treatment.tone}
        kind="scene"
        fill
        src={treatmentImage(treatment.slug)}
        alt={loc(treatment.name, locale)}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/25 to-obsidian/5" />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <span className="eyebrow text-gold-bright">{dict.itsBack.eyebrow}</span>
        <div>
          <p className="text-sm text-cream/75">{caption}</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <h3 className="font-display text-2xl leading-tight text-cream lg:text-3xl">
              {loc(treatment.name, locale)}
            </h3>
            <span className="shrink-0 rounded-pill bg-cream/15 px-3 py-1 text-sm text-cream backdrop-blur-sm">
              {dict.treatment.from} {formatPrice(treatment.price)}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-cream/20 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}

export function ItsBack({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [p1, p2] = getPackages();
  const i = dict.itsBack;

  return (
    <section className="relative overflow-hidden bg-cream-deep py-14 lg:py-28">
      <div className="halo-gold pointer-events-none absolute inset-x-0 top-0 h-72" />
      <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
        <SectionHeader eyebrow={i.eyebrow} title={i.title} />

        <Reveal className="mt-14">
          <div className="grid auto-rows-[14rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[15rem] lg:grid-cols-4 lg:auto-rows-[17rem]">
            {/* Package I — large */}
            {p1 && (
              <PackageTile
                treatment={p1}
                locale={locale}
                dict={dict}
                caption={i.p1}
                className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
              />
            )}

            {/* accent circle tile */}
            <div className="relative overflow-hidden rounded-card">
              <Placeholder
                tone="ocean"
                kind="scene"
                fill
                src={treatmentImage("hydrofacial")}
                alt="HydroFacial"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/55 to-transparent" />
              <span className="eyebrow absolute bottom-5 left-5 text-cream">HydroFacial</span>
            </div>

            {/* accent tile */}
            <div className="relative overflow-hidden rounded-card">
              <Placeholder
                tone="sage"
                kind="scene"
                fill
                src={treatmentImage("signature-facial")}
                alt="Signature Facial"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/55 to-transparent" />
              <span className="eyebrow absolute bottom-5 left-5 text-cream">Signature Facial</span>
            </div>

            {/* Package II — wide */}
            {p2 && (
              <PackageTile
                treatment={p2}
                locale={locale}
                dict={dict}
                caption={i.p2}
                className="sm:col-span-2 lg:col-span-2"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
