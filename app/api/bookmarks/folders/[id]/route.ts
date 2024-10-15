import data from "../../../../../mock/mockData.json";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

/* This function modifies the mockData.json file and applies tabulation to make it readable. */
const saveMockDataJSON = (data: object) => {
    fs.writeFile(
        "./mock/mockData.json",
        JSON.stringify(data, null, "\t"),
        { encoding: "utf-8" },
        (err) => {
            if (err) {
                throw new Error("Failed to write mock data JSON");
            } else {
                console.log("Mock data file has been modified!");
            }
        },
    );
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "GET") {
        if (id) {
            if (!data.find((folder) => folder.id === id)) {
                return res
                    .status(404)
                    .json({ message: "Folder not found! :()" });
            }
            return res
                .status(200)
                .json(data.find((folder) => folder.id === id));
        } else {
            return res
                .status(400)
                .json({ message: "ID is required to get folder" });
        }
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        if (id) {
            if (!data.find((folder) => folder.id === id)) {
                return res.status(404).json({ message: "Folder not found" });
            } else {
                const newData = [...data].filter((item) => item.id !== id);
                saveMockDataJSON(newData);
                return res.status(202).json({ message: "Folder deleted" });
            }
        } else {
            return res
                .status(400)
                .json({ message: "ID is required to delete the folder" });
        }
    }

    if (req.method === "PUT") {
        const id = req.query.id;
        const updatedFolder = req.body;
        const newData = [...data];

        if (id && "id" in updatedFolder) {
            newData[newData.findIndex((item) => item.id === id)] =
                updatedFolder;
            saveMockDataJSON(newData);
            return res.status(201).json(updatedFolder);
        } else {
            return res.status(400).json({
                message: "You must provide an id and a body to update.",
            });
        }
    }
}
