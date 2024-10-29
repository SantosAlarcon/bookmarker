"use client";
import { use } from "react";

import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent";
import styles from "@/styles/page.module.css";
import "@/app/i18n/client";

const LoginPage = (props: { params: Promise<{ lang: string }> }) => {
    const params = use(props.params);

    const { lang } = params;

    return (
        <main className={styles.main}>
            <LoginComponent lang={lang} />
        </main>
    );
};

export default LoginPage;
