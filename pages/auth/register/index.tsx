import RegisterComponent from "@/components/Auth/RegisterComponent/RegisterComponent"
import AuthLayout from "./layout"
import styles from "@/app/page.module.css"

const RegisterPage = () => {
    return (
        <AuthLayout>
            <main className={styles.main}>
                <RegisterComponent />
            </main>
        </AuthLayout>
    )
}

export default RegisterPage
