import type { ReactNode } from "react"
import i18next from "../../../i18n"

const layout = async ({ children }: { children: ReactNode }) => {
  
    return (
    <html lang={i18next}>
      <head>
        <title>{i18next.t("test-title", { ns: "common" })}</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default layout
