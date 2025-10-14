/**
 * Auth0 Action: Enrich tokens and ensure Stripe customer
 * Triggers: Login / Post-Login
 * Secrets required: STRIPE_SECRET_KEY
 * Add to ID Token a custom namespaced claim with app_metadata fields.
 */
exports.onExecutePostLogin = async (event, api) => {
  // Attach app_metadata to a namespaced claim so Next.js session can read it without extra API calls
  const ns = 'https://yourgoalplanner.com/app_metadata';
  const appMeta = event.user.app_metadata || {};
  api.idToken.setCustomClaim(ns, appMeta);

  // Ensure a Stripe customer exists and persist it to app_metadata
  const stripeKey = event.secrets.STRIPE_SECRET_KEY;
  if (!stripeKey) return;

  const stripeResp = await fetch('https://api.stripe.com/v1/customers/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ query: `email:'${event.user.email}'` })
  });

  let customerId = appMeta.stripeCustomerId;
  if (!customerId) {
    let existing = null;
    try { existing = (await stripeResp.json())?.data?.[0]; } catch (e) {}
    if (existing) {
      customerId = existing.id;
    } else {
      const createResp = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeKey}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          email: event.user.email || '',
          name: event.user.name || '',
        })
      });
      const created = await createResp.json();
      customerId = created.id;
    }
    if (customerId) {
      api.user.setAppMetadata('stripeCustomerId', customerId);
      api.idToken.setCustomClaim(ns, { ...appMeta, stripeCustomerId: customerId });
    }
  }
};
