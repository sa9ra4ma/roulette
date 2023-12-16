import { createClient } from '@supabase/supabase-js'
import { SUPABASE_API_URL, SUPABASE_API_KEY } from '$env/static/private'

export const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY)