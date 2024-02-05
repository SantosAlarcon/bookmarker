import AuthLayout from "./layout"
import styles from "@/app/page.module.css"
import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"

const RegisterPage = () => {
    return (
        <AuthLayout>
            <main className={styles.main}>
                <LoginComponent />
            </main>
        </AuthLayout>
    )
}

export default RegisterPage
