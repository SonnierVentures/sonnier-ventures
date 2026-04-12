/**
 * Empire MCP v2 client
 * Shared orchestration layer for all Forge-based ventures.
 *
 * All 39 MCP tools are available via this singleton.
 * Add new tool namespaces in the `tools` config as the venture grows.
 */

import { EmpireMCP } from '@openconductor/sdk'

if (!process.env.EMPIRE_MCP_AGENT_ID) {
  throw new Error('EMPIRE_MCP_AGENT_ID is required — set in .env.local')
}
if (!process.env.EMPIRE_MCP_API_KEY) {
  throw new Error('EMPIRE_MCP_API_KEY is required — set in .env.local')
}

export const empire = new EmpireMCP({
  agentId: process.env.EMPIRE_MCP_AGENT_ID,
  apiKey: process.env.EMPIRE_MCP_API_KEY,
  tools: [
    'supabase',
    'stripe',
    'vercel',
    'github',
    'twilio',
    'trinity',
    'schedule',
    'openconductor',
  ],
})

/**
 * Trinity AI — Oracle (reasoning), Sentinel (guard rails), Sage (memory)
 */
export const trinity = empire.trinity({
  oracle: { model: process.env.TRINITY_ORACLE_MODEL ?? 'claude-opus-4-6' },
  sentinel: { enabled: process.env.TRINITY_SENTINEL_ENABLED === 'true' },
})

/**
 * Schedule AI — fire agents on cron cadence
 * Usage: schedule.register('client-reactivation', '0 9 * * 1', handler)
 */
export const schedule = empire.schedule
