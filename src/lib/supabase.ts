import { createClient } from '@supabase/supabase-js';

const SUPABASEURL = 'https://xyzcompany.supabase.co';
const SUPABASEANONKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your anon key here

export const supabase = createClient(SUPABASEURL, SUPABASEANONKEY);