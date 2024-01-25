"use server"
import AuthLayout from "./layout"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import styles from "@/app/page.module.css"
import LoginComponent from "@/components/Auth/LoginComponent/LoginComponent"

const RegisterPage = () => {
    /*const supabase = createServerComponentClient({cookies});
    const {data} = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }*/

    return (
        <AuthLayout>
            <main className={styles.main}>
                <LoginComponent />
            </main>
        </AuthLayout>
    )
}

export default RegisterPage
