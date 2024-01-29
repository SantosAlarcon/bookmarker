import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";

interface State {
    user: User | null
    session: Session | null
}

interface Action {
    setUser: (user: User | null) => void
    setSession: (session: Session | null) => void
}

export const authStore = create<State & Action>((set: Function) => ({
    user: null,
    session: null,
    setUser: (newUser: User | null) => set({user: newUser}),
    setSession: (newSession: Session | null) => set({session: newSession})
}))
