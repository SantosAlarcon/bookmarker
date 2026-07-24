"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "./client";

export const useSession = () => {
	const [session, setSession] = useState<Session | null>(null);

	const getSession = async () => {
		const {
			data: { session },
		} = await createClient().auth.getSession();

		if (session) {
			setSession(session);
		}
	};

	useEffect(() => {
		getSession();
	}, []);

	return session;
};
