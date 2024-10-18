"use client";

import { authStore } from "@/app/store/authStore";
import { useStoreSync } from "@/app/utils/hooks/useStoreSync";
import type { Session } from "@supabase/supabase-js";

const AuthSync = ({ sessionState }: { sessionState: Session }) => {
    // @ts-ignore
    useStoreSync(authStore, sessionState);
    return null;
};

export default AuthSync;
