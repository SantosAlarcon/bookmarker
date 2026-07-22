"use client";
import { Item, type ItemParams, Menu, useContextMenu } from "react-contexify";
import { createClient } from "@/app/utils/supabase/client";
import "react-contexify/ReactContexify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { TriggerEvent } from "react-contexify";
import { toast } from "sonner";
import "@/app/i18n/client";
import { useT } from "next-i18next/client";
import { localeStore } from "@/app/store/localeStore";

export let handleUserContextMenu: Function | undefined = undefined;

const UserContextMenu = () => {
	// @ts-ignore
	const lang = localeStore.getState().locale;
	const supabase = createClient();
	const router = useRouter();
	const { t } = useT("common", { lng: lang });

	const { show } = useContextMenu({
		id: "userContext",
	});

	handleUserContextMenu = (event: TriggerEvent) => {
		event.preventDefault();
		show({
			event,
			props: {
				key: "value",
			},
		});
	};

	const handleItemClick = (params: ItemParams) => {
		switch (params.id) {
			case "user-profile": {
				router.prefetch("/profile");
				router.push("/profile");
				break;
			}
			default:
				alert("Function not implemented yet.");
		}
	};

	return (
		<Menu
			id="userContext"
			theme="dark"
			role="menu"
			style={{
				marginTop: "2rem",
				marginLeft: "-2rem",
				minWidth: "10rem",
			}}
		>
			<Item
				id="user-profile"
				onClick={handleItemClick}
				aria-label={t("user-profile")}
			>
				<Image
					src="/icons/user.svg"
					width={16}
					height={16}
					alt="User icon"
					style={{
						marginRight: "1rem",
					}}
				/>
				{t("user-profile")}
			</Item>
			<Item
				id="logout"
				onClick={async () => {
					toast.info(t("logging-out"));
					await supabase.auth.signOut({ scope: "global" });
					router.prefetch("/auth/login");
					router.push("/auth/login");
				}}
				aria-label={t("logout")}
			>
				<Image
					src="/icons/logout.svg"
					width={16}
					height={16}
					alt="User icon"
					style={{
						marginRight: "1rem",
						filter: "invert(1)",
					}}
				/>
				{t("logout")}
			</Item>
		</Menu>
	);
};

export default UserContextMenu;
