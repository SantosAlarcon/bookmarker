import i18nConfig from "@/next-i18next.config";

export const fallbackLng = "en";
export const languages = [fallbackLng, "es", "ca"];
export const defaultNS = "common";

export const getI18nSettings = (lng: string = fallbackLng, ns: string | string[]  = defaultNS) => {
    return {
        debug: process.env.NODE_ENV === "development",
        defaultNS,
        fallbackLng,
        fallbackNS: "common",
        lng,
        supportedLngs: i18nConfig.locales,
        load: "all",
        preload: i18nConfig.locales,
        ns

        // react i18next special options (optional)
        // override if needed - omit if ok with defaults
        /*
        react: {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
          useSuspense: true,
        }
        */
    };
};
