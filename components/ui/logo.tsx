import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  locale,
  className,
  onClick,
  light = false,
}: {
  locale: string;
  className?: string;
  onClick?: () => void;
  light?: boolean;
}) {
  const accent = light ? "text-gold-bright" : "text-gold-ink";
  return (
    <Link
      href={`/${locale}`}
      onClick={onClick}
      aria-label="The Arc Beauty — home"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-colors duration-300",
        light ? "text-cream" : "text-obsidian",
        className,
      )}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[8deg]",
          accent,
        )}
      >
        <path
          d="M6 30 A14 14 0 0 1 34 30"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M20 9 L26 31 H14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[1.3rem] leading-none tracking-tight">
        The Arc <span className={accent}>Beauty</span>
      </span>
    </Link>
  );
}
