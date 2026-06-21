import { Phone, CalendarClock, Mail } from "lucide-react";
import { getSettings } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";

/**
 * Real-time booking. When NEXT_PUBLIC_CALCOM_LINK is configured, embeds the
 * white-labelled Cal.com scheduler (dark theme). Until then, shows a refined
 * concierge fallback so the page is always functional.
 */
export function BookingEmbed({
  dict,
  treatmentSlug,
}: {
  dict: Dictionary;
  treatmentSlug?: string;
}) {
  const cal = process.env.NEXT_PUBLIC_CALCOM_LINK;
  const settings = getSettings();

  if (cal) {
    const event = treatmentSlug ? `${cal}/${treatmentSlug}` : cal;
    const src = `https://cal.com/${event}?theme=dark&hideEventTypeDetails=false&layout=month_view`;
    return (
      <div className="overflow-hidden rounded-card border border-line bg-cream">
        <iframe
          src={src}
          title={dict.treatment.bookTitle}
          className="h-[44rem] w-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="rounded-card border border-line bg-cream p-8 lg:p-12">
      <CalendarClock className="text-gold-ink" size={28} />
      <h3 className="font-display mt-5 text-2xl text-obsidian">
        {dict.booking.unavailableTitle}
      </h3>
      <p className="mt-3 max-w-md text-stone">{dict.booking.unavailableBody}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={settings.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-pill bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-obsidian transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-gold-bright active:scale-[0.97]"
        >
          <Phone size={15} /> {settings.phone}
        </a>
        <a
          href={`mailto:${settings.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-obsidian ring-1 ring-inset ring-line transition-colors duration-200 hover:text-gold-ink"
        >
          <Mail size={15} /> {settings.email}
        </a>
      </div>
    </div>
  );
}
