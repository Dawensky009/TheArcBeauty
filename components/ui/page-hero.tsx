import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-line", className)}>
      <div className="halo-gold pointer-events-none absolute -top-48 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2" />
      <div className="mx-auto max-w-[88rem] px-5 pb-12 pt-14 text-center lg:px-8 lg:pb-16 lg:pt-24">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="font-display mt-4 text-5xl leading-[1.0] sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
