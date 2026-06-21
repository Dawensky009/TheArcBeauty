import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { CheckoutClient } from "@/components/commerce/checkout-client";

export const metadata = { robots: { index: false } };

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const s = getSettings();

  return (
    <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-24">
      <h1 className="font-display mb-10 text-5xl md:text-6xl">{dict.checkout.title}</h1>
      <CheckoutClient locale={l} dict={dict} phone={s.phone} phoneHref={s.phoneHref} />
    </section>
  );
}
