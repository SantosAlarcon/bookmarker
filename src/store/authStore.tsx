import type { Session, User, UserMetadata } from "@supabase/supabase-js"
import { create } from "zustand"
import {devtools} from "zustand/middleware"

interface State {
  user: User | undefined
  session: Session | null
  metadata: UserMetadata | null
}

interface Action {
  setUser: (user: User | undefined) => void
  setSession: (session: Session | null) => void
  setMetadata: (session: UserMetadata | undefined) => void
  reset: () => void
}

// @ts-ignore
export const authStore = create<State & Action>(devtools(
    (set) => ({
      user: undefined,
      session: null,
      metadata: null,
      setUser: (newUser: User | undefined) => set({ user: newUser }),
      setSession: (newSession: Session | null) => set({ session: newSession }),
      setMetadata: (newMetadata: UserMetadata | undefined) =>
        set({ metadata: newMetadata }),
      reset: () => set({ user: undefined, session: null, metadata: null }),
    })),
)
