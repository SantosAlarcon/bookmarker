import ResetPassword from "@/components/Auth/ResetPassword/ResetPassword"
import { authStore } from "@/store/authStore"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { redirect } from "next/navigation"
import type {GetStaticProps} from 'next'
import styles from "@/app/page.module.css" 

type Props = {
	locale: string
}

const ResetPasswordPage = () => {
	//const supabase = createServerComponentClient({ cookies })
	const session = authStore(state => state.session)

	if (session) {
		redirect("/")
	}

	return (
		<main className={styles.main}>
			<ResetPassword />
		</main>
	)
}

export const getStaticProps: GetStaticProps<Props> = async ({
  locale,
    // @ts-ignore
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'reset-password',
    ])),
  },
})

export default ResetPasswordPage
