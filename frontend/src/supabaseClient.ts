// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Remove any forced JSON header on the PKCE exchange endpoint
const safeFetch: typeof fetch = (input, init = {}) => {
  // normalize URL string
  const url =
    typeof input === 'string'
      ? input
      : (input as Request)?.url ?? String(input);

  // Only adjust the PKCE token exchange request
  if (url.includes('/auth/v1/token') && url.includes('grant_type=pkce')) {
    const headers = new Headers(init.headers || {});
    // This header breaks PKCE; the SDK sets correct headers/body itself
    headers.delete('content-type');
    headers.delete('Content-Type');

    // IMPORTANT: do not stringify bodies here; let the SDK send its own body
    return fetch(input, { ...init, headers });
  }

  return fetch(input, init);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: safeFetch },   // 👈 apply the safe fetch
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});

// Make it available in DevTools for quick tests
// (remove later if you want)
;(window as any).supabase = supabase;
