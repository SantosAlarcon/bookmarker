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
	}
}

export default nextConfig;
