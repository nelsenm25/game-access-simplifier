import { createClient } from '@supabase/supabase-js';

const SUPABASEURL = '';
const SUPABASEANONKEY = '';

export const supabase = createClient(SUPABASEURL, SUPABASEANONKEY);