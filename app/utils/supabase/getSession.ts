import { createClient } from "./client";

export const getSession = async () => {
    const { data, error } = await createClient().auth.getSession();

    if (error) {
        throw new Error(error.message);
    }

    return data.session;
};
