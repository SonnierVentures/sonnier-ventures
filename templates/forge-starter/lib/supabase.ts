/**
 * Supabase clients for the Forge starter.
 *
 * - `supabaseServer`  — service role, for server actions and API routes
 * - `supabaseBrowser` — anon key, for client components
 *
 * Row-Level Security is enforced by default on all tables.
 * Never expose the service role key to the client.
 */

import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const svc  = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!url || !anon) {
  throw new Error('Supabase env vars missing — check .env.local')
}

/** Client-side Supabase instance (anon key, RLS enforced) */
export const supabaseBrowser = createClient(url, anon)

/** Server-side Supabase instance (service role, bypasses RLS — use carefully) */
export const supabaseServer = createClient(url, svc, {
  auth: { persistSession: false },
})
