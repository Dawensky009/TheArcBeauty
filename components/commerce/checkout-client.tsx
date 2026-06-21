"use client";

import { useState } from "react";
import { Phone, Lock, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart";
import { Button, ButtonLink } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

export function CheckoutClient({
  locale,
  dict,
  phone,
  phoneHref,
}: {
  locale: Locale;
  dict: Dictionary;
  phone: string;
  phoneHref: string;
}) {
  const { items, subtotal, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);
  const c = dict.checkout;

  if (count === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-card border border-line bg-cream px-6 py-20 text-center">
        <ShoppingBag size={32} className="text-stone-light" />
        <div>
          <p className="font-display text-2xl text-obsidian">{c.emptyTitle}</p>
          <p className="mt-2 text-stone">{c.emptyBody}</p>
        </div>
        <ButtonLink href={`/${locale}/shop`} variant="outline">
          {c.back}
        </ButtonLink>
      </div>
    );
  }

  async function pay() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items, locale }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url as string;
        return;
      }
      setFallback(true);
    } catch {
      setFallback(true);
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      {/* summary */}
      <div>
        <p className="eyebrow text-stone">{c.summary}</p>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-obsidian">{item.name}</p>
                <p className="text-sm text-stone">× {item.qty}</p>
              </div>
              <span className="text-gold-ink">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-baseline justify-between">
          <span className="eyebrow text-stone">{dict.cart.subtotal}</span>
          <span className="font-display text-3xl text-obsidian">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-3 text-xs text-stone-light">{dict.cart.note}</p>
      </div>

      {/* pay panel */}
      <div className="h-fit rounded-card border border-line bg-cream p-7">
        {fallback ? (
          <>
            <h2 className="font-display text-2xl text-obsidian">{c.unavailableTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone">
              {c.unavailableBody}
            </p>
            <a
              href={phoneHref}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-obsidian transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-gold-bright active:scale-[0.97]"
            >
              <Phone size={15} /> {phone}
            </a>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="eyebrow text-stone">{dict.cart.subtotal}</span>
              <span className="font-display text-2xl text-obsidian">{formatPrice(subtotal)}</span>
            </div>
            <Button size="lg" className="mt-6 w-full" onClick={pay} disabled={loading}>
              <Lock size={14} className="-ml-1" />
              {loading ? "…" : c.pay}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-light">
              <Lock size={11} /> Stripe · 256-bit SSL
            </p>
          </>
        )}
      </div>
    </div>
  );
}
