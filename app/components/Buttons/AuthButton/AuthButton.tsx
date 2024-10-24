"use client";

import { handleUserContextMenu } from "@/components/Header/UserContextMenu";
import { authStore } from "@/store/authStore";
import tooltipStyles from "@/styles/tooltip.module.css";
import type { Session } from "@supabase/auth-helpers-nextjs";
import type { UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import { type SyntheticEvent, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./AuthButton.module.scss";

const AuthButton = () => {
    const setAuth = authStore((state) => state.setAuth);
    const session: Session | null = authStore.getState().session;
    const metadata: UserMetadata | null = authStore((state) => state.metadata);

    useEffect(() => {
        setAuth(session);
    }, []);

    const handleAuth = (event: SyntheticEvent) => {
        if (session) {
            // @ts-ignore
            handleUserContextMenu(event);
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
                                alt=""
                                fetchPriority="high"
				className={styles.auth__button__img}
                            />
                        </picture>
                    ) : (
                        <Image className={styles.auth__button__img} width={36} height={36} src={"/user.svg"} alt="" />
                    )}
                </button>
            </div>
        )
    );
};

export default AuthButton;
