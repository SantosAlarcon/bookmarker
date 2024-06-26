import type { ReactNode } from "react";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const md: Metadata = {
    title: "Prueba"
}

const TestLayout = ({ children }: { children: ReactNode }) => {
    return (
            <div>{children}</div>
    );
};

export default TestLayout;
