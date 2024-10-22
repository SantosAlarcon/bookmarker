"use client";

import { handleUserContextMenu } from "@/components/Header/UserContextMenu";
import { authStore } from "@/store/authStore";
import tooltipStyles from "@/styles/tooltip.module.css";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { UserMetadata } from "@supabase/supabase-js";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type SyntheticEvent, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./AuthButton.module.scss";

const AuthButton = () => {
    const setAuth = authStore((state) => state.setAuth);
    const session: Session | null = authStore.getState().session;
    const metadata: UserMetadata | null = authStore((state) => state.metadata);

    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        setAuth(session);
        // const fetchSession = async () => {
        //     const supabase = createClient();
        //     const {data: {session}} = await supabase.auth.getSession();
        //     setAuth(session);
        // };
        //
        // if (!session) {
        //     fetchSession();
        // }
    }, [metadata, session]);

    const handleAuth = (event: SyntheticEvent) => {
        // If there is no session, redirect user to the login page
        if (session) {
            // @ts-ignore
            handleUserContextMenu(event);
        } else {
            router.push("/auth/login");
        }
    };

    return (
        metadata && (
            <div className={styles.auth__button__container}>
                <button
                    onClick={(e) => handleAuth(e)}
                    className={styles.auth__button__btn}
                    id="auth-tooltip"
                    aria-label="Login"
                    type="button"
                >
                    <Tooltip
                        anchorSelect="#auth-tooltip"
                        place="bottom"
                        variant="info"
                        className={tooltipStyles.custom__tooltip}
                        content={session ? "" : "Login"}
                    />
                    {session ? (
                        <picture>
                            <img
                                style={{ borderRadius: "100%" }}
                                src={metadata?.picture}
                                width={36}
                                height={36}
                                alt="User avatar"
                                fetchPriority="high"
                            />
                        </picture>
                    ) : (
                        <Image width={32} height={32} src={"/user.svg"} alt="User icon" />
                    )}
                </button>
            </div>
        )
    );
};

export default AuthButton;
