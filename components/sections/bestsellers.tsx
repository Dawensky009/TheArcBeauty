import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { getBestsellers } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Bestsellers({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = getBestsellers().slice(0, 4);

  return (
    <section className="mx-auto max-w-[88rem] px-5 py-14 lg:px-8 lg:py-28">
      <SectionHeader
        eyebrow={dict.bestsellers.eyebrow}
        title={dict.bestsellers.title}
        subtitle={dict.bestsellers.subtitle}
      />

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 sm:gap-y-12 md:mt-14 lg:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <ProductCard product={p} locale={locale} dict={dict} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center md:mt-14">
        <ButtonLink href={`/${locale}/shop`} variant="outline">
          {dict.product.viewAll}
        </ButtonLink>
      </div>
    </section>
  );
}
