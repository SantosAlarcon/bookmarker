"use client";
import { createClient } from "@/app/utils/supabase/client";
import { Menu, Item, useContextMenu, type ItemParams } from "react-contexify";
import "react-contexify/ReactContexify.css";
import type { TriggerEvent } from "react-contexify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { toast } from "sonner";
import "@/app/i18n/client"
import { localeStore } from "@/app/store/localeStore";

export let handleUserContextMenu: Function | undefined = undefined;

const UserContextMenu = () => {
    // @ts-ignore
    const lang = localeStore.getState().locale
    const supabase = createClient();
    const router = useRouter();
    const { t } = useTranslation("common", {lng: lang});

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
            style={{
                marginTop: "2rem",
                marginLeft: "-2rem",
                minWidth: "10rem",
            }}
        >
            <Item id="user-profile" onClick={handleItemClick}>
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
