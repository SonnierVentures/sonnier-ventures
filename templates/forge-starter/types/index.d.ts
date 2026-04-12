/**
 * Forge Starter — shared types
 * Extend these as your venture's domain model grows.
 */

export type ForgeUser = {
  id: string
  email: string
  role: 'admin' | 'member' | 'client'
  createdAt: string
}

export type ForgeSubscription = {
  id: string
  stripeCustomerId: string
  stripeSubscriptionId?: string
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
  currentPeriodEnd?: string
}

export type ForgeWebhookEvent = {
  type: string
  data: Record<string, unknown>
  receivedAt: string
}

/** Revenue event — sent to ROIzen for cross-venture attribution */
export type ForgeRevenueEvent = {
  source: string
  amount: number
  currency: string
  userId?: string
  metadata?: Record<string, unknown>
}
