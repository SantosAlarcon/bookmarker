import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"
import AuthLayout from "./layout"
import styles from "@/app/page.module.css"
import {appWithTranslation} from "next-i18next"

const LoginPage = () => {
    return (
        <AuthLayout>
            <main className={styles.main}>
                <LoginComponent />
            </main>
        </AuthLayout>
    )
}

export default appWithTranslation(LoginPage)
