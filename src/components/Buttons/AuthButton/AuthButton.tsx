"use client"

import Image from 'next/image'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import styles from "./AuthButton.module.scss"
import tooltipStyles from "@/app/tooltip.module.scss"
import { Tooltip } from 'react-tooltip'
import { useRouter } from 'next/navigation'
import { SupabaseClient, type Session } from '@supabase/auth-helpers-nextjs'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { createClient } from '@/app/utils/supabase/client'
import { handleUserContextMenu } from '@/components/Header/UserContextMenu'

const AuthButton = () => {
    const [session, setSession] = useState<Session | null>(null)
    const supabase: SupabaseClient = createClient();
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
        }
        fetchSession()
    }, [supabase.auth])

    const handleAuth = (event: SyntheticEvent) => {
        // If there is no session, redirect user to the login page
        if (!session) {
            router.push("/auth/login")
        } else {
            // @ts-ignore
            handleUserContextMenu(event)
        }
    }

    return (
        <div className={styles.auth__button__container}>
            <button
                onClick={(e) => handleAuth(e)}
                className={styles.auth__button__btn}
                id="auth-tooltip"
                aria-label="Login"
            >
                <Tooltip
                    anchorSelect="#auth-tooltip"
                    place="bottom"
                    variant="info"
                    className={tooltipStyles.custom__tooltip}
                    content={session ? "User" : "Login"}
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
