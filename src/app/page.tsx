import styles from "./page.module.css"
import Header from "@/components/Header/Header"
import BookmarksView from "@/components/BookmarksView/BookmarksView"
import { createClient } from "@/app/utils/supabase/client"
import { redirect } from "next/navigation"
import { SupabaseClient } from "@supabase/supabase-js"

export default async function Home() {
    const supabase: SupabaseClient = createClient()
    const {data} = await supabase.auth?.getSession();
    
    console.log("SESION: ", data)

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
