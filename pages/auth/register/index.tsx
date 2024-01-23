import RegisterComponent from "@/components/RegisterComponent/RegisterComponent"
import styles from "@/app/page.module.css"
import AuthLayout from "./layout"

const Home = () => {
    return (
        <AuthLayout>
            <main className={styles.main}>
                <RegisterComponent />
            </main>
        </AuthLayout>
    )
}

export default Home
