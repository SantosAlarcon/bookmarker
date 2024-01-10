import { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import fs from "fs"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const filePath: string = path.join(process.cwd(), "mock/mockData.json")
	fs.readFile(filePath, { encoding: "utf8" }, (error, data) => {
		if (error) {
			return res.status(400).json({
				message: "Error al obtener los marcadores",
			})
		}

		return res.status(200).json(JSON.parse(data))
	})

	if (req.method === "POST") {
		const newBookmark = req.body
	}
}
