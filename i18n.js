module.exports = {
	defaultLocale: "ca",
	locales: ["en", "es", "ca"],
	loadLocaleFrom: async (locale, namespace) =>
		import(`./locales/${locale}/${namespace}.json`).then((r) => r.default),
	loader: true,
	pages: {
		"*": ["common"],
		"/": ["login-page", "reset-password", "header"],
		"/auth/login": ["login-page"],
		"/reset-password": ['reset-password'],
		"/profile": ["profile-page"],
	},
	keySeparator: ":",
}
