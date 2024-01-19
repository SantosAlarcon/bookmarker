import supabaseClient from "@/app/utils/supabaseClient"
import Header from "@/components/Header/Header"
import RegisterComponent from "@/components/RegisterComponent/RegisterComponent"
import styles from "@/app/page.module.css"

// Register this immediately after calling createClient!
// Because signInWithOAuth causes a redirect, you need to fetch the
// provider tokens from the callback.

supabaseClient.auth.onAuthStateChange((event, session) => {
	console.log(session)

	if (session && session.provider_token) {
		window.localStorage.setItem('oauth_provider_token', session.provider_token)
	}

	if (session && session.provider_refresh_token) {
		window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
	}

	if (event === 'SIGNED_OUT') {
		window.localStorage.removeItem('oauth_provider_token')
		window.localStorage.removeItem('oauth_provider_refresh_token')
		console.log("Logged out")
	}
})

const RegisterPage = () => {
	return (
		<main className={styles.main}>
		    <RegisterComponent />
		</main>
	)
}

export default RegisterPage
