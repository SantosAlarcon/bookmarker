import ResetPassword from "@/components/Auth/ResetPassword/ResetPassword";
import { authStore } from "@/store/authStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { redirect } from "next/navigation";
import type { GetStaticProps } from "next";
import styles from "@/styles/page.module.css";
import ResetPasswordLayout from "./layout";

type Props = {
    locale: string;
};

const ResetPasswordPage = () => {
    //const supabase = createServerComponentClient({ cookies })
    const session = authStore((state) => state.session);

    if (session) {
        redirect("/");
    }

    return (
        <ResetPasswordLayout>
            <main className={styles.main}>
                <ResetPassword />
            </main>
        </ResetPasswordLayout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({
    locale,
    // @ts-ignore
}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "en", ["reset-password"])),
    },
});

export default ResetPasswordPage;
