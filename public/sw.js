if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>n(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/BookmarkerLogo.svg",revision:"dfa28f71ad8fb23b678a7d14c63aac47"},{url:"/_next/app-build-manifest.json",revision:"272b60c5e4e0c4a3a6c9b440d47635fd"},{url:"/_next/static/chunks/212.a6d77743b0e2dd21.js",revision:"a6d77743b0e2dd21"},{url:"/_next/static/chunks/26.fad1eec05192e579.js",revision:"fad1eec05192e579"},{url:"/_next/static/chunks/288-fb5b3353234ae379.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/404-d9786a2d6389fd0b.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/542-a99b9030ccff6059.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/647-1c2bd355b80d464a.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/69-9b7c9d9b63fd0b35.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/720-c764dabc1430c486.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/75-a3cec35598191c9c.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/835-d90d290a99308f17.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/app/_not-found-a94d4f003c752719.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/app/layout-c149240088d564c3.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/app/page-a3160b2a5c5c7f79.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/app/profile/page-bd559c08598bc8a8.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/app/reset-password/page-6a3f4d7736bd5ede.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/fd9d1056-b8ce54dc21952d81.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/framework-cc59be7a41cb8994.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/main-app-f33551c266627a65.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/main-d29676bc2ff4916a.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/pages/auth/login-4c60caf9796fe539.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/pages/auth/login/layout-9708ba11fa7af928.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/pages/auth/register-07b7bc19ad50281e.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/pages/auth/register/layout-466eb60316dc7c7e.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-396fca1b989c6f5d.js",revision:"n11ItugQMvZHw_LA_CUHb"},{url:"/_next/static/css/3d7f4662c125c52d.css",revision:"3d7f4662c125c52d"},{url:"/_next/static/css/4a085dcb7ca237d8.css",revision:"4a085dcb7ca237d8"},{url:"/_next/static/css/784d7edbd557514c.css",revision:"784d7edbd557514c"},{url:"/_next/static/css/867ab4dce7d3fbe3.css",revision:"867ab4dce7d3fbe3"},{url:"/_next/static/css/d6214f66e0367893.css",revision:"d6214f66e0367893"},{url:"/_next/static/css/d823266f9c785fdd.css",revision:"d823266f9c785fdd"},{url:"/_next/static/media/79d5b0dafad9bcdb.p.woff2",revision:"9ec0ed7a58885273b8c0d5d8b972163a"},{url:"/_next/static/media/e36a9863935aeb94.woff2",revision:"1d9fdebe712a42f0375bec9f9a93d977"},{url:"/_next/static/n11ItugQMvZHw_LA_CUHb/_buildManifest.js",revision:"ce6374974a88e3b348293342012eea47"},{url:"/_next/static/n11ItugQMvZHw_LA_CUHb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.svg",revision:"c0a80fb71021d47b071ef062a927b655"},{url:"/icon512_maskable.png",revision:"138eacdf8856403b6221e29844a76b72"},{url:"/icon512_rounded.png",revision:"6d8ebe2e8c3bf754b75128b41300612e"},{url:"/icons/add-bookmark-icon.svg",revision:"52be20bc732c8efe8b794c60401d2b18"},{url:"/icons/add-folder-icon.svg",revision:"d0ec82f1ea99e0a6e7fdfb9effcc965d"},{url:"/icons/bookmark.svg",revision:"bbae9eb139b231afe8f756e763188656"},{url:"/icons/edit-icon.svg",revision:"67eabbf48365a4b14c5e1d93ab0769f1"},{url:"/icons/false-icon.svg",revision:"68797644d8231ad824e66a25915301f0"},{url:"/icons/folder-open.svg",revision:"8c594933c697a84a5c5b74ab89ff5def"},{url:"/icons/folder.svg",revision:"f4005619fb0054f537ba33ebce7623ce"},{url:"/icons/logout.svg",revision:"a939d3987b5290bd74ccd307fdb1bccc"},{url:"/icons/sort-icon.svg",revision:"09c9ee138830b804876c2ceccae9f39a"},{url:"/icons/three-dots-vertical.svg",revision:"8163ca41956bb10021bb42a48ec7cb6e"},{url:"/icons/trash-icon.svg",revision:"0b2b7b022d8b45de64c9df51b9d5c4bd"},{url:"/icons/triangle.svg",revision:"7a38e1bfe4e54c7bf01981dc18a00a04"},{url:"/icons/true-icon.svg",revision:"e3bbb6c8c6d8c663334f474cf95ab1aa"},{url:"/icons/user.svg",revision:"6bfed1f993ae94a8369135a58619510a"},{url:"/manifest.json",revision:"8723f244ce1284e703fcdfec0806a5a0"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/social/email.svg",revision:"9c38788bc077afcb1a0dc1f8271a28cc"},{url:"/social/facebook.svg",revision:"1ccfff0a58f4d8101107285bf5468425"},{url:"/social/github.svg",revision:"1df077e2fb47f146328ec29577861c7b"},{url:"/social/google.svg",revision:"b069caf0739300a79e67d663419f2b02"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
