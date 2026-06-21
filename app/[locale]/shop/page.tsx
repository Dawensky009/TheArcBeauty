import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getProducts } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";
import { ShopGrid } from "@/components/commerce/shop-grid";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;

  return (
    <>
      <PageHero
        eyebrow={dict.bestsellers.eyebrow}
        title={dict.nav.shop}
        subtitle={
          l === "es"
            ? "Skincare clínico y rituales caseros, formulados para prolongar tu glow entre visitas."
            : "Clinical skincare and home rituals, formulated to extend your glow between visits."
        }
      />
      <div className="mx-auto max-w-[88rem] px-5 py-12 lg:px-8 lg:py-24">
        <ShopGrid products={getProducts()} locale={l} dict={dict} />
      </div>
    </>
  );
}
