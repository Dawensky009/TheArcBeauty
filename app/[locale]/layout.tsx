import type { Metadata } from "next";
import { Cormorant, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "../globals.css";

import { locales, isLocale, getDictionary, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/data";
import { loc } from "@/lib/utils";
import { CartProvider } from "@/components/providers/cart";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CartDrawer } from "@/components/commerce/cart-drawer";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://thearcbeautyservice.com",
    ),
    title: {
      default: isEs
        ? "The Arc Beauty Services · Faciales y skincare en Boca Ratón"
        : "The Arc Beauty Services · Facials & Skincare in Boca Raton",
      template: "%s · The Arc Beauty",
    },
    description: isEs
      ? "Faciales a medida, rituales corporales y skincare clínico en Boca Ratón. Realza tu glow, descubre tu belleza."
      : "Bespoke facials, body rituals and clinical skincare in Boca Raton. Enhance your glow, discover your beauty.",
    alternates: {
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      type: "website",
      title: "The Arc Beauty Services",
      description: isEs
        ? "Realza tu glow, descubre tu belleza — Boca Ratón."
        : "Enhance your glow, discover your beauty — Boca Raton.",
      locale: isEs ? "es_US" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const settings = getSettings();
  const typedLocale = locale as Locale;

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <CartProvider>
          <AnnouncementBar text={dict.announce} />
          <Nav locale={typedLocale} dict={dict} phoneHref={settings.phoneHref} />
          <main className="flex-1">{children}</main>
          <Footer locale={typedLocale} dict={dict} />
          <CartDrawer locale={typedLocale} dict={dict} />
        </CartProvider>
        <Toaster
          position="bottom-right"
          theme="light"
          offset={16}
          toastOptions={{
            style: {
              background: "#fcfaf5",
              border: "1px solid rgba(138,107,51,0.28)",
              color: "#1a1512",
              borderRadius: "14px",
              boxShadow: "0 24px 60px -34px rgba(26,21,18,0.3)",
            },
          }}
        />
        <span className="sr-only">{loc(settings.tagline, locale)}</span>
      </body>
    </html>
  );
}
