"use server"

import supabaseClient from "./supabaseClient";

export const loginWithEmail = async (email: string, password: string) => {
	await supabaseClient.auth.signInWithPassword({ email, password });
};
