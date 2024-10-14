import {createClient} from "@/app/utils/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createClient();
    const {data: {session}} = await supabase.auth.getSession();

    if (!session) return Response.json({message: "No session found"}, {status: 400});

    return Response.json(session, {status: 200});
}
