import { createContext, useContext } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from '../utils/supabase/client';

interface SupabaseContextType {
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Get the singleton instance once at module level
const supabaseInstance = getSupabaseClient();

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseContext.Provider value={{ supabase: supabaseInstance }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase(): SupabaseContextType {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}