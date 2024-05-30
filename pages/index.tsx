import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = () => {
    locale: string
}

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
            {/*<BookmarksView />*/}
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
