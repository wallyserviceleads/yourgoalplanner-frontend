import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import { patchUserAppMetadata } from '@/lib/auth0-mgmt';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { stripeCustomerId } = await req.json();

  if (!stripeCustomerId) {
    return NextResponse.json({ error: 'Missing stripeCustomerId' }, { status: 400 });
  }

  try {
    await patchUserAppMetadata(session.user.sub as string, { stripeCustomerId });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update app_metadata' }, { status: 500 });
  }
}
