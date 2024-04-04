module.exports = {
    locales: ["en","es"],
    defaultLocale: "es",
    loader: false,
    pages: {
        "*": ["common"],
        "/auth/login": ["login"]
    },
    loadLocaleFrom: async (locale, namespace) => import(`./locales/${locale}/${namespace}`).then(r => r.default),
}
