/*const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});*/

import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // transpilePackages: ["i18next", "react-i18next"],
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
            protocol: "https",
            hostname: "*",
            pathname: "/**"
        }]
    },
    typescript: {
        ignoreBuildErrors: false
    }
}

export default nextConfig;
