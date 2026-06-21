import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/data";

/* ------------------------------------------------------------------ *
 * Visual tile. Renders a real photo when `src` is given (with the tone
 * gradient as the loading/fallback layer); otherwise falls back to
 * bespoke light gradient/SVG art. Swap srcs for the client's HD photos.
 * ------------------------------------------------------------------ */

const TONES: Record<Tone, { from: string; to: string; accent: string }> = {
  amber: { from: "#f8eedb", to: "#efdfbe", accent: "#b8945a" },
  sage: { from: "#edf1e9", to: "#dde7d8", accent: "#8aa088" },
  rose: { from: "#f8ecea", to: "#f0ddda", accent: "#c99a95" },
  espresso: { from: "#f1e9dd", to: "#e6d6c2", accent: "#a8825c" },
  ocean: { from: "#eaf0f2", to: "#dae6ea", accent: "#7fa0ae" },
  plum: { from: "#f2eaf1", to: "#e7dae6", accent: "#a487ae" },
  sand: { from: "#f4ecdc", to: "#ebddc8", accent: "#c2a878" },
  noir: { from: "#f6f1e8", to: "#ece3d5", accent: "#c0a062" },
};

type Variant = "tile" | "portrait" | "wide" | "arch" | "circle" | "scene";
type Kind = "product" | "mono" | "scene";

const ASPECT: Record<Variant, string> = {
  tile: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  arch: "aspect-[3/4]",
  circle: "aspect-square",
  scene: "aspect-[4/3]",
};

const ROUND: Record<Variant, string> = {
  tile: "rounded-card",
  portrait: "rounded-card",
  wide: "rounded-card",
  arch: "rounded-t-pill rounded-b-card",
  circle: "rounded-full",
  scene: "rounded-card",
};

function Bottle({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className="h-[58%] w-auto drop-shadow-[0_18px_36px_rgba(26,21,18,0.18)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.9" />
          <stop offset="1" stopColor={accent} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="46" y="6" width="28" height="20" rx="4" fill={accent} opacity="0.8" />
      <rect x="40" y="24" width="40" height="12" rx="4" fill={accent} opacity="0.5" />
      <rect x="30" y="36" width="60" height="150" rx="16" fill="url(#g)" />
      <rect x="40" y="92" width="40" height="64" rx="8" fill="#ffffff" opacity="0.55" />
      <line x1="50" y1="108" x2="70" y2="108" stroke="#1a1512" strokeWidth="2" opacity="0.35" />
      <line x1="50" y1="120" x2="66" y2="120" stroke="#1a1512" strokeWidth="2" opacity="0.22" />
    </svg>
  );
}

export function Placeholder({
  tone = "noir",
  variant = "tile",
  kind = "scene",
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  label,
  monogram = "A",
  fill = false,
  className,
}: {
  tone?: Tone;
  variant?: Variant;
  kind?: Kind;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  monogram?: string;
  fill?: boolean;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        fill ? "h-full w-full" : ASPECT[variant],
        ROUND[variant],
        className,
      )}
      style={{ backgroundImage: `linear-gradient(155deg, ${t.from}, ${t.to})` }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(80% 60% at 50% 18%, ${t.accent}26, transparent 70%)` }}
          />
          {kind === "product" && <Bottle accent={t.accent} />}
          {kind === "mono" && (
            <span
              className="font-display select-none leading-none"
              style={{ fontSize: "min(42vw, 14rem)", color: t.accent, opacity: 0.22 }}
            >
              {monogram}
            </span>
          )}
          {kind === "scene" && (
            <>
              <span
                className="font-display absolute select-none leading-none"
                style={{ fontSize: "min(46vw, 16rem)", color: t.accent, opacity: 0.16 }}
              >
                {monogram}
              </span>
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{ background: `linear-gradient(to top, ${t.to}cc, transparent)` }}
              />
            </>
          )}
        </>
      )}

      {/* hairline inner border (over image) */}
      <div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] ring-1 ring-inset ring-black/[0.06]" />

      {label && (
        <span className="eyebrow absolute bottom-4 left-5 z-[2] text-obsidian/70">
          {label}
        </span>
      )}
    </div>
  );
}
