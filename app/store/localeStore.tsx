import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const localeStore = create(
    devtools(
        (set) => ({
            locale: "en",
            setLocale: (newLocale: string) => set({ locale: newLocale }),
        }),
        {
            name: "Locale Store",
            enabled: process.env.NODE_ENV === "development",
        },
    ),
);
