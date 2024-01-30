import styles from "./page.module.css"
import Header from "@/components/Header/Header"
import BookmarksView from "@/components/BookmarksView/BookmarksView"
import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export default async function Home() {
    /*const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const user = await supabase.auth.getUser();
    const session = await supabase.auth.getSession();*/

    /*if (!session.data.session) {
        redirect("/auth/login")
    }*/

    return (
        <div className={styles.main}>
            <Header />
            <BookmarksView />
        </div>
    )
}
