import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../../mock/mockData.json";

export function GET(req: NextApiRequest, res: NextApiResponse) {
    const folderList = [...data].filter((item) => "children" in item);
    return Response.json(folderList, { status: 200 });
}

export function POST(req: NextApiRequest, res: NextApiResponse) {
    const newFolder = req.body;

    if (newFolder) {
        data.push(newFolder);
        return Response.json(newFolder, { status: 201 });
    } else {
        return Response.json(
            { message: "You must provide body data to insert." },
            { status: 400 },
        );
    }
}
