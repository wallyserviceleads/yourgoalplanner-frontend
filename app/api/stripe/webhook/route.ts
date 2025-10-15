import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { patchUserAppMetadata } from '@/lib/auth0-mgmt';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, 
  const sig = (await headers()).get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whSecret) return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });

  const rawBody = await req.arrayBuffer();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(rawBody), sig, whSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string | null;
        const userSub = session.client_reference_id as string | undefined;
        if (customerId && userSub && process.env.AUTH0_MGMT_CLIENT_ID && process.env.AUTH0_MGMT_CLIENT_SECRET) {
          // Persist customer id and basic subscription flag to app_metadata
          await patchUserAppMetadata(userSub, { stripeCustomerId: customerId, hasActiveSubscription: true });
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        const status = sub.status;
        // No user id here unless we look it up; we rely on checkout hook above to bind stripeCustomerId;
        // You can later add a lookup table (DB) to map customerId -> auth0 user if needed.
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = sub.customer as string;
        // If you maintain a mapping (DB), set hasActiveSubscription=false for that user.
        break;
      }
      default:
        break;
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
