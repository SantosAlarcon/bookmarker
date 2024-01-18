//import "./RegisterComponent.module.css"
import { useState, useEffect } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import supabaseClient from "@/app/utils/supabaseClient"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const RegisterComponent = () => {
	const supabase = createClientComponentClient()

    return (
    <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{theme: ThemeSupa}}
            theme="dark"
            showLinks={false}
            providers={["google", "github", "facebook"]}
        />
    )

}

export default RegisterComponent
