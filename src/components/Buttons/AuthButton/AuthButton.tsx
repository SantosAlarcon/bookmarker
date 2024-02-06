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
import { UserMetadata } from '@supabase/supabase-js'
import getUserMetadata from '@/app/utils/getUserMetadata'

const AuthButton = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [metadata, setMetadata] = useState<UserMetadata | undefined>(undefined)
    const supabase: SupabaseClient = createClient();
    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
        }

        const getMetadata = async () => {
            setMetadata(await getUserMetadata());
        }
        fetchSession()
        getMetadata()
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

    return (metadata && (
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
                    content={!session ? "Login" : ""}
                />
                {session ? (
                    <picture>
                        <img style={{borderRadius: "100%"}} src={metadata?.picture} width={36} height={36} alt="User picture" />
                    </picture>) : (<Image
                        width={32}
                        height={32}
                        src={"/user.svg"}
                        alt="User icon"
                    />)}
            </button>
        </div>
    ))
}

export default AuthButton;
