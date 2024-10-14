const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
})

const { i18n } = require("./next-i18next.config")

/** @type {import('next').NextConfig} */
module.exports = {
	i18n,
}
