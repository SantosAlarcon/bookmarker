import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"
import AuthLayout from "./layout"
import styles from "@/app/page.module.css"
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
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'login-page',
    ])),
  },
})


export default LoginPage
