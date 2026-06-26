import { NextResponse, type NextRequest } from "next/server";
import { getProduct, getTreatment } from "@/lib/data";
import { loc } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Checkout — Square Online Checkout (hosted Payment Link).
 * Degrades gracefully: without Square keys, returns { configured:false }
 * and the client falls back to "reserve by phone".
 * Prices are ALWAYS recomputed server-side from lib/data.ts — the client
 * price is never trusted (anti price-tampering).
 * ------------------------------------------------------------------ */

interface ClientItem {
  id: string;
  kind: "product" | "treatment" | "gift";
  qty?: number;
  name?: string;
}

const SQUARE_HOSTS = {
  sandbox: "https://connect.squareupsandbox.com",
  production: "https://connect.squareup.com",
} as const;

/** Resolve a line item's canonical name + USD price server-side. */
function resolve(item: ClientItem, lc: string): { name: string; amount: number } | null {
  if (item.kind === "product") {
    const p = getProduct(item.id);
    return p ? { name: loc(p.name, lc), amount: p.price } : null;
  }
  if (item.kind === "treatment") {
    const t = getTreatment(item.id);
    return t ? { name: loc(t.name, lc), amount: t.price } : null;
  }
  if (item.kind === "gift") {
    // Gift card value is encoded in the id ("gift-<amount>"); min $10.
    const n = parseInt(String(item.id).replace(/^gift-/, ""), 10);
    if (!Number.isFinite(n) || n < 10) return null;
    return { name: (item.name ?? `Gift Card · $${n}`).slice(0, 255), amount: n };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const env =
    process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";

  if (!token || !locationId) {
    return NextResponse.json({ configured: false });
  }

  try {
    const { items, locale } = (await req.json()) as {
      items: ClientItem[];
      locale?: string;
    };
    const lc = locale ?? "en";

    // Recompute every line item from the server-side catalog.
    const lineItems = (items ?? [])
      .map((i) => {
        const r = resolve(i, lc);
        if (!r) return null;
        const qty = Math.max(1, Math.floor(Number(i.qty) || 1));
        return {
          name: r.name,
          quantity: String(qty),
          base_price_money: {
            amount: Math.round(r.amount * 100), // integer cents
            currency: "USD",
          },
        };
      })
      .filter(Boolean);

    if (lineItems.length === 0) {
      return NextResponse.json({ configured: false, error: "empty cart" });
    }

    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      new URL(req.url).origin;

    const res = await fetch(
      `${SQUARE_HOSTS[env]}/v2/online-checkout/payment-links`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Square-Version": "2026-05-20",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idempotency_key: crypto.randomUUID(),
          order: {
            location_id: locationId,
            line_items: lineItems,
          },
          checkout_options: {
            redirect_url: `${origin}/${lc}?checkout=success`,
          },
        }),
      },
    );

    const data = await res.json();
    const url = data?.payment_link?.url ?? data?.payment_link?.long_url;
    if (url) return NextResponse.json({ url });

    return NextResponse.json({ configured: false, error: data?.errors ?? "no link" });
  } catch (error) {
    return NextResponse.json({ configured: false, error: String(error) });
  }
}
