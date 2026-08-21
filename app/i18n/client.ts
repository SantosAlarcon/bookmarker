import i18nClient from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18NextConfig from "./settings";
import { initReactI18next } from "react-i18next/initReactI18next";

i18nClient.use(
    resourcesToBackend(
        (language: string, namespace: string) =>
            import(`./locales/${language}/${namespace}.json`),
    ),
);
i18nClient.use(initReactI18next);

// Only the default namespace is preloaded — languages and namespaces
// are lazy-loaded on demand by useT()/useTranslation().
i18nClient.init({
    fallbackLng: i18NextConfig.i18n.defaultLocale,
    supportedLngs: i18NextConfig.i18n.locales,
    ns: [i18NextConfig.defaultNS],
    defaultNS: i18NextConfig.defaultNS,
    fallbackNS: i18NextConfig.fallbackNS,
    load: "all",
});

export default i18nClient;
