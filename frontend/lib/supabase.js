import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let supabaseInstance = null
let instanceUrl = null

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Recreate if singleton was created before env vars were injected
  if (!supabaseInstance || instanceUrl !== url) {
    supabaseInstance = createSupabaseClient(url, key)
    instanceUrl = url
  }

  return supabaseInstance
}