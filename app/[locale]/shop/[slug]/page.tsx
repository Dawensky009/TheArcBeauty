import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { locales, getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getProducts, getProduct, type Tone } from "@/lib/data";
import { formatPrice, loc } from "@/lib/utils";
import { Placeholder } from "@/components/visual/placeholder";
import { productImage, GALLERY_IMAGES } from "@/lib/images";
import { AddToCart } from "@/components/commerce/add-to-cart";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProducts().map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: loc(p.name, locale), description: loc(p.description, locale) };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const name = loc(product.name, l);
  const onSale = product.compareAt != null && product.compareAt > product.price;
  const related = getProducts()
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(getProducts().filter((p) => p.slug !== product.slug))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 4);

  const thumbTones: Tone[] = ["noir", product.tone, "sand"];
  const thumbs = [productImage(product.slug), GALLERY_IMAGES[1], GALLERY_IMAGES[4]];

  return (
    <>
      <section className="mx-auto max-w-[88rem] px-5 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
        <Link
          href={`/${l}/shop`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-stone transition-colors hover:text-gold-ink"
        >
          <ArrowLeft size={14} /> {dict.product.viewAll}
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* gallery */}
          <Reveal>
            <div className="relative">
              {onSale && (
                <span className="absolute left-5 top-5 z-10 rounded-pill bg-gold px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-obsidian">
                  {dict.product.sale}
                </span>
              )}
              <Placeholder
                tone={product.tone}
                variant="scene"
                kind="product"
                src={productImage(product.slug)}
                alt={name}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-card shadow-soft"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {thumbTones.map((tone, i) => (
                <Placeholder
                  key={i}
                  tone={tone}
                  variant="tile"
                  kind="product"
                  src={thumbs[i]}
                  alt=""
                  sizes="(max-width: 1024px) 33vw, 16vw"
                />
              ))}
            </div>
          </Reveal>

          {/* details */}
          <div>
            <h1 className="font-display text-5xl leading-[1.0] md:text-6xl">{name}</h1>
            <p className="mt-3 text-lg text-stone">{loc(product.tagline, l)}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl text-gold-ink">{formatPrice(product.price)}</span>
              {onSale && (
                <span className="text-lg text-stone-light line-through">
                  {formatPrice(product.compareAt!)}
                </span>
              )}
            </div>

            <p className="mt-7 leading-relaxed text-obsidian/85">{loc(product.description, l)}</p>

            <div className="mt-9">
              <AddToCart
                item={{
                  id: product.slug,
                  kind: "product",
                  name,
                  price: product.price,
                  tone: product.tone,
                  href: `/${l}/shop/${product.slug}`,
                }}
                label={dict.product.addToCart}
                addedLabel={dict.cart.added}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              />
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="eyebrow text-stone">{dict.product.ingredients}</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {product.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3.5 py-1.5 text-sm text-obsidian/90"
                  >
                    <Leaf size={13} className="text-gold-ink" /> {loc(ing, l)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[88rem] px-5 py-12 lg:px-8 lg:py-24">
          <h2 className="font-display mb-10 text-3xl md:text-4xl">{dict.product.related}</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} locale={l} dict={dict} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
