/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
})

const i18nConfig = require("./i18n.ts")

const nextTranslatePlugin = require("next-translate-plugin")

module.exports = {withPWA, i18nConfig, nextTranslatePlugin}
