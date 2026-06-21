"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/components/providers/cart";
import { Button } from "@/components/ui/button";
import { giftCardAmounts } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";

export function GiftCardPicker({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { add } = useCart();
  const [amount, setAmount] = useState<number>(giftCardAmounts[1]);
  const [custom, setCustom] = useState("");

  const parsedCustom = parseInt(custom, 10);
  const value =
    custom.length > 0 && !Number.isNaN(parsedCustom)
      ? Math.max(10, parsedCustom)
      : amount;

  return (
    <div>
      <p className="eyebrow text-stone">{dict.giftCards.choose}</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {giftCardAmounts.map((a) => {
          const selected = custom.length === 0 && a === amount;
          return (
            <button
              key={a}
              onClick={() => {
                setAmount(a);
                setCustom("");
              }}
              className={cn(
                "cursor-pointer rounded-card border py-4 font-display text-2xl transition-colors duration-200 active:scale-[0.97]",
                selected
                  ? "border-gold bg-gold/10 text-gold-ink"
                  : "border-line text-obsidian hover:border-gold/40",
              )}
            >
              {formatPrice(a)}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <label className="eyebrow text-stone" htmlFor="custom-amount">
          {dict.giftCards.custom}
        </label>
        <div className="mt-2 flex items-center rounded-pill border border-line px-5 focus-within:border-gold/50">
          <span className="text-stone">$</span>
          <input
            id="custom-amount"
            type="number"
            min={10}
            inputMode="numeric"
            placeholder="—"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full bg-transparent py-3 pl-2 text-obsidian outline-none placeholder:text-stone-light"
          />
        </div>
      </div>

      <Button
        size="lg"
        className="mt-7 w-full"
        onClick={() => {
          add({
            id: `gift-${value}`,
            kind: "gift",
            name: `${dict.giftCards.title} · ${formatPrice(value)}`,
            price: value,
            tone: "amber",
          });
          toast.success(dict.cart.added, {
            description: `${dict.giftCards.title} · ${formatPrice(value)}`,
          });
        }}
      >
        {dict.giftCards.buy} · {formatPrice(value)}
      </Button>
    </div>
  );
}
