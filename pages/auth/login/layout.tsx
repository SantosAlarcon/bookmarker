import { Barlow } from "next/font/google"
import { Toaster } from "sonner"
import Head from "next/head"

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
})

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Head>
                <title>Get started - Bookmarker</title>
                <link rel="shortcut icon" href="/favicon.svg" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <meta name="theme-color" content="#8936FF" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Bookmarker" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Bookmarker" />
                <meta
                    property="og:description"
                    content="App to manage browser bookmarks everywhere"
                />
                <meta property="og:site_name" content="Bookmarker" />
            </Head>
            <div className={barlow.className}>
                {children}
            </div>
            <Toaster position="top-center" richColors />
        </>
    )
}
