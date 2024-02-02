"use client"
import { createClient } from '@/app/utils/supabase/client'
import React from 'react'
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify'
import "react-contexify/ReactContexify.css"
import { TriggerEvent } from 'react-contexify'
import { useRouter } from 'next/navigation'

export let handleUserContextMenu: Function | undefined = undefined;

const UserContextMenu = () => {
    const supabase = createClient()
    const router = useRouter()

    const { show } = useContextMenu({
        id: "userContext"
    })

    handleUserContextMenu = function(event: TriggerEvent) {
        console.log(event)
        event.preventDefault()
        show({
            event,
            props: {
                key: "value"
            }
        })
    }

    const handleItemClick = (params: ItemParams) => {
        switch (params.id) {
            case "user-info":
                router.push("/private")
                break;
            default:
               alert("Function not implemented yet.") 
        }
    }

    return (
        <Menu id="userContext" theme='dark'>
            <Item id="user-info" onClick={handleItemClick}>User information</Item>
            <Item id="logout" onClick={async () => {
                await supabase.auth.signOut({scope: "global"});
                router.push("/auth/login")
            }}>Logout</Item>
        </Menu>
    )
}

export default UserContextMenu
