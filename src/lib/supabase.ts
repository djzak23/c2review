import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Create a dummy client if credentials are missing
let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. Please connect to Supabase in the Tempo platform.",
  );
  // Create a mock client to prevent runtime errors
  supabaseClient = {
    from: () => ({
      select: () => ({
        data: null,
        error: new Error("Supabase not configured"),
      }),
      insert: () => ({
        data: null,
        error: new Error("Supabase not configured"),
      }),
      update: () => ({
        data: null,
        error: new Error("Supabase not configured"),
      }),
      delete: () => ({
        data: null,
        error: new Error("Supabase not configured"),
      }),
    }),
    auth: {
      getUser: () =>
        Promise.resolve({
          data: { user: null },
          error: new Error("Supabase not configured"),
        }),
      signIn: () =>
        Promise.resolve({
          data: null,
          error: new Error("Supabase not configured"),
        }),
      signOut: () => Promise.resolve({ error: null }),
    },
  };
} else {
  // Only create the real client if we have credentials
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
