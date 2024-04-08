/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
})

const {defaultLocale, locales, loadLocaleFrom, pages} = require("./i18n")

const nextTranslate = require("next-translate-plugin")

//module.exports = {withPWA, nextTranslate}
module.exports = {...nextTranslate()}
