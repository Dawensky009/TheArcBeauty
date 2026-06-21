"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  slides: string[];
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  interval?: number;
}

/** Vivid full-colour hero slideshow: crossfade + subtle Ken-Burns,
 *  autoplay, arrows + dots. Honours prefers-reduced-motion. */
export function HeroSlideshow({
  slides,
  alt,
  sizes,
  className,
  priority = false,
  interval = 5500,
}: Props) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const n = slides.length;

  const go = useCallback((d: number) => setActive((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (reduce || n < 2) return;
    const t = setInterval(() => setActive((p) => (p + 1) % n), interval);
    return () => clearInterval(t);
  }, [reduce, n, interval]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {slides.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={src}
            alt={i === active ? alt : ""}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className={cn(
              "object-cover object-top",
              !reduce && "animate-[kenburns_18s_ease-in-out_infinite_alternate]",
            )}
          />
        </div>
      ))}

      {/* controls */}
      <div className="glass absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-pill px-2.5 py-1.5">
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="grid h-7 w-7 cursor-pointer place-items-center rounded-full text-obsidian transition-colors duration-200 hover:text-gold-ink active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                i === active ? "w-5 bg-gold-ink" : "w-1.5 bg-obsidian/25 hover:bg-obsidian/40",
              )}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="grid h-7 w-7 cursor-pointer place-items-center rounded-full text-obsidian transition-colors duration-200 hover:text-gold-ink active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
