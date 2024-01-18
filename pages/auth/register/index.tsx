import supabaseClient from "@/app/utils/supabaseClient"
import RegisterComponent from "@/components/RegisterComponent/RegisterComponent"

// Register this immediately after calling createClient!
// Because signInWithOAuth causes a redirect, you need to fetch the
// provider tokens from the callback.

supabaseClient.auth.onAuthStateChange((event, session) => {
	if (session && session.provider_token) {
		window.localStorage.setItem('oauth_provider_token', session.provider_token)
	}

	if (session && session.provider_refresh_token) {
		window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
	}

	if (event === 'SIGNED_OUT') {
		window.localStorage.removeItem('oauth_provider_token')
		window.localStorage.removeItem('oauth_provider_refresh_token')
	}
})

/*const { data, error } = supabaseClient.auth.signInWithOAuth({
	provider: 'google',
	options: {
		queryParams: {
			access_type: 'offline',
			prompt: 'consent',
		},
	},
})*/

const RegisterPage = () => {
	return (
		<RegisterComponent />
	)
}

export default RegisterPage
