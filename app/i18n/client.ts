import i18nClient from "i18next";
import Backend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { getCookie } from "../utils/getCookie";
import i18NextConfig from "./settings";
import { initReactI18next } from "react-i18next/initReactI18next";

let language: string | undefined;
getCookie("NEXT_LOCALE").then((cookie) => language = cookie);

i18nClient.use(Backend);
i18nClient.use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)));
i18nClient.use(initReactI18next);

i18nClient.init({
    // debug: process.env.NODE_ENV === "development",
    fallbackLng: i18NextConfig.i18n.defaultLocale,
    supportedLngs: i18NextConfig.i18n.locales,
    ns: i18NextConfig.ns,
    defaultNS: i18NextConfig.defaultNS,
    fallbackNS: i18NextConfig.fallbackNS,
    preload: i18NextConfig.i18n.locales,
    load: "all",
});

// i18nClient.changeLanguage(language);

export default i18nClient;
