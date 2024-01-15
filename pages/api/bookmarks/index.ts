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
        let newData = [];

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
                newData.find(item => parentFolder === item.id)?.children.push(newItem)
            }

			saveMockDataJSON(newData)
			return res.status(201).json(newItem)
		}

		return res.status(400).json({
			message: "Data body required for creation",
		})
	}

	// DELETE Method - Delete existing bookmark
	if (req.method === "DELETE") {
		const id = req.body?.id

		if (id) {
			const newData = [...data].filter((item) => item.id !== id)
			saveMockDataJSON(newData)

			return res.status(200).json({
				message: "Item succesfully deleted",
			})
		} else {
			return res.status(400).json({
				message: "ID is required to delete an item",
			})
		}
	}

	// PUT Method - Update existing bookmark
	if (req.method === "PUT") {
		const id = req.body.id
		const updatedBookmark = req.body

		if (id) {
			let newData = [...data]

            // If parentFolder is null, the object will be inserted at the end of the array
            if (updatedBookmark.parentFolder === "null" || updatedBookmark.parentFolder === null) {
                newData[newData.findIndex((element) => element.id === id)] = updatedBookmark
            } else {
                /* If it has a parentFolder id, it filters/delete the old bookmarks, then finds the folder
                 * with that id, and push the item into the children. */
                newData.filter(item => item.id !== id)
                newData.find(item => updatedBookmark.parentFolder === item.id)?.children.push(updatedBookmark)
            }

			saveMockDataJSON(newData)
			return res.status(200).json({
				message: "Item updated successfully! :)",
			})
		} else {
			return res.status(400).json({
				message: "ID is required to delete an item",
			})
		}
	}
}
