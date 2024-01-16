import { NextApiRequest, NextApiResponse } from "next"
import data from "../../../../mock/mockData.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const folderList = [...data].filter((item) => "children" in item)
		return res.status(200).json(folderList)
	}

	if (req.method === "POST") {
		const newFolder = req.body

		if (newFolder) {
			data.push(newFolder)
			return res.status(201).json(newFolder)
		} else {
			return res
				.status(400)
				.json({ message: "You must provide body data to insert." })
		}
	}	
}
