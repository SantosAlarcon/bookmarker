import { createClient } from "@/app/utils/supabase/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return Response.json({ message: "No session found" }, { status: 400 });
    }

    // Only expose safe user fields — never tokens
    return Response.json(
        {
            user: {
                id: session.user.id,
                email: session.user.email,
                metadata: session.user.user_metadata,
            },
        },
        { status: 200 },
    );
}
