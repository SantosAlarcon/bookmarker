import styles from "@/styles/page.module.css";
import Header from "@/components/Header/Header";
import BookmarksView from "@/components/BookmarksView/BookmarksView";
import { redirect } from "next/navigation";
import AuthSync from "../components/Auth/AuthSync";
import LocaleSync from "../components/LocaleSync";
import { getSession } from "../utils/supabase/getSession";
import { createClient } from "../utils/supabase/server";

async function Home(props: {params: Promise<{lang: string}>}) {
    const params = await props.params;

    const {
        lang
    } = params;

    const supabase = await createClient();
    const { data: { session }} = await supabase.auth.getSession();

    // @ts-ignore

    // It only renders the main page if there is no session
    if (!session) { return redirect("/auth/login"); }

    return (
        <div className={styles.main}>
            <AuthSync sessionState={session} />
            <LocaleSync localeState={{locale: lang}} />
            <Header lang={lang} />
            <BookmarksView />
        </div>
    );
}

export default Home;

