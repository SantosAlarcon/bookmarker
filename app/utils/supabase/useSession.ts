"use client";

import { useEffect, useState } from "react";
import router from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "./client";

export const useSession = () => {
    const [session, setSession] = useState<Session | null>(null);

    const getSession = async () => {
        const {
            data: { session },
        } = await createClient().auth.getSession();

        if (!session) {
            router.redirect("/auth/login");
        } else {
            setSession(session);
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    return session;
};
