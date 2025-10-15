import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession } from '@auth0/nextjs-auth0';
import { patchUserAppMetadata } from '@/lib/auth0-mgmt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, 

export async function GET() {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.redirect(new URL('/api/auth/login', process.env.AUTH0_BASE_URL));
  }

  const user = session.user as any;
  let stripeCustomerId = user['https://yourgoalplanner.com/app_metadata']?.stripeCustomerId || user['stripeCustomerId'];

  // Create a customer on first portal visit if one doesn't exist
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
      name: user.name || undefined,
    });
    stripeCustomerId = customer.id;

    // Optionally, persist to Auth0 app_metadata (requires MGMT credentials)
    if (process.env.AUTH0_MGMT_CLIENT_ID && process.env.AUTH0_MGMT_CLIENT_SECRET) {
      try {
        await patchUserAppMetadata(user.sub as string, { stripeCustomerId });
      } catch (e) {
        console.error('Failed to persist stripeCustomerId to Auth0 app_metadata', e);
      }
    }
  }

  const returnUrl = process.env.STRIPE_PORTAL_RETURN_URL || `${process.env.AUTH0_BASE_URL}/dashboard`;
  const sess = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });

  return NextResponse.redirect(sess.url);
}
