"use server"

import { authStore } from "@/app/store/authStore";
import supabaseClient from "./supabaseClient";
const setSession = authStore.getState().setSession

export const loginWithEmail = async (email: string, password: string) => {
	await supabaseClient.auth.signInWithPassword({ email, password }).then((data, error) => setSession({session: data.session})).catch(() => console.error(error));
};
