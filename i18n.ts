import { i18n } from "next-i18next"

i18n?.init({
	lng: "en",
	fallbackLng: "en",
	debug: false,
	preload: ["en", "es"],
	ns: ["common", "login"],
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
	resources: {
		en: {
			common: require("./public/locales/en/common.json"),
			login: require("./public/locales/en/login.json"),
		},
		es: {
			common: require("./public/locales/es/common.json"),
			login: require("./public/locales/es/login.json"),
		},
	},
})

export default i18n
