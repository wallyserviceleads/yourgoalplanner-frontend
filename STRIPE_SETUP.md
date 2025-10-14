# Stripe Setup (Checkout + Webhooks)

1. **Create a Product + Price** in Stripe and set `STRIPE_PRICE_MONTHLY` to the **Price ID**.
2. **Success/Cancel URLs** (env):
   - `STRIPE_SUCCESS_URL` → `https://yourgoalplanner.com/dashboard`
   - `STRIPE_CANCEL_URL` → `https://yourgoalplanner.com/pricing`
3. **Webhook**:
   - Add an endpoint pointing to: `https://yourgoalplanner.com/api/stripe/webhook`
   - Subscribe to events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. **Netlify/Next.js**: This Next.js App Router endpoint reads the **raw body** (`arrayBuffer`) which Stripe requires.
5. **Auth0 Linking**:
   - On `checkout.session.completed`, the route persists `stripeCustomerId` and sets `hasActiveSubscription: true` in **Auth0 app_metadata** using `client_reference_id` = Auth0 `user.sub`.
   - Make sure you have `AUTH0_MGMT_CLIENT_ID` and `AUTH0_MGMT_CLIENT_SECRET` set (and authorized for the Auth0 Management API with `update:users`).

## Local testing
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Set `STRIPE_WEBHOOK_SECRET` from the CLI output.
