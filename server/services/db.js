import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Fail early if environment variables aren't loaded correctly
if (!supabaseUrl || !supabaseKey) {
  throw new Error('CRITICAL: SUPABASE_URL or SUPABASE_KEY is missing from your .env file.');
}

// Initialize the single Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;