if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/BookmarkerLogo.svg",revision:"dfa28f71ad8fb23b678a7d14c63aac47"},{url:"/_next/app-build-manifest.json",revision:"e285018f3f48828cf1845be527b5ab01"},{url:"/_next/static/RX7dXv1Se6ZhIo7BF7dhU/_buildManifest.js",revision:"d6db10141eb9d1fdffdaf6824186f1fc"},{url:"/_next/static/RX7dXv1Se6ZhIo7BF7dhU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/212.a6d77743b0e2dd21.js",revision:"a6d77743b0e2dd21"},{url:"/_next/static/chunks/275-8b5e0f1696107b65.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/396-c86e6ac6d54ff592.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/607-6a9d4fa4baa92589.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/69-06751da1b115e2e9.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/720-c8c7fe42190cde10.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/755-ffa5d5febb24c333.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/app/_not-found-a94d4f003c752719.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/app/layout-077b2ef326155e62.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/app/page-701da5b08bb9f1c8.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/app/reset-password/page-039b2c46f35b6134.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/fd9d1056-b8ce54dc21952d81.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/framework-07cfeff0db3c4553.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/main-aeea3abb38e9a068.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/main-app-87191af9dfb77c87.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/pages/auth/login-dc752fe4b09eba62.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/pages/auth/login/layout-4f969e9ac928f515.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/pages/auth/register-8f4bb38e60afa068.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/pages/auth/register/layout-85b5f91d85ff17ad.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-cb29689bbcb4df34.js",revision:"RX7dXv1Se6ZhIo7BF7dhU"},{url:"/_next/static/css/205e4e3aabc2f4b4.css",revision:"205e4e3aabc2f4b4"},{url:"/_next/static/css/7fc5681ff8746307.css",revision:"7fc5681ff8746307"},{url:"/_next/static/css/f6dc816f7a6421a5.css",revision:"f6dc816f7a6421a5"},{url:"/_next/static/media/79d5b0dafad9bcdb.p.woff2",revision:"9ec0ed7a58885273b8c0d5d8b972163a"},{url:"/_next/static/media/e36a9863935aeb94.woff2",revision:"1d9fdebe712a42f0375bec9f9a93d977"},{url:"/add-bookmark-icon.svg",revision:"52be20bc732c8efe8b794c60401d2b18"},{url:"/add-folder-icon.svg",revision:"d0ec82f1ea99e0a6e7fdfb9effcc965d"},{url:"/bookmark.svg",revision:"bbae9eb139b231afe8f756e763188656"},{url:"/edit-icon.svg",revision:"67eabbf48365a4b14c5e1d93ab0769f1"},{url:"/empty-star.svg",revision:"53736c88438bab7eef629d651755eba5"},{url:"/favicon.svg",revision:"c0a80fb71021d47b071ef062a927b655"},{url:"/folder-open.svg",revision:"8c594933c697a84a5c5b74ab89ff5def"},{url:"/folder-open.svg:Zone.Identifier",revision:"77a459922c51bdf6bf3a27bf6b3503a2"},{url:"/folder.svg",revision:"f4005619fb0054f537ba33ebce7623ce"},{url:"/folder.svg:Zone.Identifier",revision:"a55045aac5d8e31a32006e367f2a0a2f"},{url:"/icon512_maskable.png",revision:"138eacdf8856403b6221e29844a76b72"},{url:"/icon512_rounded.png",revision:"6d8ebe2e8c3bf754b75128b41300612e"},{url:"/logout.svg",revision:"a939d3987b5290bd74ccd307fdb1bccc"},{url:"/manifest.json",revision:"8723f244ce1284e703fcdfec0806a5a0"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/social/email.svg",revision:"9c38788bc077afcb1a0dc1f8271a28cc"},{url:"/social/facebook.svg",revision:"1ccfff0a58f4d8101107285bf5468425"},{url:"/social/github.svg",revision:"1df077e2fb47f146328ec29577861c7b"},{url:"/social/google.svg",revision:"b069caf0739300a79e67d663419f2b02"},{url:"/sort-icon.svg",revision:"09c9ee138830b804876c2ceccae9f39a"},{url:"/star.svg",revision:"dd1dd56c3c93cbd3245ab617ef60d8b7"},{url:"/three-dots-vertical.svg",revision:"8163ca41956bb10021bb42a48ec7cb6e"},{url:"/three-dots-vertical.svg:Zone.Identifier",revision:"308d3fac2acaa5dc41e1cbb481805866"},{url:"/trash-icon.svg",revision:"0b2b7b022d8b45de64c9df51b9d5c4bd"},{url:"/triangle.svg",revision:"7a38e1bfe4e54c7bf01981dc18a00a04"},{url:"/triangle.svg:Zone.Identifier",revision:"56a9de6e951b816d970390623c10d872"},{url:"/user.svg",revision:"6bfed1f993ae94a8369135a58619510a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
