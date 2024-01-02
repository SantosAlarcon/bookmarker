import { NextApiRequest, NextApiResponse } from "next";
import path from "path"
import fsPromises from "fs/promises"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath: string = path.join(process.cwd(), "mock/mockData.json");
    const jsonData: Buffer = await fsPromises.readFile(filePath);
    const response = JSON.parse(jsonData);

    if (response) {
        return res.status(200).json(response);
    }

    return res.status(400).json({
        message: "Error al obtener los marcadores"
    })

}
