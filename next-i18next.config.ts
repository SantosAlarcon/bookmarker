import type { I18nConfig } from "next-i18next/proxy";

const i18nConfig: I18nConfig = {
	supportedLngs: ["en", "ca", "es"],
	fallbackLng: "en",
	defaultNS: "common",
};

export default i18nConfig;
