import ResetPassword from "@/components/Auth/ResetPassword/ResetPassword";
import { authStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import styles from "@/styles/page.module.css";

const ResetPasswordPage = ({params: {lang}}: {params: {lang: string}}) => {
    const { session } = authStore.getState();

    if (session) {
        redirect("/");
    }

    return (
            <main className={styles.main}>
                <ResetPassword lang={lang} />
            </main>
    );
};

export default ResetPasswordPage;
