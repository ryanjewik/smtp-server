// src/lib/exchangeCode.ts
import { supabase } from '../supabaseClient';

export async function exchangeCode(code: string) {
  // Supabase v2 helper does the PKCE exchange correctly
  return await supabase.auth.exchangeCodeForSession(code);
}
