"use server"

// This function creates a new user with the email and password

import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import { revalidatePath } from "next/cache"

export const signUpWithEmail = async (email: string, password: string) => {
    const {data, error} = await createClient().auth.signUp({email, password})

    console.log("DATA: ", data);

    revalidatePath("/", "layout");
    redirect("/")
}
