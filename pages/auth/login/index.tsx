import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"
import AuthLayout from "./layout"
import styles from "@/app/page.module.css"
import { I18nextProvider } from "react-i18next"
import { i18n } from "next-i18next"

const LoginPage = () => {
    return (
	<I18nextProvider i18n={i18n}>
	    <AuthLayout>
		<main className={styles.main}>
		    <LoginComponent />
		</main>
	    </AuthLayout>
	</I18nextProvider>
    )
}

export default LoginPage
