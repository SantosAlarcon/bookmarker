"use server"

// This function creates a new user with the email and password
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from "./server"

export const signUpWithEmail = async (email: string, password: string) => {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.signUp({email: email, password: password})

    if (error) {
	return console.error(error)
    }

    console.log("DATA: ", data);

    revalidatePath("/", "layout");
    redirect("/")
}
