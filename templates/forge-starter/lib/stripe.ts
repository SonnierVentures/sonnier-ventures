/**
 * Stripe client for the Forge starter.
 *
 * Covers:
 *  - Subscription billing (metered or flat)
 *  - Stripe Terminal (POS) for in-person service businesses
 *  - Webhook signature verification
 *
 * Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env.local.
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required — set in .env.local')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

/** Verify an incoming Stripe webhook and return the typed event */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is required')
  return stripe.webhooks.constructEvent(payload, signature, secret)
}
