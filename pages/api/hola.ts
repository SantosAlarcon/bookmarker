import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    return res.status(200).json({message: "Holiiiiiiiiiiiiiiiiiii!!!!!"})
}
