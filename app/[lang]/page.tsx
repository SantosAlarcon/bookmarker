import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import { redirect } from "next/navigation";
import supabaseClient from "../utils/supabase/supabaseClient";

async function Home() {
    const { data: { session }} = await supabaseClient.auth.getSession();

    console.log(session)

    // It only renders the main page if there is no session
    if (!session) { return redirect("/auth/login"); }

    return (
        <div className={styles.main}>
            <Header />
            <BookmarksView />
        </div>
    );
}

export default Home;

