"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

type Cat = "all" | "skincare" | "hair" | "body";

export function ShopGrid({
  products,
  locale,
  dict,
}: {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState<Cat>("all");
  const es = locale === "es";

  const cats: { key: Cat; label: string }[] = [
    { key: "all", label: dict.popular.all },
    { key: "skincare", label: es ? "Skincare" : "Skincare" },
    { key: "hair", label: es ? "Cabello" : "Hair" },
    { key: "body", label: es ? "Cuerpo" : "Body" },
  ];

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {cats.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={cn(
              "cursor-pointer rounded-pill px-5 py-2 text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-200 active:scale-[0.97]",
              active === cat.key
                ? "bg-gold text-obsidian"
                : "border border-line text-stone hover:text-obsidian",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        key={active}
        className="stagger mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4"
      >
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
        ))}
      </div>
    </>
  );
}
