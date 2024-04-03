import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"
import AuthLayout from "./layout"
import styles from "@/app/page.module.css"
import { appWithI18Next } from "ni18n"
import { ni18nConfig } from "../../../ni18n.config"

const LoginPage = () => {
  return (
    <AuthLayout>
      <main className={styles.main}>
        <LoginComponent />
      </main>
    </AuthLayout>
  )
}

export default appWithI18Next(LoginPage, ni18nConfig);
