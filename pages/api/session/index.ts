import {createClient} from "@/app/utils/supabase/server2";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createClient();
    const {data: {session}} = await supabase.auth.getSession();

    if (!session) return res.status(400).json({message: "Failed to retrieve session data"})

    return res.status(200).json(session)
}
