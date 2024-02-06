import { create } from "zustand";
import { User, Session, UserMetadata } from "@supabase/supabase-js";

interface State {
    user: User | null
    session: Session | null
    metadata: UserMetadata | null
}

interface Action {
    setUser: (user: User | null) => void
    setSession: (session: Session | null) => void
    setMetadata: (session: UserMetadata | undefined) => void
}

export const authStore = create<State & Action>((set: Function) => ({
    user: null,
    session: null,
    metadata: null,
    setUser: (newUser: User | null) => set({user: newUser}),
    setSession: (newSession: Session | null) => set({session: newSession}),
    setMetadata: (newMetadata: UserMetadata | undefined) => set({metadata: newMetadata})
}))

// @ts-ignore
const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
	name: "Auth",
})

connection?.init(authStore.getState())

authStore.subscribe((state: State & Action) => {
	connection?.send("Auth", state);
})
