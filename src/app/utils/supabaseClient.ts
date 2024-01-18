import {SupabaseClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

// @ts-ignore
const supabaseClient: SupabaseClient = new SupabaseClient(supabaseUrl, supabaseKey)

export default supabaseClient
