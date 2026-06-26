import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The Arc Beauty Services — real wordmark logo.
 * Two inks: espresso (on light surfaces) and cream/gold (on dark surfaces,
 * e.g. over the hero). Cross-faded via the `light` prop so the nav stays
 * legible as it transitions from transparent-over-hero to solid-on-scroll.
 */
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
  return (
    <Link
      href={`/${locale}`}
      onClick={onClick}
      aria-label="The Arc Beauty Services — home"
      className={cn(
        "group relative inline-block h-10 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] lg:h-13",
        className,
      )}
    >
      {/* espresso ink — light surfaces */}
      <Image
        src="/logo-ink.png"
        alt="The Arc Beauty Services"
        width={800}
        height={400}
        priority
        sizes="180px"
        className={cn(
          "h-full w-auto transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          light ? "opacity-0" : "opacity-100",
        )}
      />
      {/* cream / gold ink — dark surfaces (over hero) */}
      <Image
        src="/logo-cream.png"
        alt=""
        aria-hidden="true"
        width={800}
        height={400}
        priority
        sizes="180px"
        className={cn(
          "absolute left-0 top-0 h-full w-auto transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          light ? "opacity-100" : "opacity-0",
        )}
      />
    </Link>
  );
}
