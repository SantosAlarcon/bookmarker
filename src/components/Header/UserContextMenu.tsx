"use client"
import { createClient } from '@/app/utils/supabase/client'
import React from 'react'
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify'
import "react-contexify/ReactContexify.css"
import { TriggerEvent } from 'react-contexify'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export let handleUserContextMenu: Function | undefined = undefined;

const UserContextMenu = () => {
    const supabase = createClient()
    const router = useRouter()

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
                router.push("/profile")
                break;
            default:
               alert("Function not implemented yet.") 
        }
    }

    return (
        <Menu id="userContext" theme='dark' style={{marginTop: "2rem"}}>
            <Item id="user-profile" onClick={handleItemClick}>
                <Image src="/user.svg" width={16} height={16} alt="User icon" style={{
                    marginRight: "1rem"
                }} />
                User profile
            </Item>
            <Item id="logout" onClick={async () => {
                await supabase.auth.signOut({scope: "global"});
                router.push("/auth/login")
            }}>
                <Image src="/logout.svg" width={16} height={16} alt="User icon" style={{
                    marginRight: "1rem",
                    filter: "invert(1)"
                }} />
                Logout</Item>
        </Menu>
    )
}

export default UserContextMenu
