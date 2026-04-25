# Donation Setup — Stripe

The Wolayo website accepts **one-time donations in USD** via **Stripe Checkout**. This guide walks you through getting it live.

---

## 1. Create a Stripe account

1. Sign up: <https://dashboard.stripe.com/register>
2. Verify your email and complete the basic business profile.
3. (Optional but recommended) Apply for **Stripe for Nonprofits** discounted pricing once you have your registration documents: <https://stripe.com/non-profits>

---

## 2. Get your API keys

1. In the Stripe Dashboard go to **Developers → API keys**.
2. You will see two keys:
   - **Publishable key** — starts with `pk_test_…` (test mode) or `pk_live_…` (live mode).
   - **Secret key** — starts with `sk_test_…` or `sk_live_…`. **Never commit this** to git or share it publicly.
3. Copy both. You will paste them into your `.env` file (next step).

> Use **test mode** keys while developing. Switch to **live mode** keys only when you are ready to accept real donations.

---

## 3. Add Stripe keys to your environment

Create (or edit) a `.env` file in the project root with:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx   # added in step 4

# Public URL of your site (used for Stripe success/cancel redirects)
APP_URL=http://localhost:3000
```

When you deploy, set the same variables in your hosting provider (Railway, Render, etc.) and change `APP_URL` to your real domain (for example `https://wolayo.org`).

`.env` is already listed in `.gitignore`, so it will not be committed.

---

## 4. Set up the Stripe webhook

The webhook is what tells your server “the donor actually paid” so the donation in MongoDB is marked **completed**.

### Local development (using the Stripe CLI)

1. Install the Stripe CLI: <https://stripe.com/docs/stripe-cli>
2. Log in: `stripe login`
3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. The CLI will print a `whsec_…` signing secret. Copy it into `.env` as `STRIPE_WEBHOOK_SECRET`.
5. Restart `node server.js`.

### Production

1. In the Stripe Dashboard go to **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://YOUR-DOMAIN/api/stripe/webhook`
3. Listen for the event: `checkout.session.completed`
4. Click **Add endpoint**, then reveal the **Signing secret** (`whsec_…`) and put it in your production `STRIPE_WEBHOOK_SECRET` env var.

---

## 5. Run it

```bash
npm install
npm start
```

Visit <http://localhost:3000/donate> and try a donation. In test mode you can use Stripe's test cards:

| Card number          | Result            |
| -------------------- | ----------------- |
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires 3D Secure |

Use any future expiry date, any 3-digit CVC, and any ZIP/postal code.

After a successful test payment you should see:
- A redirect to `/thank-you-donation`
- A new record in MongoDB with `status: "completed"`
- The session listed under **Payments** in the Stripe Dashboard

---

## 6. Going live

1. Toggle the Stripe Dashboard from **Test mode** to **Live mode**.
2. Replace the `pk_test_…` and `sk_test_…` values in your production `.env` with the live keys.
3. Add a **live** webhook endpoint pointing to your production URL and update `STRIPE_WEBHOOK_SECRET`.
4. Make a small real donation to yourself with a real card to confirm everything works end-to-end, then refund it from the Stripe Dashboard.

---

## How the integration works (for reference)

- **Frontend** (`donate.html`): collects amount and donor info, then calls `POST /api/stripe/create-checkout-session` and redirects the donor to Stripe's hosted checkout page.
- **Server** (`server.js`):
  - `POST /api/stripe/create-checkout-session` creates a one-time Stripe Checkout Session (mode `payment`) in USD and saves a pending `Donation` document.
  - `POST /api/stripe/webhook` receives the `checkout.session.completed` event and marks the donation as `completed`.
- **Currency**: hard-coded to **USD**. Recurring/monthly donations are not enabled — every donation is a single one-time charge. (Easy to add later by switching the Checkout Session to `mode: 'subscription'`.)

---

## Optional: bank transfer (offline)

If you also want to display bank account details for offline donations, that can be added as a separate section on `donate.html`. Ask when you're ready and we'll add the layout.
