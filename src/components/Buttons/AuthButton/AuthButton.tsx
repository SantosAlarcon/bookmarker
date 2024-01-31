"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from "./AuthButton.module.scss"
import tooltipStyles from "@/app/tooltip.module.scss"
import { Tooltip } from 'react-tooltip'
import { SupabaseClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const AuthButton = () => {
    const [session, setSession] = useState<Session | null>(null)
    const supabase: SupabaseClient = createClientComponentClient();
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
        }
        fetchSession()
    }, [])

    const handleAuth = async () => {
        if (!session) {
            router.push("/auth/login")
        } else {
            await supabase.auth.signOut({ scope: "global" })
            router.push("/auth/login")
        }
    }

    return (
        <div className={styles.auth__button__container}>
            <button
                onClick={handleAuth}
                className={styles.auth__button__btn}
                id="auth-tooltip"
                aria-label="Login"
            >
                <Tooltip
                    anchorSelect="#auth-tooltip"
                    place="bottom"
                    variant="info"
                    className={tooltipStyles.custom__tooltip}
                    content={session ? "Logout" : "Login"}
                />
                <Image
                    width={32}
                    height={32}
                    src={session ? "/logout.svg" : "/user.svg"}
                    alt="User icon"
                />
            </button>
        </div>
    )
}

export default AuthButton;
