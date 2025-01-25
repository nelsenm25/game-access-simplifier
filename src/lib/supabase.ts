import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxycdpfulnyolxemlvrl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eWNkcGZ1bG55b2x4ZW1sdnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NjU4MDgsImV4cCI6MjA1MzM0MTgwOH0.YNIBOFu-3MsS5psVpTNNIjF2HW9qwAWn3b8qCJrnILM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
