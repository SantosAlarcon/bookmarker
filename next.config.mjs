/*const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});*/

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["i18next", "react-i18next"],
	sassOptions: {
		silenceDeprecations: ["legacy-js-api"]
	},
	experimental: {
		staleTimes: {
			dynamic: 60,
			static: 60
		}
	},
	images: {
		remotePatterns: [{
			protocol: "https"
		}]
	}
}

export default nextConfig;
