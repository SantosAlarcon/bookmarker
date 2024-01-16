import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

// Import mock data from the JSON file as array with objects
import data from "../../../../mock/mockData.json"

/* This function modifies the mockData.json file and applies tabulation to make it readable. */
const saveMockDataJSON = async (data: object) => {
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
		const id = req.query.id
		if (id) {
			let bookmarkResult = data.find((item) => item.id === id)
		
			// If the bookmarkResult is undefined, it will search in the children
			if (bookmarkResult === undefined) {
			    data.forEach((item) => {
			        if (item.children) {
			            item.children.forEach((child) => {
			                if (child.id === id) {
					    // @ts-ignore
			                    bookmarkResult = child
			                }
			            })
			        }
			    })
			}

			return res.status(200).json(bookmarkResult)
		}
		return res.status(400).json({
			message: "Data ID required to retrieve bookmark data",
		})
	}

	// DELETE Method - Delete existing bookmark
	if (req.method === "DELETE") {
		const id = req.query.id

		if (id) {
			const newData = [...data].filter((item) => item.id !== id)
			await saveMockDataJSON(newData)

			return res.status(202).json({
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
		const id = req.query.id
		const updatedBookmark = req?.body

		if (id && updatedBookmark) {
			let newData = [...data]

			// If parentFolder is null, the object will be inserted at the end of the array
			if (
				updatedBookmark.parentFolder === "null" ||
				updatedBookmark.parentFolder === null
			) {
				newData[newData.findIndex((element) => element.id === id)] =
					updatedBookmark
			} else {
				/* If it has a parentFolder id, it filters/delete the old bookmark, then finds the folder
				 * with that id, and push the item into the children. */
				newData = [...data].filter((item) => item.id !== id)
				// @ts-ignore
				newData
					.find((item) => updatedBookmark.parentFolder === item.id)
					?.children.push(updatedBookmark)
			}

			await saveMockDataJSON(newData)
			return res.status(201).json({
				message: "Item updated successfully! :)",
			})
		} else {
			return res.status(400).json({
				message: "ID and body are required to delete an item",
			})
		}
	}
}
