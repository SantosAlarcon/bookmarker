import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

// Import mock data from the JSON file as array with objects
import data from "../../../mock/mockData.json"

/* This function modifies the mockData.json file and applies tabulation to make it readable. */
const saveMockDataJSON = (data: object) => {
	fs.writeFile(
		"./mock/mockData.json",
		JSON.stringify(data, null, "\t"),
		{ encoding: "utf-8" },
		(err) => {
			if (err) {
				throw new Error("Failed to write mock data JSON")
			} else {
				console.log("Mock data file has been modified!")
			}
		}
	)
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// GET Method - Read from mockData.json file
	if (req.method === "GET") {
		// Sort query param
		const query = req.query.sort

		if (query === "yes") {
			// Sort list alfabettically
			const sortedData = [...data].sort((a, b) =>
				a.title.localeCompare(b.title)
			)

			// Sort folder children
			sortedData.forEach((item) => {
				item.children?.sort((a, b) => a.title.localeCompare(b.title))
			})

			// Sort folder first and then bookmarks
			sortedData.sort((a, b) => {
				if ("children" in a && "parentFolder" in b) return -1
				return 0
			})

			// Save sorted data to JSON
			saveMockDataJSON(sortedData)
			return res.status(200).json(sortedData)
		}

		return res.status(200).json(data)
	}

	// POST Method - Create new bookmark
	if (req.method === "POST") {
		const newItem = req.body
		let newData = []

		if ("id" in newItem) {
			// Get the parentFolder
			const parentFolder = newItem.parentFolder

			// If parentFolder is null, the object will be inserted at the end of the array
			if (parentFolder === "null" || parentFolder === null) {
				newData = [...data, newItem]
			} else {
				/* If it has a parentFolder id, it copies the array, then finds the folder with that id,
								and push the item into the children. */
				newData = [...data]
				// @ts-ignore
				newData.find((item) => parentFolder === item.id)?.children.push(newItem)
			}

			saveMockDataJSON(newData)
			return res.status(201).json(newItem)
		}

		return res.status(400).json({
			message: "Data body required for creation",
		})
	}	
}
