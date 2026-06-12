import { createClient } from "@supabase/supabase-js";

let cachedClient;
let warned = false;

export function getSupabaseClient() {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (!warned) {
      console.info("Supabase não configurado. A landing continuará em modo fallback visual.");
      warned = true;
    }
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return cachedClient;
}
