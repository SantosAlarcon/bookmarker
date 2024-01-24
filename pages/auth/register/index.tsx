"use server"
import RegisterComponent from "@/components/Auth/RegisterComponent/RegisterComponent"
import AuthLayout from "./layout"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import styles from "@/app/page.module.css"

const RegisterPage = async () => {
    const supabase = createServerComponentClient({cookies});
    const {data} = await supabase.auth.getSession();

    if (data?.session) {
        redirect('/');
    }

    return (
        <AuthLayout>
            <main className={styles.main}>
                <RegisterComponent />
            </main>
        </AuthLayout>
    )
}

export default RegisterPage
