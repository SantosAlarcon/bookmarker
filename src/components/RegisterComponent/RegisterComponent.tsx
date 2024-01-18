//import "./Register.module.css"
import { useState, useEffect } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import supabaseClient from "@/app/utils/supabaseClient"

const RegisterComponent = () => {
	const [session, setSession] = useState(null)

	useEffect(() => {
		// @ts-ignore
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		const {
			data: { subscription },
			// @ts-ignore
		} = supabaseClient.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	if (!session) {
		return (
			<Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
		)
	} else {
		return <div>Logged in!</div>
	}
}

export default RegisterComponent
