import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return Response.json({ message: "No session found" }, { status: 400 });
    }

    return Response.json(session, { status: 200 });
}
