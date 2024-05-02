import type { ReactNode } from "react"

const PruebaLayout = ({ children }: { children: ReactNode }) => {
  console.log("Holis!!!!")
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default PruebaLayout
