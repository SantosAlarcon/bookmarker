import RegisterComponent from "@/components/Auth/RegisterComponent/RegisterComponent";
import AuthLayout from "./layout";
import styles from "@/styles/page.module.css";
import { use } from "react";

const RegisterPage = (props: {params: Promise<{lang: string}>}) => {
    const params = use(props.params);
    const { lang } = params;

    return (
        <AuthLayout>
            <main className={styles.main}>
                <RegisterComponent lang={lang} />
            </main>
        </AuthLayout>
    );
};

export default RegisterPage;
