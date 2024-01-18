import {SupabaseClient, createClient} from "@supabase/supabase-js";

// @ts-ignore
const supabaseClient: SupabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)
export default supabaseClient
