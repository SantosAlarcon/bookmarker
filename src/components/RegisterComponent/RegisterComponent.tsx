import { Auth } from "@supabase/auth-ui-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import supabaseClient from "@/app/utils/supabaseClient"

const RegisterComponent = () => {
	const supabase = createClientComponentClient()
	const customTheme = {
		default: {
			colors: {
				brand: "hsl(153 60.0% 53.0%)",
				brandAccent: "hsl(154 54.8% 45.1%)",
				brandButtonText: "white",
				// ..
			},
		},
		dark: {
			colors: {
				brandButtonText: "white",
				defaultButtonBackground: "#2e2e2e",
				defaultButtonBackgroundHover: "#3e3e3e",
				//..
			},
			space: {
				spaceSmall: "4px",
				spaceMedium: "8px",
				spaceLarge: "16px",
				labelBottomMargin: "8px",
				anchorBottomMargin: "4px",
				emailInputSpacing: "4px",
				socialAuthSpacing: "4px",
				buttonPadding: "10px 15px",
				inputPadding: "10px 15px",
			},
			borderWidths: {
				buttonBorderWidth: "1px",
				inputBorderWidth: "1px",
			},
			radii: {
				borderRadiusButton: "1rem",
				buttonBorderRadius: "1rem",
				inputBorderRadius: "1rem",
			},
		},
	}

	return (
		<Auth
			supabaseClient={supabaseClient}
			appearance={{ theme: customTheme }}
			theme="dark"
			showLinks={false}
			providers={["google", "github", "facebook"]}
		/>
	)
}

export default RegisterComponent
