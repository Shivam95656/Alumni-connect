import { createClient } from '@supabase/supabase-js';

let supabase;

export const initializeSupabase = () => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing Supabase URL or KEY in environment variables');
  }

  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log('Supabase initialized successfully');
};

export const getSupabaseClient = () => supabase;
