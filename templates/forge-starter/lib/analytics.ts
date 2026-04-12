/**
 * Analytics & attribution for the Forge starter.
 *
 * ROIzen  — revenue attribution across the Sonnier Ventures satellite
 * PostHog — product analytics (feature flags, session recording, funnels)
 *
 * Both are pre-wired. Swap PostHog for any OpenTelemetry-compatible sink.
 */

const ROIZEN_API_KEY = process.env.ROIZEN_API_KEY

/** Track a revenue event in ROIzen for cross-venture attribution */
export async function trackRevenue(event: {
  source: string
  amount: number
  currency?: string
  userId?: string
  metadata?: Record<string, unknown>
}) {
  if (!ROIZEN_API_KEY) return // no-op in dev without key

  await fetch('https://api.roizen.io/v1/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ROIZEN_API_KEY}`,
    },
    body: JSON.stringify({
      venture: process.env.NEXT_PUBLIC_APP_NAME,
      ...event,
      currency: event.currency ?? 'usd',
      timestamp: new Date().toISOString(),
    }),
  })
}

/** Track a product event (client-side safe wrapper) */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  // PostHog or any analytics provider:
  // window.posthog?.capture(event, properties)
  console.debug('[forge:analytics]', event, properties)
}
