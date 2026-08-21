"use client";

import type { Session, UserMetadata } from "@supabase/supabase-js";
import Image from "next/image";
import { type SyntheticEvent, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { handleUserContextMenu } from "@/components/Header/UserContextMenu";
import { localeStore } from "@/app/store/localeStore";
import { contextMenuStore } from "@/app/store/contextMenuStore";
import { authStore } from "@/store/authStore";
import tooltipStyles from "@/styles/tooltip.module.css";
import styles from "./AuthButton.module.scss";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";

const AuthButton = () => {
	const setAuth = authStore((state) => state.setAuth);
	const session: Session | null = authStore.getState().session;
	const metadata: UserMetadata | null = authStore((state) => state.metadata);

	// @ts-ignore
	const lang = localeStore((state) => state.locale);
	const { t } = useT("common", { lng: lang });
	const menuIsOpen = contextMenuStore((state) => state.isOpen);

	useEffect(() => {
		setAuth(session);
	}, []);

	const handleAuth = (event: SyntheticEvent) => {
		if (session) {
			// @ts-ignore
			handleUserContextMenu(event);
		}
	};

	return metadata ? (
		<div className={styles.auth__button__container}>
			<button
				onClick={(e) => handleAuth(e)}
				className={styles.auth__button__btn}
				id="auth-tooltip"
				aria-label={
					session
						? `${metadata.full_name} — ${t("user-profile")}`
						: t("login")
				}
				aria-haspopup={session ? "menu" : undefined}
				aria-expanded={session ? menuIsOpen : undefined}
				type="button"
			>
				<Tooltip
					anchorSelect="#auth-tooltip"
					place="bottom"
					variant="info"
					className={tooltipStyles.custom__tooltip}
					content={metadata ? metadata.full_name : "Login"}
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
					<Image
						className={styles.auth__button__img}
						width={36}
						height={36}
						src={"/user.svg"}
						alt=""
					/>
				)}
			</button>
		</div>
	) : (
		<span
			className={styles.auth__button__skeleton}
			aria-hidden="true"
		/>
	);
};

export default AuthButton;
