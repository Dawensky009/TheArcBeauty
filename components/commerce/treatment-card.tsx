import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { Placeholder } from "@/components/visual/placeholder";
import { treatmentImage } from "@/lib/images";
import { formatPrice, loc, cn } from "@/lib/utils";
import type { Treatment } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

export function TreatmentCard({
  treatment,
  locale,
  dict,
  shape = "tile",
  className,
}: {
  treatment: Treatment;
  locale: Locale;
  dict: Dictionary;
  shape?: "tile" | "arch";
  className?: string;
}) {
  const href = `/${locale}/treatments/${treatment.slug}`;
  const name = loc(treatment.name, locale);

  return (
    <Link
      href={href}
      className={cn("group flex flex-col", className)}
      aria-label={name}
    >
      <div className="relative overflow-hidden">
        <Placeholder
          tone={treatment.tone}
          variant={shape === "arch" ? "arch" : "portrait"}
          kind="mono"
          src={treatmentImage(treatment.slug)}
          alt={name}
          sizes="(max-width: 768px) 50vw, 25vw"
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]",
            shape === "arch" ? "rounded-t-pill rounded-b-card" : "rounded-card",
          )}
        />
        <div className="pointer-events-none absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream-deep/70 text-gold-ink opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div className={cn("mt-4", shape === "arch" && "text-center")}>
        {treatment.isPackage && (
          <span className="eyebrow text-gold-ink">{dict.popular.eyebrow}</span>
        )}
        <h3 className="font-display mt-1 text-xl leading-tight transition-colors duration-200 group-hover:text-gold-ink">
          {name}
        </h3>
        <div
          className={cn(
            "mt-2 flex items-center gap-3 text-sm text-stone",
            shape === "arch" && "justify-center",
          )}
        >
          <span className="text-obsidian">
            {dict.treatment.from} {formatPrice(treatment.price)}
          </span>
          <span className="text-stone-light">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {treatment.durationMin} min
          </span>
        </div>
      </div>
    </Link>
  );
}
