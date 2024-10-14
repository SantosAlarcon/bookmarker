import type { Session, User, UserMetadata } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const isDev = process.env.NODE_ENV === "development"

interface State {
	user: User | undefined;
	session: Session | null;
	metadata: UserMetadata | null;
}

interface Action {
	setUser: (user: User | undefined) => void;
	setSession: (session: Session | null) => void;
	setMetadata: (session: UserMetadata | undefined) => void;
	setAuth: (session: Session | null) => void;
	reset: () => void;
}

export const authStore = create<State & Action>(
    // @ts-ignore
	devtools(
		(set) => ({
			user: undefined,
			session: null,
			metadata: null,
			setUser: (newUser: User | undefined) => set({ user: newUser }),
			setSession: (newSession: Session | null) => set({ session: newSession }),
			setMetadata: (newMetadata: UserMetadata | undefined) => set({ metadata: newMetadata }),
            setAuth: (newSession: Session | null) => set({session: newSession, user: newSession?.user, metadata: newSession?.user.user_metadata}),
			reset: () => set({ user: undefined, session: null, metadata: null }),
		}),
		{ name: "Auth Store", anonymousActionType: "auth-store-update", enabled: (isDev) },
	),
);
