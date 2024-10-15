import { createInstance } from "i18next";
import Backend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const i18next = async () => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(Backend)
        .use(
            resourcesToBackend((language: string, namespace: string) => {
                import(`./locales/${language}/${namespace}.json`);
            }),
        )
        .use(initReactI18next) // bind react-i18next to the instance
        .init({
            fallbackLng: "en",
            load: "all",
            preload: ["en", "ca", "es"],
            debug: true,
            ns: [
                "common",
                "login-page",
                "reset-password",
                "header",
                "profile-page",
            ],
            defaultNS: "common",

            interpolation: {
                escapeValue: false, // not needed for react!!
            },

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
        });

    return i18nInstance;
};

export default i18next;
