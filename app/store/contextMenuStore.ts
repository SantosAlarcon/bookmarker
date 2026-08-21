import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ContextMenuState = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const contextMenuStore = create<ContextMenuState>()(
    devtools(
        (set) => ({
            isOpen: false,
            setIsOpen: (isOpen: boolean) => set({ isOpen }),
        }),
        {
            name: "Context Menu Store",
            enabled: process.env.NODE_ENV === "development",
        },
    ),
);
