import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getTreatments } from "@/lib/data";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Bestsellers } from "@/components/sections/bestsellers";
import { PopularTreatments } from "@/components/sections/popular-treatments";
import { ItsBack } from "@/components/sections/its-back";
import { Gallery } from "@/components/sections/gallery";
import { Reviews } from "@/components/sections/reviews";
import { Experience } from "@/components/sections/experience";

export default async function HomePage({
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
      <Hero locale={l} dict={dict} />
      <Services locale={l} dict={dict} />
      <Bestsellers locale={l} dict={dict} />
      <PopularTreatments locale={l} dict={dict} treatments={getTreatments()} />
      <ItsBack locale={l} dict={dict} />
      <Gallery locale={l} dict={dict} />
      <Reviews locale={l} dict={dict} />
      <Experience locale={l} dict={dict} />
    </>
  );
}
