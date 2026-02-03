# Donation Payment Setup Guide

This guide explains how to accept online donations on your Wolayo website. Choose one option below and follow the steps.

---

## Option 1: Stripe Payment Links (Recommended – no coding)

**Best for:** International donors, cards (Visa, Mastercard). No backend required.

### Steps

1. **Create a Stripe account** (if you don’t have one): [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)

2. **Create a Payment Link**
   - In Stripe Dashboard go to **Product catalog** → **Payment links** → **New**
   - Name: e.g. “Wolayo Donation”
   - **Pricing:** choose **One time** and enable **“Customers can enter a custom amount”**
   - Set currency (e.g. USD)
   - Optional: add a description and your logo
   - Click **Save** and copy the link (e.g. `https://buy.stripe.com/xxxxx`)

3. **Add the link to your site**
   - Open `donate.html` and find the config at the top of the `<script>` section
   - Set `DONATION_PAYMENT_URL` to your Stripe Payment Link:
   ```javascript
   const DONATION_PAYMENT_URL = 'https://buy.stripe.com/YOUR_LINK_HERE';
   ```

4. **Done.** When donors click “Proceed to Payment” they go to Stripe, enter the amount (or use the one they chose on your page), and pay. You receive the money in your Stripe account.

**Fees:** ~2.9% + small fixed fee per transaction (varies by country). Nonprofits may get discounts.

---

## Option 2: Donorbox (Built for nonprofits)

**Best for:** Recurring donations, receipts, fundraising pages, no coding.

### Steps

1. **Sign up:** [https://donorbox.org](https://donorbox.org) (free tier available).

2. **Create a campaign**
   - Create a campaign, set your goal and currency
   - Enable one-time and/or monthly donations
   - Customize fields and thank-you message

3. **Get your link or embed code**
   - **Redirect:** Copy your campaign URL (e.g. `https://donorbox.org/wolayo`)
   - **Or embed:** Copy the embed code and replace the donation form section in `donate.html` with an iframe (see Donorbox docs)

4. **Add the link to your site**
   - In `donate.html`, set:
   ```javascript
   const DONATION_PAYMENT_URL = 'https://donorbox.org/your-campaign-slug';
   ```

Donorbox handles receipts, recurring giving, and reporting.

---

## Option 3: PayPal Donate

**Best for:** Donors who prefer PayPal. Simple to set up.

### Steps

1. **Get a PayPal Business account:** [https://www.paypal.com/business](https://www.paypal.com/business)

2. **Create a Donate button**
   - PayPal → **Tools** → **All tools** → **PayPal Buttons** → **Donate**
   - Set currency (e.g. USD), optional fixed amounts, and “Allow donors to enter their own amount”
   - Copy the generated link or button code

3. **Add to your site**
   - Use the link as `DONATION_PAYMENT_URL` in `donate.html`, or
   - Replace the “Proceed to Payment” button with PayPal’s button HTML (paste where the current button is)

---

## Option 4: Flutterwave (Uganda / Africa)

**Best for:** Local donors in Uganda – cards and **mobile money (MTN, Airtel)**.

### Steps

1. **Sign up:** [https://flutterwave.com](https://flutterwave.com) (Uganda supported).

2. **Create a payment link**
   - In Dashboard create a **Payment Link** or use **Pay** (hosted page)
   - Set currency (USD or UGX), description
   - Copy the payment link

3. **Add to your site**
   - Set `DONATION_PAYMENT_URL` in `donate.html` to your Flutterwave payment link

**Note:** For custom amounts from your form with Flutterwave you typically need a small backend (e.g. Node or PHP) that creates a transaction and returns a link. For the simplest setup, use one Flutterwave link and let donors enter the amount on Flutterwave’s page.

---

## Summary: What to do in donate.html

1. Open **donate.html**.
2. Find the line:  
   `const DONATION_PAYMENT_URL = '';`
3. Paste your payment URL between the quotes:
   - **Stripe:** your Payment Link from the Stripe Dashboard  
   - **Donorbox:** your campaign URL  
   - **PayPal:** your Donate button link  
   - **Flutterwave:** your payment link  

4. Save the file. When donors click **“Proceed to Payment”**, they will be sent to your payment page.  
   The amount they selected on your form can be shown on the next page (if your provider supports it) or they enter it again on the payment page.

---

## Optional: Bank transfer (offline)

If you want to also show bank details (e.g. USD and UGX accounts) so people can donate by bank transfer, that can be added as a separate section on the donate page with your bank name, account numbers, and branch. Ask when you’re ready and we can add the exact text and layout.
