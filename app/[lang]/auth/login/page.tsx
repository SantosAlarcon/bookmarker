import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent";
import styles from "@/styles/page.module.css";

const LoginPage = ({ params: { lang } }: { params: { lang: string } }) => {
    return (
        <main className={styles.main}>
            <LoginComponent lang={lang} />
        </main>
    );
};

export default LoginPage;
