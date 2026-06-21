import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";

export default async function PrivacyPage({
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
        ["Información que recopilamos", "Recopilamos los datos que nos facilitas al reservar, comprar o contactarnos: nombre, email, teléfono y detalles de pago procesados de forma segura por nuestro proveedor de pagos."],
        ["Cómo usamos tus datos", "Utilizamos tu información para gestionar reservas y pedidos, responder a tus consultas y mejorar nuestros servicios. Nunca vendemos tus datos."],
        ["Cookies", "Usamos cookies para analizar el tráfico y optimizar tu experiencia. Puedes desactivarlas en tu navegador."],
        ["Tus derechos", `Puedes solicitar acceso, corrección o eliminación de tus datos escribiéndonos a ${s.email}.`],
      ]
    : [
        ["Information we collect", "We collect the details you provide when booking, purchasing or contacting us: name, email, phone, and payment details processed securely by our payment provider."],
        ["How we use your data", "We use your information to manage appointments and orders, respond to enquiries, and improve our services. We never sell your data."],
        ["Cookies", "We use cookies to analyze traffic and optimize your experience. You can disable them in your browser."],
        ["Your rights", `You may request access to, correction of, or deletion of your data by writing to ${s.email}.`],
      ];

  return (
    <>
      <PageHero eyebrow={s.name} title={dict.footer.privacy} />
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
