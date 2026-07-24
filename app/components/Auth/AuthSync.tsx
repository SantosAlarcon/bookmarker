"use client";

import type { Session } from "@supabase/supabase-js";
import { authStore } from "@/app/store/authStore";
import { useStoreSync } from "@/app/utils/hooks/useStoreSync";

const AuthSync = ({ sessionState }: { sessionState: Session }) => {
	// @ts-ignore
	useStoreSync(authStore, sessionState);
	return null;
};

export default AuthSync;
