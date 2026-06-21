import { NextResponse, type NextRequest } from "next/server";
import Stripe from "stripe";

interface CheckoutItem {
  name: string;
  price: number;
  qty: number;
}

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ configured: false });
  }

  try {
    const stripe = new Stripe(key);
    const { items, locale } = (await req.json()) as {
      items: CheckoutItem[];
      locale?: string;
    };

    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      new URL(req.url).origin;
    const loc = locale ?? "en";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: (items ?? []).map((i) => ({
        price_data: {
          currency: "usd",
          product_data: { name: i.name },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.qty,
      })),
      success_url: `${origin}/${loc}?checkout=success`,
      cancel_url: `${origin}/${loc}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { configured: false, error: String(error) },
      { status: 200 },
    );
  }
}
