"use server"

import { cookies } from "next/headers"

export const getCookie = async (key: string) => {
    const cookieList = cookies();
    return cookieList.get(key)?.value;
}
