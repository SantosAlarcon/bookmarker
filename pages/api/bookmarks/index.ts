import { NextApiRequest, NextApiResponse } from "next"
import getAllBookmarks from "@/app/utils/supabase/bookmarks/getAllBookmarks";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "You need to provide an access token to access this resource." });
	}

	// GET Method - Read from mockData.json file
	if (req.method === "GET") {
		const userId: string | undefined = req.query.user
        
        // If there is a ID in the URL params, it get the bookmarks of the user containing that id and return them.
		if (userId) {
			const data = await getAllBookmarks(userId);
			// Sort query param
			const query = req.query.sort

			/*if (query === "yes") {
				// Sort list alfabettically
				const sortedData = [...data].sort((a, b) =>
					a.title.localeCompare(b.title)
				)

				// Sort folder children
				sortedData.forEach((item) => {
					// @ts-ignore
					item.children?.sort((a, b) => a.title.localeCompare(b.title))
				})

				// Sort folder first and then bookmarks
				sortedData.sort((a, b) => {
					if ("children" in a && "parentFolder" in b) return -1
					return 0
				})

				// Save sorted data to JSON
				return res.status(200).json(sortedData)
			}*/
			return res.status(200).json(data)
		} else {
			return res.status(400).json({
				message: "ID is required to retrieve bookmark data",
			})
		}

	}
}
