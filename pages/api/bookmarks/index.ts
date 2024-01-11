import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

// Import mock data from the JSON file as array with objects
import data from "../../../mock/mockData.json"

/* This function modifies the mockData.json file and applies tabulation to make it readable. */
const saveMockDataJSON = (data: object) => {
  fs.writeFile(
    "./mock/mockData.json",
    JSON.stringify(data, null, '\t'),
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
    return res.status(200).json(data)
  }

  // POST Method - Create new bookmark
  if (req.method === "POST") {
    const newItem = req.body

    if ("id" in newItem) {
      const newData = [...data, newItem]
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
        newData[newData.findIndex((element) => element.id === id)] = updatedBookmark
        saveMockDataJSON(newData);
        return res.status(200).json({
                message: "Item updated successfully! :)"
            })
    } else {
      return res.status(400).json({
        message: "ID is required to delete an item",
      })
    }
  }
}
