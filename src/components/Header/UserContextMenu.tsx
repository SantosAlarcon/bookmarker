"use client"
import { createClient } from '@/app/utils/supabase/client'
import React from 'react'
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify'
import "react-contexify/ReactContexify.css"
import { TriggerEvent } from 'react-contexify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export let handleUserContextMenu: Function | undefined = undefined;

const UserContextMenu = () => {
    const supabase = createClient()
    const router = useRouter()
    const {t} = useTranslation("common")

    const { show } = useContextMenu({
        id: "userContext"
    })

    handleUserContextMenu = function(event: TriggerEvent) {
        event.preventDefault()
        show({
            event,
            props: {
                key: "value"
            },
        })
    }

    const handleItemClick = (params: ItemParams) => {
        switch (params.id) {
            case "user-profile":
                router.prefetch("/profile")
                router.push("/profile")
                break;
            default:
               alert("Function not implemented yet.") 
        }
    }

    return (
        <Menu id="userContext" theme='dark' style={{marginTop: "2rem", marginLeft: "-2rem", minWidth: "10rem"}}>
            <Item id="user-profile" onClick={handleItemClick}>
                <Image src="/icons/user.svg" width={16} height={16} alt="User icon" style={{
                    marginRight: "1rem"
                }} />
		{t("user-profile")}
            </Item>
            <Item id="logout" onClick={async () => {
                await supabase.auth.signOut({scope: "global"});
                router.prefetch("/auth/login")
                router.push("/auth/login")
            }}>
                <Image src="/icons/logout.svg" width={16} height={16} alt="User icon" style={{
                    marginRight: "1rem",
                    filter: "invert(1)"
                }} />
		{t("logout")}
	    </Item>
        </Menu>
    )
}

export default UserContextMenu
