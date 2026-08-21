import { redirect } from "next/navigation";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import Header from "@/components/Header/Header";
import styles from "@/styles/page.module.css";
import AuthSync from "../components/Auth/AuthSync";
import LocaleSync from "../components/LocaleSync";
import { createClient } from "../utils/supabase/server";

async function Home(props: { params: Promise<{ lang: string }> }) {
	const params = await props.params;

	const { lang } = params;

	const supabase = await createClient();

	// getUser() validates the JWT with Supabase — never trust getSession() alone for auth checks
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// It only renders the main page if there is no verified session
	if (!user) {
		return redirect("/auth/login");
	}

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<div className={styles.main}>
			{/* @ts-ignore */}
			<AuthSync sessionState={{ session: session }} />
			<LocaleSync localeState={{ locale: params.lang }} />
			<Header lang={lang} />
			<BookmarksView />
		</div>
	);
}

export default Home;
