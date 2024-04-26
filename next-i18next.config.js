/** @type {import('next-i18next').UserConfig} */
module.exports = {
	debug: process.env.NODE_ENV === 'development',
	i18n: {
		locales: ["en", "ca", "es"],
		defaultLocale: "en"
	},
	ns: ["common", "header", "login-page", "profile-page", "reset-password"],
	load: "all",
	defaultNS: "common",
	localePath:
		typeof window === "undefined"
			? require("path").resolve("./locales")
			: "/locales",
	reloadOnPrerender: process.env.NODE_ENV === "development",
	preload: ["en", "ca", "es"],
}
