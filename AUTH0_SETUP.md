# Auth0 Setup (Next.js App Router)

1. **Create a Regular Web App** in Auth0.
2. Set **Allowed Callback URLs** to:  
   - `https://yourgoalplanner.com/api/auth/callback`
   - `http://localhost:3000/api/auth/callback`
3. Set **Allowed Logout URLs** to:  
   - `https://yourgoalplanner.com/`
   - `http://localhost:3000/`
4. Set **Allowed Web Origins** to:  
   - `https://yourgoalplanner.com`
   - `http://localhost:3000`
5. Create a **Machine-to-Machine app** (optional, for updating app_metadata) authorized to call **Auth0 Management API** with `update:users` scope.
6. Copy `.env.example` to `.env.local` and fill values.
7. Install deps and run:
   ```bash
   npm i
   npm run dev
   ```

## Notes
- The middleware protects `/dashboard` and `/account`. Adjust the `matcher` in `middleware.ts` as needed.
- Stripe Portal is at `/api/stripe/portal`. It creates a customer if missing and (optionally) persists `stripeCustomerId` to `app_metadata`.
- To show user profile in Server Components, use `getSession()` or the helper in `lib/auth.ts`.

---

## Optional but Recommended: Auth0 Action to include app_metadata and auto-create Stripe customer

1. In Auth0 Dashboard → **Actions** → **Library** → **Build Custom**.
2. Name it **Post-Login: Stripe Customer + Claims**, add secret **STRIPE_SECRET_KEY** (your live/test Stripe key).
3. Paste the contents of `auth0/post-login-stripe-customer.js`.
4. Deploy and add it to the **Login** flow (Post-Login).
5. This will:
   - Ensure a Stripe customer exists on first login.
   - Save `stripeCustomerId` to `app_metadata` if missing.
   - Expose all `app_metadata` on a namespaced claim: `https://yourgoalplanner.com/app_metadata`.

> If you add this Action, your Next.js session will already include `app_metadata` (including `stripeCustomerId`) and the `/api/stripe/portal` route will just work without extra Auth0 Management calls.
