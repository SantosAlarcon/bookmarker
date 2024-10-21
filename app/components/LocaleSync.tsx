"use client";

import { useStoreSync } from "@/app/utils/hooks/useStoreSync";
import { localeStore } from "../store/localeStore";

const LocaleSync = ({ localeState }: { localeState: {locale: string} }) => {
    // @ts-ignore
    useStoreSync(localeStore, localeState);
    return null;
};

export default LocaleSync;
