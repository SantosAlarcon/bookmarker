"use client"

import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent";
import styles from "@/styles/page.module.css";
import "@/app/i18n/client";

const LoginPage = ({ params: { lang } }: { params: { lang: string } }) => {
    return (
        <main className={styles.main}>
            <LoginComponent lang={lang} />
        </main>
    );
};

export default LoginPage;
