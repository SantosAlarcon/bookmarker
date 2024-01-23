import RegisterComponent from "@/components/RegisterComponent/RegisterComponent"
import styles from "@/app/page.module.css"
import { Toaster } from "sonner"

const RegisterPage = () => {
	return (
		<main className={styles.main}>
			<RegisterComponent />
			<Toaster position="top-center" richColors />
		</main>
	)
}

export default RegisterPage
