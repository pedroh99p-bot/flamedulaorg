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
      console.info("Integração de formulários não configurada. A landing seguirá com envio local seguro.");
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
