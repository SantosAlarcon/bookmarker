import supabaseClient from "@/app/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(res: NextApiResponse, req: NextApiRequest) {
    //const userData = await supabaseClient.auth.getSession()
    
    switch (req.method) {
        case "GET":
            return res.status(200).json("(owo)");
    
    }    
}
