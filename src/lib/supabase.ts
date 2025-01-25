import { createClient } from '@supabase/supabase-js';

const SUPABASEURL = 'SUPABASEURL';
const SUPABASEANONKEY = 'SUPABASEANONKEY'; // Your anon key here

export const supabase = createClient(SUPABASEURL, SUPABASEANONKEY);
