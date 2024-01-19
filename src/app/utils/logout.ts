import supabaseClient from "./supabaseClient";

export const logout = async () => {
	// Call the sign out function to sign out the user
	await supabaseClient.auth.signOut({scope: "global"});
}
