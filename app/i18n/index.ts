import { createInstance, type i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18NextConfig from "./settings";

export const initTranslations = async (
    locale: string,
    namespaces: string | string[],
    i18nInstance?: i18n,
) => {
    i18nInstance = i18nInstance || createInstance();

    i18nInstance.use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`./locales/${language}/${namespace}.json`),
        ),
    );

    await i18nInstance.init({
        // debug: process.env.NODE_ENV === "development",
        lng: locale,
        fallbackLng: i18NextConfig.i18n.defaultLocale,
        supportedLngs: i18NextConfig.i18n.locales,
        ns: namespaces,
        defaultNS: namespaces[0],
        fallbackNS: i18NextConfig.fallbackNS,
        preload: i18NextConfig.i18n.locales,
        load: "all",
    });

    return {
        t: i18nInstance.t,
        i18n: i18nInstance,
    };
};
