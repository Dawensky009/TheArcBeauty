import Link from "next/link";
import { Placeholder } from "@/components/visual/placeholder";
import { AddToCart } from "./add-to-cart";
import { productImage } from "@/lib/images";
import { formatPrice, loc, cn } from "@/lib/utils";
import type { Product } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ProductCard({
  product,
  locale,
  dict,
  className,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const href = `/${locale}/shop/${product.slug}`;
  const name = loc(product.name, locale);
  const onSale = product.compareAt != null && product.compareAt > product.price;
  const ingredients = product.ingredients.slice(0, 3);

  return (
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={href}
        className="relative block overflow-hidden rounded-card bg-ivory shadow-soft ring-1 ring-inset ring-line"
      >
        {onSale && (
          <span className="absolute left-4 top-4 z-20 rounded-pill bg-gold px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-obsidian">
            {dict.product.sale}
          </span>
        )}

        <Placeholder
          tone={product.tone}
          variant="tile"
          kind="product"
          src={productImage(product.slug)}
          alt={name}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.06]"
        />

        {/* glassmorphism "Key Ingredients" — reveals on hover */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
          <div className="glass rounded-2xl p-3.5">
            <p className="eyebrow text-gold-ink">{dict.product.ingredients}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="rounded-pill bg-white/55 px-2.5 py-1 text-[0.7rem] text-obsidian"
                >
                  {loc(ing, locale)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">
            <Link href={href} className="transition-colors duration-200 hover:text-gold-ink">
              {name}
            </Link>
          </h3>
          <div className="shrink-0 text-right">
            <span className="text-gold-ink">{formatPrice(product.price)}</span>
            {onSale && (
              <span className="ml-1.5 text-xs text-stone-light line-through">
                {formatPrice(product.compareAt!)}
              </span>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-stone">{loc(product.tagline, locale)}</p>

        <div className="mt-4">
          <AddToCart
            item={{
              id: product.slug,
              kind: "product",
              name,
              price: product.price,
              tone: product.tone,
              href,
            }}
            label={dict.product.addToCart}
            addedLabel={dict.cart.added}
            variant="outline"
            size="sm"
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
