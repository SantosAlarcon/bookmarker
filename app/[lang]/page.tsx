import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import { useSession } from "@/app/utils/supabase/useSession";
import type { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

function Home({ params: { lang } }: { params: { lang: string } }) {
	const session: Session | null = useSession()

	// It only renders the main page if there is no session
	if (!session) return redirect(`/login/${lang}`);

	return (
		<div className={styles.main}>
			<Header />
			<BookmarksView />
		</div>
	);
}

export default Home
