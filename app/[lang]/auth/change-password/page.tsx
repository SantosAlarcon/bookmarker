import ChangePasswordComponent from "@/app/components/Auth/ChangePasswordComponent/ChangePasswordComponent";
import styles from "@/styles/page.module.css";
import { use } from "react";

const RegisterPage = (props: { params: Promise<{ lang: string }> }) => {
	const params = use(props.params);
	const { lang } = params;

	return (
		<main className={styles.main}>
			<ChangePasswordComponent lang={lang} />
		</main>
	);
};

export default RegisterPage;
