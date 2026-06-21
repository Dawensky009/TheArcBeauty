"use client";

import Link from "next/link";
import { Drawer } from "vaul";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart";
import { Placeholder } from "@/components/visual/placeholder";
import { ButtonLink } from "@/components/ui/button";
import type { Dictionary, Locale } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import type { Tone } from "@/lib/data";

export function CartDrawer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { items, isOpen, setOpen, subtotal, updateQty, remove, count } = useCart();
  const c = dict.cart;

  return (
    <Drawer.Root open={isOpen} onOpenChange={setOpen} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[70] bg-obsidian/30 backdrop-blur-sm" />
        <Drawer.Content
          className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-cream outline-none"
          style={{ boxShadow: "-30px 0 80px -20px rgba(26,21,18,0.22)" }}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <Drawer.Title className="font-display text-2xl text-obsidian">
              {c.title}
              {count > 0 && <span className="ml-2 text-gold-ink">({count})</span>}
            </Drawer.Title>
            <button
              onClick={() => setOpen(false)}
              aria-label={dict.nav.close}
              className="grid h-9 w-9 place-items-center text-stone transition-colors hover:text-gold-ink"
            >
              <X size={20} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
              <ShoppingBag size={32} className="text-stone-light" />
              <p className="text-stone">{c.empty}</p>
              <ButtonLink href={`/${locale}/shop`} variant="outline" size="sm" onClick={() => setOpen(false)}>
                {c.emptyCta}
              </ButtonLink>
            </div>
          ) : (
            <>
              <Drawer.Description className="sr-only">{c.note}</Drawer.Description>
              <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-5">
                    <div className="w-16 shrink-0">
                      <Placeholder
                        tone={(item.tone as Tone) ?? "noir"}
                        variant="tile"
                        kind={item.kind === "product" ? "product" : "mono"}
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <p className="text-sm text-obsidian">{item.name}</p>
                        <p className="text-sm text-gold-ink">{formatPrice(item.price * item.qty)}</p>
                      </div>
                      {item.meta && (
                        <p className="mt-0.5 text-xs text-stone">{item.meta}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-3 rounded-pill border border-line px-2 py-1">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="grid h-5 w-5 place-items-center text-stone transition-colors hover:text-gold-ink active:scale-[0.9]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-4 text-center text-xs tabular-nums text-obsidian">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="grid h-5 w-5 place-items-center text-stone transition-colors hover:text-gold-ink active:scale-[0.9]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-[0.7rem] uppercase tracking-[0.14em] text-stone-light transition-colors hover:text-gold-ink"
                        >
                          {c.remove}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line px-6 py-6">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-stone">{c.subtotal}</span>
                  <span className="font-display text-2xl text-obsidian">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-light">{c.note}</p>
                <ButtonLink
                  href={`/${locale}/checkout`}
                  className="mt-5 w-full"
                  onClick={() => setOpen(false)}
                >
                  {c.checkout}
                </ButtonLink>
              </div>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
