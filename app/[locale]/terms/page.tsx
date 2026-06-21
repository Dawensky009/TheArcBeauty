import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const es = locale === "es";
  const s = getSettings();

  const sections = es
    ? [
        ["Reservas y depósitos", "Un pequeño depósito asegura tu cita y se aplica a tu saldo final. Te pedimos avisar con 24 horas de antelación para cancelar o reprogramar."],
        ["Pagos", "Los pagos se procesan de forma segura. Los precios pueden cambiar sin previo aviso."],
        ["Productos", "Los productos se venden tal cual. Por higiene, no se aceptan devoluciones de artículos abiertos."],
        ["Tarjetas regalo", "Las tarjetas regalo no son reembolsables ni canjeables por efectivo y son válidas para tratamientos y productos."],
      ]
    : [
        ["Bookings & deposits", "A small deposit secures your appointment and is applied to your final balance. We ask for 24 hours' notice to cancel or reschedule."],
        ["Payments", "Payments are processed securely. Prices may change without notice."],
        ["Products", "Products are sold as described. For hygiene reasons, opened items cannot be returned."],
        ["Gift cards", "Gift cards are non-refundable, not redeemable for cash, and valid toward treatments and products."],
      ];

  return (
    <>
      <PageHero eyebrow={s.name} title={dict.footer.terms} />
      <div className="mx-auto max-w-3xl space-y-10 px-5 py-12 lg:px-8 lg:py-24">
        {sections.map(([h, p]) => (
          <div key={h}>
            <h2 className="font-display text-2xl text-obsidian">{h}</h2>
            <p className="mt-3 leading-relaxed text-stone">{p}</p>
          </div>
        ))}
        <p className="border-t border-line pt-8 text-xs text-stone-light">
          {es
            ? "Este texto es una plantilla y debe ser revisado por un asesor legal antes de su publicación."
            : "This text is a template and should be reviewed by legal counsel before publication."}
        </p>
      </div>
    </>
  );
}
