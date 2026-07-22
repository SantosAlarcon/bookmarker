if (!self.define) {
    let e,
        s = {};
    const a = (a, i) => (
        (a = new URL(a + ".js", i).href),
        s[a] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    (e.src = a), (e.onload = s), document.head.appendChild(e);
                } else (e = a), importScripts(a), s();
            }).then(() => {
                let e = s[a];
                if (!e)
                    throw new Error(`Module ${a} didn’t register its module`);
                return e;
            })
    );
    self.define = (i, c) => {
        const n =
            e ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (s[n]) return;
        let t = {};
        const r = (e) => a(e, n),
            f = { module: { uri: n }, exports: t, require: r };
        s[n] = Promise.all(i.map((e) => f[e] || r(e))).then(
            (e) => (c(...e), t),
        );
    };
}
define(["./workbox-9b4d2a02"], function (e) {
    "use strict";
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/BookmarkerLogo.svg",
                    revision: "dfa28f71ad8fb23b678a7d14c63aac47",
                },
                {
                    url: "/_next/app-build-manifest.json",
                    revision: "2aee0109a3abc83aa49c5734fba95227",
                },
                {
                    url: "/_next/static/chunks/212.a6d77743b0e2dd21.js",
                    revision: "a6d77743b0e2dd21",
                },
                {
                    url: "/_next/static/chunks/23-b078b8193a0fe877.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/26.fad1eec05192e579.js",
                    revision: "fad1eec05192e579",
                },
                {
                    url: "/_next/static/chunks/288-19c002d2b41d2763.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/396-63f8ca2d47a679c7.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/647-e23d4f7c19640272.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/68-8dd52daa36acf203.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/69-8548be0b9f449109.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/714-35fb4d83f6bab464.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/720-39f1eb616379a0b2.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/75-d34af7d37f170e65.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/app/_not-found-21da6c81dbb3bfb6.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/app/layout-c64799b6b4e394ba.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/app/page-6d8a511c93a4bf79.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/app/profile/page-a4c202a8485569af.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/app/reset-password/page-dfcd4dfcfcd032e5.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/fd9d1056-02877400b89c8867.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/framework-93fc4f1c7e2998d8.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/main-app-af16cbe43c481a3e.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/main-f7cd8912f9d0839b.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/pages/_app-75f6107b0260711c.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/pages/auth/login-7f29d7de9a52292a.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/pages/auth/login/layout-41fcbc964f23cf9e.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/pages/auth/register-880c920f5619d9fa.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/pages/auth/register/layout-d699d34dd70772b2.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
                    revision: "837c0df77fd5009c9e46d446188ecfd0",
                },
                {
                    url: "/_next/static/chunks/webpack-af38ddefa52c7893.js",
                    revision: "s0ebiv9ZEPkDE21pjLchA",
                },
                {
                    url: "/_next/static/css/2fc3209f390bb53e.css",
                    revision: "2fc3209f390bb53e",
                },
                {
                    url: "/_next/static/css/376b2e721289dbb6.css",
                    revision: "376b2e721289dbb6",
                },
                {
                    url: "/_next/static/css/6a9fdd2c45a37cd5.css",
                    revision: "6a9fdd2c45a37cd5",
                },
                {
                    url: "/_next/static/css/92288a79a452bedd.css",
                    revision: "92288a79a452bedd",
                },
                {
                    url: "/_next/static/css/aab052505459cd82.css",
                    revision: "aab052505459cd82",
                },
                {
                    url: "/_next/static/css/b4cb1e270f9996ed.css",
                    revision: "b4cb1e270f9996ed",
                },
                {
                    url: "/_next/static/css/db92877accd85a39.css",
                    revision: "db92877accd85a39",
                },
                {
                    url: "/_next/static/css/f61103f6da7f8157.css",
                    revision: "f61103f6da7f8157",
                },
                {
                    url: "/_next/static/media/00045315ec24c208-s.woff2",
                    revision: "ab395397a9e8090889f607b2e0c4e02e",
                },
                {
                    url: "/_next/static/media/0e7784537271ba44-s.p.woff2",
                    revision: "a4cb9392e8f15e8f21a5d7ad4a5a989a",
                },
                {
                    url: "/_next/static/media/42ca9a2dc174b9b9-s.p.woff2",
                    revision: "c27a2e28b3a242fa8ff8f98b497e77ab",
                },
                {
                    url: "/_next/static/media/642cf3f5695072c2-s.woff2",
                    revision: "2e1c824a40ffbf5f81d054d08fa63924",
                },
                {
                    url: "/_next/static/media/70336daae8f9acb3-s.woff2",
                    revision: "b2eba9c14da0e8b58101509bacbfaf08",
                },
                {
                    url: "/_next/static/media/7ebd901f2f4a0b98-s.p.woff2",
                    revision: "2bf0c05208a33f85cf7cb16d2d14507f",
                },
                {
                    url: "/_next/static/media/83c76cede88902c5-s.p.woff2",
                    revision: "263efe7a03360205358705fe7a582c79",
                },
                {
                    url: "/_next/static/media/8a63bc110e8f45ad-s.woff2",
                    revision: "903f1807a02013d8adfada6444117ef4",
                },
                {
                    url: "/_next/static/media/95a978e26cc29d74-s.p.woff2",
                    revision: "96bae7b3e3968ac6352819fe91140292",
                },
                {
                    url: "/_next/static/media/a75fe934ca01b6d6-s.woff2",
                    revision: "3ef46f48125aa6d53b35b50fd5185bab",
                },
                {
                    url: "/_next/static/media/ace9c6b312d37d07-s.woff2",
                    revision: "cd0b1b9c31ae4c0c45e400dfb83e8fb8",
                },
                {
                    url: "/_next/static/media/af700d9cbf4b15b0-s.woff2",
                    revision: "2346a1b469af04bef948749af8a73637",
                },
                {
                    url: "/_next/static/media/b8ce78b8b9460bfe-s.woff2",
                    revision: "fe7fb3e9a1df9354ad892203bd8da4a6",
                },
                {
                    url: "/_next/static/media/d4a6d1072ea531dd-s.woff2",
                    revision: "039ead83fe94a9906d08fae7cf13629c",
                },
                {
                    url: "/_next/static/media/e1012b8d4e21a3f0-s.woff2",
                    revision: "93bef5ee47600e3752a4626b1bf9483e",
                },
                {
                    url: "/_next/static/media/ed0713aabc469750-s.woff2",
                    revision: "e3438eb84ab027e5ad586dc596b1b2f1",
                },
                {
                    url: "/_next/static/media/f2bfb63acfc2a372-s.woff2",
                    revision: "808a752d8abb231b14c1c64ac1394048",
                },
                {
                    url: "/_next/static/media/f5e5067cd50e2c82-s.p.woff2",
                    revision: "13fd948eebe1c50558df7f53a2922e70",
                },
                {
                    url: "/_next/static/s0ebiv9ZEPkDE21pjLchA/_buildManifest.js",
                    revision: "08a38422bc9a73678b8f302461d0cccc",
                },
                {
                    url: "/_next/static/s0ebiv9ZEPkDE21pjLchA/_ssgManifest.js",
                    revision: "b6652df95db52feb4daf4eca35380933",
                },
                {
                    url: "/favicon.svg",
                    revision: "c0a80fb71021d47b071ef062a927b655",
                },
                {
                    url: "/icon512_maskable.png",
                    revision: "138eacdf8856403b6221e29844a76b72",
                },
                {
                    url: "/icon512_rounded.png",
                    revision: "6d8ebe2e8c3bf754b75128b41300612e",
                },
                {
                    url: "/icons/add-bookmark-icon.svg",
                    revision: "52be20bc732c8efe8b794c60401d2b18",
                },
                {
                    url: "/icons/add-folder-icon.svg",
                    revision: "d0ec82f1ea99e0a6e7fdfb9effcc965d",
                },
                {
                    url: "/icons/bookmark.svg",
                    revision: "bbae9eb139b231afe8f756e763188656",
                },
                {
                    url: "/icons/edit-icon.svg",
                    revision: "67eabbf48365a4b14c5e1d93ab0769f1",
                },
                {
                    url: "/icons/false-icon.svg",
                    revision: "68797644d8231ad824e66a25915301f0",
                },
                {
                    url: "/icons/folder-open.svg",
                    revision: "8c594933c697a84a5c5b74ab89ff5def",
                },
                {
                    url: "/icons/folder.svg",
                    revision: "f4005619fb0054f537ba33ebce7623ce",
                },
                {
                    url: "/icons/logout.svg",
                    revision: "a939d3987b5290bd74ccd307fdb1bccc",
                },
                {
                    url: "/icons/sort-icon.svg",
                    revision: "09c9ee138830b804876c2ceccae9f39a",
                },
                {
                    url: "/icons/three-dots-vertical.svg",
                    revision: "8163ca41956bb10021bb42a48ec7cb6e",
                },
                {
                    url: "/icons/trash-icon.svg",
                    revision: "0b2b7b022d8b45de64c9df51b9d5c4bd",
                },
                {
                    url: "/icons/triangle.svg",
                    revision: "7a38e1bfe4e54c7bf01981dc18a00a04",
                },
                {
                    url: "/icons/true-icon.svg",
                    revision: "e3bbb6c8c6d8c663334f474cf95ab1aa",
                },
                {
                    url: "/icons/user.svg",
                    revision: "6bfed1f993ae94a8369135a58619510a",
                },
                {
                    url: "/manifest.json",
                    revision: "8723f244ce1284e703fcdfec0806a5a0",
                },
                {
                    url: "/next.svg",
                    revision: "8e061864f388b47f33a1c3780831193e",
                },
                {
                    url: "/social/email.svg",
                    revision: "9c38788bc077afcb1a0dc1f8271a28cc",
                },
                {
                    url: "/social/facebook.svg",
                    revision: "1ccfff0a58f4d8101107285bf5468425",
                },
                {
                    url: "/social/github.svg",
                    revision: "1df077e2fb47f146328ec29577861c7b",
                },
                {
                    url: "/social/google.svg",
                    revision: "b069caf0739300a79e67d663419f2b02",
                },
            ],
            { ignoreURLParametersMatching: [] },
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({
                            request: e,
                            response: s,
                            event: a,
                            state: i,
                        }) =>
                            s && "opaqueredirect" === s.type
                                ? new Response(s.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: s.headers,
                                  })
                                : s,
                    },
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 31536e3,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const s = e.pathname;
                return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET",
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 3600,
                    }),
                ],
            }),
            "GET",
        );
});
