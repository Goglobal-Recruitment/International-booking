import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client instance
let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseInstance) {
    console.log('Creating new Supabase client instance'); // Debug log
    supabaseInstance = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storageKey: 'sb-booking-auth-token' // Use a unique storage key
        }
      }
    );
  }
  return supabaseInstance;
};

// Clear instance for testing/debugging
export const clearSupabaseInstance = () => {
  supabaseInstance = null;
};