import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import { redirect } from "next/navigation";
import AuthSync from "../components/Auth/AuthSync";
import { createClient } from "../utils/supabase/server";

async function Home() {
    const { data: { session }} = await createClient().auth.getSession();

    // It only renders the main page if there is no session
    if (!session) { return redirect("/auth/login"); }

    return (
        <div className={styles.main}>
            <AuthSync sessionState={session} />
            <Header />
            <BookmarksView />
        </div>
    );
}

export default Home;

