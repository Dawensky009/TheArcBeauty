import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, ArrowUpRight, Clock } from "lucide-react";
import { MAISON_IMAGE } from "@/lib/images";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { loc } from "@/lib/utils";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";

export default async function MaisonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const l = locale as Locale;
  const m = dict.maison;
  const s = getSettings();

  return (
    <>
      <PageHero eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle} />

      {/* about */}
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-16 text-center lg:pb-16 lg:pt-24">
        <Reveal>
          <p className="font-display text-2xl leading-relaxed text-obsidian/90 md:text-3xl">
            {m.about}
          </p>
        </Reveal>
      </section>

      {/* feature image */}
      <section className="mx-auto max-w-[88rem] px-5 pb-8 lg:px-8 lg:pb-16">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-card shadow-soft">
            <Image
              src={MAISON_IMAGE}
              alt="Inside The Arc Beauty"
              fill
              sizes="(max-width: 1408px) 100vw, 88rem"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* contact */}
      <section className="border-t border-line bg-cream-deep py-12 lg:py-24">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">{m.visitTitle}</h2>
            <p className="mt-3 max-w-md text-stone">{m.visitBody}</p>

            <div className="mt-8 space-y-5">
              <p className="flex items-start gap-3 text-obsidian/90">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-ink" /> {s.address}
              </p>
              <a
                href={s.phoneHref}
                className="flex items-center gap-3 text-obsidian/90 transition-colors hover:text-gold-ink"
              >
                <Phone size={18} className="shrink-0 text-gold-ink" /> {s.phone}
              </a>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold-ink" />
                <ul className="space-y-1.5 text-obsidian/90">
                  {s.hours.map((h, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-20 text-stone">{loc(h.label, l)}</span>
                      <span>{loc(h.value, l)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={s.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-pill border border-line px-5 py-2.5 text-sm text-obsidian transition-colors hover:border-gold/50 hover:text-gold-ink"
              >
                {dict.footer.directions} <ArrowUpRight size={14} />
              </a>
              <a
                href={s.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-stone transition-colors hover:border-gold/50 hover:text-gold-ink"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={s.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-stone transition-colors hover:border-gold/50 hover:text-gold-ink"
              >
                <FacebookIcon size={18} />
              </a>
            </div>

            <div className="mt-8 overflow-hidden rounded-card border border-line">
              <iframe
                title="Map"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`}
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-card border border-line bg-cream p-7 lg:p-9">
              <h2 className="font-display text-3xl md:text-4xl">{m.formTitle}</h2>
              <div className="mt-7">
                <ContactForm dict={dict} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
