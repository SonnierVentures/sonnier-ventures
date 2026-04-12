/**
 * Stripe webhook handler — Forge Starter
 *
 * Handles the core billing lifecycle events every satellite needs.
 * Add vertical-specific handlers in the switch block below.
 *
 * Register this endpoint in the Stripe Dashboard:
 *   https://dashboard.stripe.com/webhooks → Add endpoint → /api/webhooks/stripe
 */

import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import { supabaseServer } from '@/lib/supabase'
import { trackRevenue } from '@/lib/analytics'

export async function POST(req: NextRequest) {
  const payload   = await req.text()
  const signature = req.headers.get('stripe-signature') ?? ''

  let event
  try {
    event = constructWebhookEvent(payload, signature)
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      await supabaseServer.from('subscriptions').upsert({
        stripe_customer_id: session.customer,
        stripe_session_id:  session.id,
        status:             'active',
        updated_at:         new Date().toISOString(),
      })
      await trackRevenue({
        source:   'stripe.checkout',
        amount:   (session.amount_total ?? 0) / 100,
        userId:   session.client_reference_id ?? undefined,
        metadata: { sessionId: session.id },
      })
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object
      await supabaseServer.from('subscriptions').upsert({
        stripe_customer_id:     sub.customer as string,
        stripe_subscription_id: sub.id,
        status:                 sub.status,
        current_period_end:     new Date((sub.current_period_end as number) * 1000).toISOString(),
        updated_at:             new Date().toISOString(),
      })
      break
    }

    case 'payment_intent.succeeded': {
      const pi = event.data.object
      await trackRevenue({
        source: 'stripe.payment_intent',
        amount: pi.amount / 100,
      })
      break
    }

    default:
      // Unhandled event — log and return 200 so Stripe doesn't retry
      console.log('[stripe webhook] unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}
