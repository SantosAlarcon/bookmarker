"use client"

import Image from 'next/image'
import React, { SyntheticEvent, useEffect } from 'react'
import styles from "./AuthButton.module.scss"
import tooltipStyles from "@/app/tooltip.module.scss"
import { Tooltip } from 'react-tooltip'
import { useRouter } from 'next/navigation'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { handleUserContextMenu } from '@/components/Header/UserContextMenu'
import { UserMetadata } from '@supabase/supabase-js'
import getUserMetadata from '@/app/utils/getUserMetadata'
import { authStore } from '@/store/authStore'
import { getSession } from '@/app/utils/supabase/getSession'

const AuthButton = () => {
    const setSession = authStore(state => state.setSession)
    const session: Session | null = authStore(state => state.session)

    const setMetadata = authStore(state => state.setMetadata)
    const metadata: UserMetadata | null = authStore(state => state.metadata)

    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session)
        }

        const getMetadata = async () => {
            const md = await getUserMetadata();
            setMetadata(md);
        }

        if (!session) {
            fetchSession()
        }

        if (!metadata) {
            getMetadata()
        }

    }, [metadata, session, setMetadata, setSession])
    
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
