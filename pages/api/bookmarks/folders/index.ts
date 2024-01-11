import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../../mock/mockData.json"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const folderList = [...data].filter((item) => "children" in item)
    return res.status(200).json(folderList);
}
