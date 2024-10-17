/*const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});*/

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["i18next", "react-i18next"],
}

export default nextConfig;
