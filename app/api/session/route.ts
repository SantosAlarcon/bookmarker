import { createClient } from "@/app/utils/supabase/server";
import type { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    const supabase = await createClient()

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (!session) {
        return Response.json({ message: "No session found" }, { status: 400 });
    }

    return Response.json(session, { status: 200 });
}
