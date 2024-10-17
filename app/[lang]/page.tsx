import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import type { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { getSession } from "../utils/supabase/getSession";

async function Home({ params: { lang } }: { params: { lang: string } }) {
    const session: Session | null = await getSession();

    console.log(session)

    // It only renders the main page if there is no session
    if (!session) return redirect("/auth/login");

    return (
        <div className={styles.main}>
            <Header />
            <BookmarksView />
        </div>
    );
}

export default Home;

