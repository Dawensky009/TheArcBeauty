import { Phone, CalendarClock, Mail } from "lucide-react";
import { getSettings } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";

/**
 * Booking — Square Appointments. When NEXT_PUBLIC_SQUARE_BOOKING_URL is set,
 * embeds the salon's published Square booking site. Until then, shows a
 * refined concierge fallback so the page is always functional.
 *
 * The URL comes from Square Dashboard → Appointments → online booking site
 * ("copy link"). If the client's Square plan blocks iframing (X-Frame-Options),
 * swap this iframe for Square's official embed snippet (script-based widget).
 * `treatmentSlug` is reserved for future per-service deep-linking.
 */
export function BookingEmbed({
  dict,
  treatmentSlug,
}: {
  dict: Dictionary;
  treatmentSlug?: string;
}) {
  const bookingUrl = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL;
  const settings = getSettings();

  if (bookingUrl) {
    return (
      <div className="overflow-hidden rounded-card border border-line bg-cream">
        <iframe
          src={bookingUrl}
          title={
            treatmentSlug
              ? `${dict.treatment.bookTitle} — ${treatmentSlug}`
              : dict.treatment.bookTitle
          }
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
