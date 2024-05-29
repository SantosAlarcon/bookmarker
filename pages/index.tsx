import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createClient } from "@/app/utils/supabase/client";
import { useEffect } from "react";

type Props = () => {
    locale: string
}

export const getStaticProps: GetStaticProps<Props> = async ({
	locale,
	// @ts-ignore
}) => ({
	props: {
		...(await serverSideTranslations(locale ?? "en", ["common", "header"])),
	},
});

function Home() {
	/*const supabase: SupabaseClient = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

    console.log("Renderizando la raiz de pages...")

    useEffect(() => {
        if (!session) {
            redirect("/auth/login");
        }
    }, [])*/

	return (
		<div className={styles.main}>
			<Header />
            <BookmarksView />
		</div>
	);
}

export default Home;
