import styles from "./page.module.css"
import Header from "@/components/Header/Header"
import BookmarksView from "@/components/BookmarksView/BookmarksView"
import { createClient } from "@/app/utils/supabase/server"
import { redirect } from "next/navigation"
import { SupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export default async function Home() {
    const supabase: SupabaseClient = createClient(cookies())
    const {data} = await supabase.auth?.getSession();
    
    if (!data.session) {
        redirect("/auth/login")
    }

    return (
        <div className={styles.main}>
            <Header />
            <BookmarksView />
        </div>
    )
}
