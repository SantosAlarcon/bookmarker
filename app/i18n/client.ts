import resourcesToBackend from "i18next-resources-to-backend";
import i18NextConfig from "./settings";
import i18nClient from "i18next";

i18nClient.use(
    resourcesToBackend(
        (language: string, namespace: string) =>
            import(`./locales/${language}/${namespace}.json`),
    ),
);

i18nClient.init({
    debug: process.env.NODE_ENV === "development",
    fallbackLng: i18NextConfig.i18n.defaultLocale,
    supportedLngs: i18NextConfig.i18n.locales,
    ns: i18NextConfig.ns,
    defaultNS: i18NextConfig.defaultNS,
    fallbackNS: i18NextConfig.fallbackNS,
    preload: i18NextConfig.i18n.locales,
    load: "all",
});

export default i18nClient;
