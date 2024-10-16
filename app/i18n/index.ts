import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getI18nSettings } from "./settings";

const i18next = async (lang: string, ns: string) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .use(
            resourcesToBackend((language: string, namespace: string) => {
                import(`./locales/${language}/${namespace}.json`);
            })
        )
        // @ts-ignore
        .init(getI18nSettings(lang, ["common", "login-page", "profile-page", "register", "reset-password"]));

    return i18nInstance;
};

export const initTranslations = async (locale: string, namespace: string | string[]) => {
    const i18nInstance = await i18next(locale, Array.isArray(namespace) ? namespace[0] : namespace);

    return {
        t: i18nInstance.getFixedT(locale, Array.isArray(namespace) ? namespace[0] : namespace),
        i18n: i18nInstance,
    };
};

export default i18next;
