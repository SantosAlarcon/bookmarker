import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"
import AuthLayout from "./layout"
import styles from "@/styles/page.module.css"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import type {GetStaticProps} from "next"

type Props = {
    locale: string
}

const LoginPage = () => {
    
	return (
		<AuthLayout>
			<main className={styles.main}>
				<LoginComponent />
			</main>
		</AuthLayout>
	)
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
    // @ts-ignore
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'login-page',
    ])),
  },
})


export default LoginPage
