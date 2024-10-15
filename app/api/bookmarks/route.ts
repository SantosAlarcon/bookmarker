import { NextApiRequest, NextApiResponse } from "next";
import getAllBookmarks from "@/app/utils/supabase/bookmarks/getAllBookmarks";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization;

    if (!token) {
        return Response.json({
            message:
                "You need to provide an access token to access this resource.",
            status: 401,
        });
    }

    const userId: string | string[] | undefined = req.query.user;

    // If there is a ID in the URL params, it get the bookmarks of the user containing that id and return them.
    if (userId) {
        const data = await getAllBookmarks(userId);
        return Response.json(data, { status: 200 });
    } else {
        return Response.json({
            message: "ID is required to retrieve bookmark data",
            status: 400,
        });
    }
}
