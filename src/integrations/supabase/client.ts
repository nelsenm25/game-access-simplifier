// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fxycdpfulnyolxemlvrl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eWNkcGZ1bG55b2x4ZW1sdnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjU4MDgsImV4cCI6MjA1MzM0MTgwOH0.YNIBOFu-3MsS5psVpTNNIjF2HW9qwAWn3b8qCJrnILM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);