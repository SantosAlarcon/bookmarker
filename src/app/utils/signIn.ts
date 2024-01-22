import supabaseClient from "./supabaseClient";

// These functions are used to sign in the user depending of the provider

export const signInWithGoogle = async () => {
	// Call the sign in function to sign in the user
	await supabaseClient.auth.signInWithOAuth({
		provider: "google",
		options: {
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			}
		}
	});
}

export const signInWithGitHub = async () => {
	// Call the sign in function to sign in the user
	await supabaseClient.auth.signInWithOAuth({
		provider: "github",
		options: {
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			}
		}
	});
}

export const signInWithFacebook = async () => {
	// Call the sign in function to sign in the user
	await supabaseClient.auth.signInWithOAuth({
		provider: "facebook",
		options: {
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			}
		}
	});
}

export const signInWithEmail = async(email: string, password: string) => {
	// Call the sign in function to sign in the user
	await supabaseClient.auth.signInWithPassword({
		email: email,
		password: password
	});
}
