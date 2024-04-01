import RegisterComponent from "@/components/Auth/RegisterComponent/RegisterComponent"
import AuthLayout from "./layout"
import styles from "@/app/page.module.css"
import {appWithTranslation} from "next-i18next"

const RegisterPage = () => {
    return (
        <AuthLayout>
            <main className={styles.main}>
                <RegisterComponent />
            </main>
        </AuthLayout>
    )
}

export default appWithTranslation(RegisterPage)
