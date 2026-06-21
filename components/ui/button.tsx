import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "soft" | "outline" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-obsidian text-cream hover:bg-[#2a221c] shadow-soft",
  soft: "bg-silk text-obsidian ring-1 ring-inset ring-line hover:ring-gold/50",
  outline:
    "text-obsidian ring-1 ring-inset ring-obsidian/25 hover:bg-obsidian hover:text-cream",
  gold: "text-gold-ink ring-1 ring-inset ring-gold/55 hover:bg-gold-soft/50",
  ghost: "text-obsidian hover:text-gold-ink",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.7rem]",
  md: "h-11 px-6 text-xs",
  lg: "h-13 px-8 text-xs",
};

const BASE =
  "group inline-flex select-none items-center justify-center gap-2 rounded-pill font-medium uppercase tracking-[0.14em] " +
  "cursor-pointer transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </Link>
  );
}
