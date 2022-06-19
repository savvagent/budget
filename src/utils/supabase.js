import { createClient } from '@supabase/supabase-js'

const publicKey = import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// Create a single supabase client for interacting with your database 
const supabase = createClient(supabaseUrl, publicKey)

export default supabase
