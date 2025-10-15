import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, 

  const priceId = process.env.STRIPE_PRICE_MONTHLY as string;
  if (!priceId) {
    return NextResponse.json({ error: 'Missing STRIPE_PRICE_MONTHLY' }, { status: 500 });
  }

  const successUrl = process.env.STRIPE_SUCCESS_URL || `${process.env.AUTH0_BASE_URL}/dashboard`;
  const cancelUrl = process.env.STRIPE_CANCEL_URL || `${process.env.AUTH0_BASE_URL}/pricing`;

  const user = session.user as any;
  const email = user.email as string | undefined;
  const appMeta = (user['https://yourgoalplanner.com/app_metadata'] as any) || {};
  const existingCustomerId = appMeta?.stripeCustomerId as string | undefined;

  const cs = await stripe.checkout.sessions.create({
    mode: 'subscription',
    client_reference_id: user.sub as string,
    customer: existingCustomerId || undefined,
    customer_email: existingCustomerId ? undefined : email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ id: cs.id, url: cs.url });
}
