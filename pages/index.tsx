import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "@/app/utils/supabase/useSession";
import type { Session } from "@supabase/supabase-js";

type Props = () => {
    locale: string
}

function Home() {
	const session: Session | null = useSession()

    // It only renders the main page if there is no session
    if (!session) return null

	return (
		<div className={styles.main}>
			<Header />
            <BookmarksView />
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async ({
	locale,
	// @ts-ignore
}) => ({
	props: {
		...(await serverSideTranslations(locale ?? "en", ["common", "header"])),
	},
});


export default Home;
