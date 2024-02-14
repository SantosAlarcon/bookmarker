import { NextApiRequest, NextApiResponse } from "next"
import getAllBookmarks from "@/app/utils/supabase/bookmarks/getAllBookmarks";
import { createClient } from "@/app/utils/supabase/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "You need to provide an access token to access this resource." });
	}

	// GET Method - Call the getAllBookmarks function
	if (req.method === "GET") {
		const userId: string | string[] | undefined = req.query.user

		// If there is a ID in the URL params, it get the bookmarks of the user containing that id and return them.
		if (userId) {
			const data = await getAllBookmarks(userId);
			return res.status(200).json(data)
		} else {
			return res.status(400).json({
				message: "ID is required to retrieve bookmark data",
			})
		}

	}
}
