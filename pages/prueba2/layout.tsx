import type { ReactNode } from "react";
import "@/app/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prueba"
}

const PruebaLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <title>Prueba</title>
            <body>{children}</body>
        </html>
    );
};

export default PruebaLayout;
