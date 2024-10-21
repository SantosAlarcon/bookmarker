import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import { redirect } from "next/navigation";
import AuthSync from "../components/Auth/AuthSync";
import { createClient } from "../utils/supabase/server";
import LocaleSync from "../components/LocaleSync";

async function Home({params: {lang}}: {params: {lang: string}}) {
    const { data: { session }} = await createClient().auth.getSession();

    // @ts-ignore

    // It only renders the main page if there is no session
    if (!session) { return redirect("/auth/login"); }

    return (
        <div className={styles.main}>
            <AuthSync sessionState={session} />
            <LocaleSync localeState={{locale: lang}} />
            <Header lang={lang} />
            <BookmarksView lang={lang} />
        </div>
    );
}

export default Home;

